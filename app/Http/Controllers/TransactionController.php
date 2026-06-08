<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaksi::with(['pembeli', 'metodePembayaran', 'detailTransaksi.merchandise', 'staffFinance'])
            ->orderBy('waktu_pemesanan', 'desc')
            ->get();

        return Inertia::render('Transaction/Index', [
            'transactions' => $transactions
        ]);
    }
}
