<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        // === PENGAMBILAN DATA INDEXING ===
        // Menyiapkan query untuk mengambil transaksi beserta relasi terkait untuk tabel daftar Transaksi
        $query = Transaksi::with(['pembeli', 'metodePembayaran', 'staffFinance'])
            ->orderBy('waktu_pemesanan', 'desc');

        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('waktu_pemesanan', '>=', $request->start_date);
        }
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('waktu_pemesanan', '<=', $request->end_date);
        }

        return Inertia::render('Transaction/Index', [
            'transactions' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['start_date', 'end_date'])
        ]);
    }

    public function show($id)
    {
        $transaction = Transaksi::with(['pembeli', 'metodePembayaran', 'detailTransaksi.merchandise', 'staffFinance'])
            ->findOrFail($id);

        return Inertia::render('Transaction/Show', [
            'transaction' => $transaction
        ]);
    }

    public function pdf(Request $request)
    {
        $query = Transaksi::with(['pembeli', 'metodePembayaran', 'staffFinance'])
            ->orderBy('waktu_pemesanan', 'desc');

        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('waktu_pemesanan', '>=', $request->start_date);
        }
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('waktu_pemesanan', '<=', $request->end_date);
        }

        $transactions = $query->get();
        $startDate = $request->start_date;
        $endDate = $request->end_date;

        return view('transaction.pdf', compact('transactions', 'startDate', 'endDate'));
    }
}
