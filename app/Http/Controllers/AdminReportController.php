<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Exports\TransaksiExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class AdminReportController extends Controller
{
    public function exportExcel()
    {
        return Excel::download(new TransaksiExport, 'laporan_transaksi_'.date('Ymd').'.xlsx');
    }

    public function exportPdf()
    {
        $transaksis = Transaksi::with(['pembeli', 'staffFinance', 'metodePembayaran'])->get();
        
        $pdf = Pdf::loadView('exports.transaksi_pdf', compact('transaksis'));
        
        return $pdf->download('laporan_transaksi_'.date('Ymd').'.pdf');
    }
}
