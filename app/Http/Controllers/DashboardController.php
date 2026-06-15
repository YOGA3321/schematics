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
        // === PENGAMBILAN DATA INDEXING ===
        // Mengambil data agregat (count, sum) untuk ringkasan dashboard
        $totalTransactions = Transaksi::count();
        $totalRevenue = Transaksi::sum('total_harga');
        $totalMerchSold = Transaksi::sum('total_merchandise');
        
        // Mengambil 5 data transaksi terbaru beserta relasinya
        $recentTransactions = Transaksi::with(['pembeli', 'metodePembayaran'])
            ->orderBy('waktu_pemesanan', 'desc')
            ->take(5)
            ->get();

        // Fetch sub-event revenues using the stored function fn_pendapatan_event(id_event)
        $eventRevenues = \Illuminate\Support\Facades\DB::select("
            SELECT id_event, nama_subevent, fn_pendapatan_event(id_event) AS pendapatan
            FROM event
        ");

        $salesByDate = \Illuminate\Support\Facades\DB::table('transaksi')
            ->selectRaw('DATE(waktu_pemesanan) as date, SUM(total_harga) as revenue')
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->limit(7)
            ->get()
            ->reverse()
            ->values();

        $salesByItem = \Illuminate\Support\Facades\DB::table('detail_transaksi')
            ->join('merchandise', 'detail_transaksi.id_merchandise', '=', 'merchandise.id_merchandise')
            ->select('merchandise.tipe_merchandise as name', \Illuminate\Support\Facades\DB::raw('SUM(detail_transaksi.jumlah_barang) as total_sold'))
            ->groupBy('merchandise.id_merchandise', 'merchandise.tipe_merchandise')
            ->orderByDesc('total_sold')
            ->limit(6)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalTransactions' => $totalTransactions,
                'totalRevenue' => $totalRevenue,
                'totalMerchSold' => $totalMerchSold,
            ],
            'recentTransactions' => $recentTransactions,
            'eventRevenues' => $eventRevenues,
            'salesByDate' => $salesByDate,
            'salesByItem' => $salesByItem
        ]);
    }
}
