<?php

namespace App\Http\Controllers;

use App\Models\PesertaSeminar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeminarController extends Controller
{
    public function index()
    {
        // === PENGAMBILAN DATA INDEXING ===
        // Mengambil data peserta seminar beserta relasi data pembelinya, dengan pembatasan 15 baris per halaman (Pagination)
        $peserta = PesertaSeminar::with('pembeli')->paginate(15);
        return Inertia::render('Seminar/Index', [
            'peserta' => $peserta
        ]);
    }

    public function edit($id)
    {
        $peserta = PesertaSeminar::findOrFail($id);
        return Inertia::render('Seminar/Edit', [
            'peserta' => $peserta
        ]);
    }

    public function update(Request $request, $id)
    {
        $peserta = PesertaSeminar::findOrFail($id);
        $validated = $request->validate([
            'email' => 'required|email',
            'nomor_telepon' => 'required|string',
        ]);

        $peserta->update($validated);
        return redirect()->route('seminar.index')->with('success', 'Participant updated successfully.');
    }

    public function destroy($id)
    {
        $peserta = PesertaSeminar::findOrFail($id);
        $peserta->delete();
        return redirect()->route('seminar.index')->with('success', 'Participant deleted successfully.');
    }
}
