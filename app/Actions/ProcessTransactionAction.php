<?php

namespace App\Actions;

use App\Models\Transaksi;
use App\Models\DetailTransaksi;
use App\Models\Merchandise;
use App\Models\Pembeli;
use App\Models\PesertaSeminar;
use App\Events\MerchandiseStockUpdated;
use Illuminate\Support\Facades\DB;
use Exception;

class ProcessTransactionAction
{
    /**
     * @param array $pembeliData ['nama_lengkap']
     * @param array|null $seminarData ['email', 'nomor_telepon']
     * @param string $nrp
     * @param int $idMetode
     * @param float|int $uangDiberikan
     * @param array $cartItems [['id_merchandise' => 1, 'jumlah' => 2]]
     */
    public function execute(array $pembeliData, ?array $seminarData, string $nrp, int $idMetode, $uangDiberikan, array $cartItems)
    {
        return DB::transaction(function () use ($pembeliData, $seminarData, $nrp, $idMetode, $uangDiberikan, $cartItems) {
            // 1. Create Pembeli
            $pembeli = Pembeli::create([
                'nama_lengkap' => $pembeliData['nama_lengkap'],
            ]);

            // 2. Create Peserta Seminar if requested
            if ($seminarData && !empty($seminarData['email'])) {
                PesertaSeminar::create([
                    'email' => $seminarData['email'],
                    'nomor_telepon' => $seminarData['nomor_telepon'],
                    'id_pembeli' => $pembeli->id_pembeli,
                ]);
            }

            // 3. Prepare Transaksi Data
            $totalHarga = 0;
            $totalMerchandise = 0;

            $detailTransaksiData = [];
            $updatedMerchandises = [];

            foreach ($cartItems as $item) {
                $merch = Merchandise::lockForUpdate()->find($item['id_merchandise']);
                if (!$merch) {
                    throw new Exception("Merchandise tidak ditemukan.");
                }

                if ($merch->stok < $item['jumlah']) {
                    throw new Exception("Stok untuk {$merch->tipe_merchandise} tidak mencukupi.");
                }

                // Deduct stock
                $merch->stok -= $item['jumlah'];
                $merch->save();

                $subTotal = $merch->harga_merchandise * $item['jumlah'];
                $totalHarga += $subTotal;
                $totalMerchandise += $item['jumlah'];

                $detailTransaksiData[] = [
                    'id_merchandise' => $merch->id_merchandise,
                    'jumlah_barang' => $item['jumlah'],
                    'harga_satuan' => $merch->harga_merchandise,
                    'total' => $subTotal,
                ];

                $updatedMerchandises[] = $merch;
            }

            if ($uangDiberikan < $totalHarga) {
                throw new Exception("Uang diberikan tidak mencukupi (Kurang Rp " . number_format($totalHarga - $uangDiberikan, 0, ',', '.') . ").");
            }
            $kembalian = $uangDiberikan - $totalHarga;

            // Create Transaksi
            $transaksi = Transaksi::create([
                'waktu_pemesanan' => now(),
                'total_merchandise' => $totalMerchandise,
                'total_harga' => $totalHarga,
                'uang_diberikan' => $uangDiberikan,
                'kembalian' => $kembalian,
                'id_pembeli' => $pembeli->id_pembeli,
                'nrp' => $nrp,
                'id_metode' => $idMetode,
            ]);

            // Create Detail Transaksi
            foreach ($detailTransaksiData as $detail) {
                $detail['id_transaksi'] = $transaksi->id_transaksi;
                DetailTransaksi::create($detail);
            }

            // Dispatch Event for Realtime Updates
            foreach ($updatedMerchandises as $merch) {
                broadcast(new MerchandiseStockUpdated($merch->id_merchandise, $merch->stok))->toOthers();
            }

            return $transaksi;
        });
    }
}
