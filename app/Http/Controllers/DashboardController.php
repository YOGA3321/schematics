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

        // Fetch sub-event revenues using the stored function fn_pendapatan_event(id_event)
        $eventRevenues = \Illuminate\Support\Facades\DB::select("
            SELECT id_event, nama_subevent, fn_pendapatan_event(id_event) AS pendapatan
            FROM event
        ");

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalTransactions' => $totalTransactions,
                'totalRevenue' => $totalRevenue,
                'totalMerchSold' => $totalMerchSold,
            ],
            'recentTransactions' => $recentTransactions,
            'eventRevenues' => $eventRevenues
        ]);
    }
}
