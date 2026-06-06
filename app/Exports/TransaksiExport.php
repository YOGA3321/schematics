<?php

namespace App\Exports;

use App\Models\Transaksi;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TransaksiExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Transaksi::with(['pembeli', 'staffFinance', 'metodePembayaran'])->get();
    }

    public function headings(): array
    {
        return [
            'ID Transaksi',
            'Waktu Pemesanan',
            'Nama Pembeli',
            'Kasir (Staff)',
            'Metode Pembayaran',
            'Total Item',
            'Total Harga (Rp)'
        ];
    }

    public function map($transaksi): array
    {
        return [
            $transaksi->id_transaksi,
            $transaksi->waktu_pemesanan->format('Y-m-d H:i:s'),
            $transaksi->pembeli->nama_lengkap ?? '-',
            $transaksi->staffFinance->nama_lengkap ?? '-',
            $transaksi->metodePembayaran->metode_pembayaran ?? '-',
            $transaksi->total_merchandise,
            $transaksi->total_harga,
        ];
    }
}
