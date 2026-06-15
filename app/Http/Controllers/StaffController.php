<?php

namespace App\Http\Controllers;

use App\Models\StaffFinance;
use App\Models\StaffAlamat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class StaffController extends Controller
{
    public function index()
    {
        // === PENGAMBILAN DATA INDEXING ===
        // Mengambil seluruh data staff beserta alamat mereka untuk ditampilkan di halaman tabel daftar Staff
        $staff = StaffFinance::with('alamat')->get();
        return Inertia::render('Staff/Index', [
            'staff' => $staff
        ]);
    }

    public function create()
    {
        return Inertia::render('Staff/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nrp' => 'required|string|unique:staff_finance,nrp|max:20',
            'nama_lengkap' => 'required|string|max:100',
            'jenis_kelamin' => 'required|in:L,P',
            'nomor_telepon' => 'required|string|max:20',
            'password' => 'required|string|min:6',
            'alamat' => 'nullable|array',
            'alamat.*' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($validated) {
            $staff = StaffFinance::create([
                'nrp' => $validated['nrp'],
                'nama_lengkap' => $validated['nama_lengkap'],
                'jenis_kelamin' => $validated['jenis_kelamin'],
                'nomor_telepon' => $validated['nomor_telepon'],
                'password' => Hash::make($validated['password']),
            ]);

            if (!empty($validated['alamat'])) {
                foreach ($validated['alamat'] as $alamatStr) {
                    StaffAlamat::create([
                        'finance_nrp' => $staff->nrp,
                        'alamat' => $alamatStr,
                    ]);
                }
            }
        });

        return redirect()->route('staff.index')->with('success', 'Staff berhasil ditambahkan.');
    }

    public function edit($id)
    {
        $staff = StaffFinance::with('alamat')->findOrFail($id);
        return Inertia::render('Staff/Edit', [
            'staff' => $staff
        ]);
    }

    public function update(Request $request, $id)
    {
        $staff = StaffFinance::findOrFail($id);

        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:100',
            'jenis_kelamin' => 'required|in:L,P',
            'nomor_telepon' => 'required|string|max:20',
            'password' => 'nullable|string|min:6',
            'alamat' => 'nullable|array',
            'alamat.*' => 'required|string|max:255',
        ]);

        DB::transaction(function () use ($validated, $staff) {
            $updateData = [
                'nama_lengkap' => $validated['nama_lengkap'],
                'jenis_kelamin' => $validated['jenis_kelamin'],
                'nomor_telepon' => $validated['nomor_telepon'],
            ];

            if (!empty($validated['password'])) {
                $updateData['password'] = Hash::make($validated['password']);
            }

            $staff->update($updateData);

            StaffAlamat::where('finance_nrp', $staff->nrp)->delete();
            
            if (!empty($validated['alamat'])) {
                foreach ($validated['alamat'] as $alamatStr) {
                    StaffAlamat::create([
                        'finance_nrp' => $staff->nrp,
                        'alamat' => $alamatStr,
                    ]);
                }
            }
        });

        return redirect()->route('staff.index')->with('success', 'Staff berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $staff = StaffFinance::findOrFail($id);
        $staff->delete(); 

        return redirect()->route('staff.index')->with('success', 'Staff berhasil dihapus.');
    }
}
