<!DOCTYPE html>
<html>
<head>
    <title>Laporan Transaksi</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { w-full; border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .text-right { text-align: right; }
        .header { text-align: center; margin-bottom: 30px; }
    </style>
</head>
<body onload="window.print()">
    <div class="header">
        <h2>Laporan Penjualan Merchandise Schematics</h2>
        @if($startDate || $endDate)
            <p>Periode: {{ $startDate ?? 'Awal' }} s/d {{ $endDate ?? 'Akhir' }}</p>
        @endif
    </div>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Waktu</th>
                <th>Pembeli</th>
                <th>Staff/Kasir</th>
                <th>Metode</th>
                <th>Total Item</th>
                <th>Total Harga</th>
            </tr>
        </thead>
        <tbody>
            @forelse($transactions as $t)
                <tr>
                    <td>TRX-{{ str_pad($t->id_transaksi, 4, '0', STR_PAD_LEFT) }}</td>
                    <td>{{ \Carbon\Carbon::parse($t->waktu_pemesanan)->format('d/m/Y H:i') }}</td>
                    <td>{{ $t->pembeli->nama_lengkap ?? '-' }}</td>
                    <td>{{ $t->staffFinance->nama_lengkap ?? '-' }}</td>
                    <td>{{ $t->metodePembayaran->nama_metode ?? '-' }}</td>
                    <td class="text-right">{{ $t->total_merchandise }}</td>
                    <td class="text-right">Rp {{ number_format($t->total_harga, 0, ',', '.') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" style="text-align: center;">Tidak ada transaksi</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
