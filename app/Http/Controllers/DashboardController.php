<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaksi;
use App\Models\Merchandise;
use App\Models\DetailTransaksi;

class DashboardController extends Controller
{
    public function index()
    {
        $totalTransactions = Transaksi::count();
        $totalRevenue = Transaksi::sum('total_harga');
        $totalMerchSold = Transaksi::sum('total_merchandise');
        
        $recentTransactions = Transaksi::with(['pembeli', 'metodePembayaran'])
            ->orderBy('waktu_pemesanan', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalTransactions' => $totalTransactions,
                'totalRevenue' => $totalRevenue,
                'totalMerchSold' => $totalMerchSold,
            ],
            'recentTransactions' => $recentTransactions
        ]);
    }
}
