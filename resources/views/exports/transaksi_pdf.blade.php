<!DOCTYPE html>
<html>
<head>
    <title>Laporan Transaksi</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .text-right { text-align: right; }
    </style>
</head>
<body>
    <h2>Laporan Transaksi POS Schematics</h2>
    <p>Tanggal Cetak: {{ now()->format('Y-m-d H:i:s') }}</p>

    <table>
        <thead>
            <tr>
                <th>ID Transaksi</th>
                <th>Waktu</th>
                <th>Pembeli</th>
                <th>Kasir</th>
                <th>Metode</th>
                <th>Item</th>
                <th>Total (Rp)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transaksis as $t)
            <tr>
                <td>{{ $t->id_transaksi }}</td>
                <td>{{ $t->waktu_pemesanan->format('Y-m-d H:i') }}</td>
                <td>{{ $t->pembeli->nama_lengkap ?? '-' }}</td>
                <td>{{ $t->staffFinance->nama_lengkap ?? '-' }}</td>
                <td>{{ $t->metodePembayaran->metode_pembayaran ?? '-' }}</td>
                <td>{{ $t->total_merchandise }}</td>
                <td class="text-right">{{ number_format($t->total_harga, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
