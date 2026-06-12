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

            // 3. Create Transaksi (with 0 placeholder for total_merchandise and total_harga)
            // Triggers on detail_transaksi will calculate and update total_merchandise & total_harga automatically.
            $transaksi = Transaksi::create([
                'waktu_pemesanan' => now(),
                'total_merchandise' => 0,
                'total_harga' => 0.00,
                'uang_diberikan' => $uangDiberikan,
                'kembalian' => 0.00,
                'id_pembeli' => $pembeli->id_pembeli,
                'nrp' => $nrp,
                'id_metode' => $idMetode,
            ]);

            // 4. Create Detail Transaksi records
            // This will trigger trg_cek_stok, trg_hitung_detail, trg_kurangi_stok, and trg_update_total_transaksi
            foreach ($cartItems as $item) {
                $merch = Merchandise::lockForUpdate()->find($item['id_merchandise']);
                if (!$merch) {
                    throw new Exception("Merchandise tidak ditemukan.");
                }

                DetailTransaksi::create([
                    'id_transaksi' => $transaksi->id_transaksi,
                    'id_merchandise' => $merch->id_merchandise,
                    'jumlah_barang' => $item['jumlah'],
                    'harga_satuan' => 0.00, // calculated automatically by trigger trg_hitung_detail
                    'total' => 0.00,        // calculated automatically by trigger trg_hitung_detail
                ]);
            }

            // 5. Refresh the transaction instance to fetch trigger-updated total_harga and total_merchandise
            $transaksi->refresh();

            // 6. Validate if the provided payment is sufficient
            if ($uangDiberikan < $transaksi->total_harga) {
                throw new Exception("Uang diberikan tidak mencukupi (Kurang Rp " . number_format($transaksi->total_harga - $uangDiberikan, 0, ',', '.') . ").");
            }

            // 7. Calculate and save the correct kembalian
            $transaksi->kembalian = $uangDiberikan - $transaksi->total_harga;
            $transaksi->save();

            // Dispatch Event for Realtime Updates with the new stock amounts
            foreach ($cartItems as $item) {
                $merch = Merchandise::find($item['id_merchandise']);
                broadcast(new MerchandiseStockUpdated($merch->id_merchandise, $merch->stok))->toOthers();
            }

            return $transaksi;
        });
    }
}
