<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Pembeli
        DB::table('pembeli')->insert([
            ['id_pembeli' => 1, 'nama_lengkap' => 'Raka Mahendra', 'created_at' => now(), 'updated_at' => now()],
            ['id_pembeli' => 2, 'nama_lengkap' => 'Claudia Evelyn', 'created_at' => now(), 'updated_at' => now()],
            ['id_pembeli' => 3, 'nama_lengkap' => 'Dimas Saputro', 'created_at' => now(), 'updated_at' => now()],
            ['id_pembeli' => 4, 'nama_lengkap' => 'Felix Jonathan', 'created_at' => now(), 'updated_at' => now()],
            ['id_pembeli' => 5, 'nama_lengkap' => 'Nadia Putri', 'created_at' => now(), 'updated_at' => now()],
            ['id_pembeli' => 6, 'nama_lengkap' => 'Yoga Pramana', 'created_at' => now(), 'updated_at' => now()],
            ['id_pembeli' => 7, 'nama_lengkap' => 'Keisya Anindita', 'created_at' => now(), 'updated_at' => now()],
            ['id_pembeli' => 8, 'nama_lengkap' => 'Arvin Kurniawan', 'created_at' => now(), 'updated_at' => now()],
            ['id_pembeli' => 9, 'nama_lengkap' => 'Salsa Aurelia', 'created_at' => now(), 'updated_at' => now()],
            ['id_pembeli' => 10, 'nama_lengkap' => 'Reynald Christian', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 2. Peserta Seminar
        DB::table('peserta_seminar')->insert([
            ['id_peserta' => 'BST0001', 'email' => 'reynaldc@gmail.com', 'nomor_telepon' => '081298761201', 'id_pembeli' => 10, 'created_at' => now(), 'updated_at' => now()],
            ['id_peserta' => 'BST0002', 'email' => 'nadput@gmail.com', 'nomor_telepon' => '081377882134', 'id_pembeli' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['id_peserta' => 'BST0003', 'email' => 'arvink@gmail.com', 'nomor_telepon' => '082145778921', 'id_pembeli' => 8, 'created_at' => now(), 'updated_at' => now()],
            ['id_peserta' => 'BST0004', 'email' => 'felixjon@gmail.com', 'nomor_telepon' => '081564738291', 'id_pembeli' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['id_peserta' => 'BST0005', 'email' => 'salsaaur@gmail.com', 'nomor_telepon' => '081298112345', 'id_pembeli' => 9, 'created_at' => now(), 'updated_at' => now()],
            ['id_peserta' => 'BST0006', 'email' => 'rakamahendra@gmail.com', 'nomor_telepon' => '082211119876', 'id_pembeli' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_peserta' => 'BST0007', 'email' => 'yogapram@gmail.com', 'nomor_telepon' => '081390087654', 'id_pembeli' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['id_peserta' => 'BST0008', 'email' => 'claudiaev@gmail.com', 'nomor_telepon' => '082233445566', 'id_pembeli' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_peserta' => 'BST0009', 'email' => 'keisyaaa@gmail.com', 'nomor_telepon' => '081712349988', 'id_pembeli' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['id_peserta' => 'BST0010', 'email' => 'dimas.sp@gmail.com', 'nomor_telepon' => '081455667788', 'id_pembeli' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 3. Staff Finance
        $defaultPassword = Hash::make('password123'); // Default password for all staff
        DB::table('staff_finance')->insert([
            ['nrp' => '5025251187', 'nama_lengkap' => 'Kevin Pratama', 'jenis_kelamin' => 'L', 'nomor_telepon' => '081300000001', 'password' => $defaultPassword, 'created_at' => now(), 'updated_at' => now()],
            ['nrp' => '505425034', 'nama_lengkap' => 'Michelle Tan', 'jenis_kelamin' => 'P', 'nomor_telepon' => '081300000002', 'password' => $defaultPassword, 'created_at' => now(), 'updated_at' => now()],
            ['nrp' => '505325012', 'nama_lengkap' => 'Rizky Ramadhan', 'jenis_kelamin' => 'L', 'nomor_telepon' => '081300000003', 'password' => $defaultPassword, 'created_at' => now(), 'updated_at' => now()],
            ['nrp' => '5025251274', 'nama_lengkap' => 'Felicia Amanda', 'jenis_kelamin' => 'P', 'nomor_telepon' => '081300000004', 'password' => $defaultPassword, 'created_at' => now(), 'updated_at' => now()],
            ['nrp' => '505425019', 'nama_lengkap' => 'William Jonathan', 'jenis_kelamin' => 'L', 'nomor_telepon' => '081300000005', 'password' => $defaultPassword, 'created_at' => now(), 'updated_at' => now()],
            ['nrp' => '5025251056', 'nama_lengkap' => 'Stefani Olivia', 'jenis_kelamin' => 'P', 'nomor_telepon' => '081300000006', 'password' => $defaultPassword, 'created_at' => now(), 'updated_at' => now()],
            ['nrp' => '505325037', 'nama_lengkap' => 'Bryan Sebastian', 'jenis_kelamin' => 'L', 'nomor_telepon' => '081300000007', 'password' => $defaultPassword, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 4. Staff Alamat
        DB::table('staff_alamat')->insert([
            ['id_alamat' => 1, 'alamat' => 'Jl. Raya ITS No. 1 Surabaya', 'finance_nrp' => '5025251187', 'created_at' => now(), 'updated_at' => now()],
            ['id_alamat' => 2, 'alamat' => 'Jl. Manyar Kertoarjo No. 10 Surabaya', 'finance_nrp' => '505425034', 'created_at' => now(), 'updated_at' => now()],
            ['id_alamat' => 3, 'alamat' => 'Jl. Dharmahusada No. 25 Surabaya', 'finance_nrp' => '505325012', 'created_at' => now(), 'updated_at' => now()],
            ['id_alamat' => 4, 'alamat' => 'Jl. Keputih Tegal No. 7 Surabaya', 'finance_nrp' => '5025251274', 'created_at' => now(), 'updated_at' => now()],
            ['id_alamat' => 5, 'alamat' => 'Jl. Merr Rungkut No. 8 Surabaya', 'finance_nrp' => '505425019', 'created_at' => now(), 'updated_at' => now()],
            ['id_alamat' => 6, 'alamat' => 'Jl. Arif Rahman Hakim No. 19 Surabaya', 'finance_nrp' => '5025251056', 'created_at' => now(), 'updated_at' => now()],
            ['id_alamat' => 7, 'alamat' => 'Jl. Sukolilo Baru No. 22 Surabaya', 'finance_nrp' => '505325037', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 5. Metode Pembayaran
        DB::table('metode_pembayaran')->insert([
            ['id_metode' => 1, 'metode_pembayaran' => 'Transfer Bank', 'created_at' => now(), 'updated_at' => now()],
            ['id_metode' => 2, 'metode_pembayaran' => 'QRIS', 'created_at' => now(), 'updated_at' => now()],
            ['id_metode' => 3, 'metode_pembayaran' => 'Tunai', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 6. Event
        DB::table('event')->insert([
            ['id_event' => 1, 'nama_subevent' => 'BST', 'created_at' => now(), 'updated_at' => now()],
            ['id_event' => 2, 'nama_subevent' => 'NPC', 'created_at' => now(), 'updated_at' => now()],
            ['id_event' => 3, 'nama_subevent' => 'NLC', 'created_at' => now(), 'updated_at' => now()],
            ['id_event' => 4, 'nama_subevent' => 'REEVA', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 7. Merchandise
        DB::table('merchandise')->insert([
            ['id_merchandise' => 1, 'tipe_merchandise' => 'Keychain', 'harga_merchandise' => 15000.00, 'stok' => 100, 'id_event' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_merchandise' => 2, 'tipe_merchandise' => 'Tshirt', 'harga_merchandise' => 85000.00, 'stok' => 50, 'id_event' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_merchandise' => 3, 'tipe_merchandise' => 'Tumbler', 'harga_merchandise' => 60000.00, 'stok' => 40, 'id_event' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_merchandise' => 4, 'tipe_merchandise' => 'Totebag', 'harga_merchandise' => 45000.00, 'stok' => 70, 'id_event' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_merchandise' => 5, 'tipe_merchandise' => 'Kipas', 'harga_merchandise' => 12000.00, 'stok' => 150, 'id_event' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id_merchandise' => 6, 'tipe_merchandise' => 'Lanyard', 'harga_merchandise' => 10000.00, 'stok' => 200, 'id_event' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id_merchandise' => 7, 'tipe_merchandise' => 'Sticker', 'harga_merchandise' => 5000.00, 'stok' => 300, 'id_event' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['id_merchandise' => 8, 'tipe_merchandise' => 'Tshirt', 'harga_merchandise' => 90000.00, 'stok' => 45, 'id_event' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 8. Transaksi
        DB::table('transaksi')->insert([
            ['id_transaksi' => 'TRS000001', 'waktu_pemesanan' => '2026-05-01 09:15:00', 'total_merchandise' => 2, 'total_harga' => 100000.00, 'id_pembeli' => 1, 'nrp' => '5025251187', 'id_metode' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_transaksi' => 'TRS000002', 'waktu_pemesanan' => '2026-05-01 10:20:00', 'total_merchandise' => 1, 'total_harga' => 85000.00, 'id_pembeli' => 2, 'nrp' => '505425034', 'id_metode' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_transaksi' => 'TRS000003', 'waktu_pemesanan' => '2026-05-02 11:05:00', 'total_merchandise' => 3, 'total_harga' => 135000.00, 'id_pembeli' => 3, 'nrp' => '505325012', 'id_metode' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id_transaksi' => 'TRS000004', 'waktu_pemesanan' => '2026-05-02 13:40:00', 'total_merchandise' => 2, 'total_harga' => 70000.00, 'id_pembeli' => 4, 'nrp' => '5025251274', 'id_metode' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_transaksi' => 'TRS000005', 'waktu_pemesanan' => '2026-05-03 14:10:00', 'total_merchandise' => 4, 'total_harga' => 200000.00, 'id_pembeli' => 5, 'nrp' => '505425019', 'id_metode' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_transaksi' => 'TRS000006', 'waktu_pemesanan' => '2026-05-03 15:30:00', 'total_merchandise' => 5, 'total_harga' => 50000.00, 'id_pembeli' => 6, 'nrp' => '5025251056', 'id_metode' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id_transaksi' => 'TRS000007', 'waktu_pemesanan' => '2026-05-04 16:45:00', 'total_merchandise' => 2, 'total_harga' => 95000.00, 'id_pembeli' => 7, 'nrp' => '505325037', 'id_metode' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_transaksi' => 'TRS000008', 'waktu_pemesanan' => '2026-05-04 18:00:00', 'total_merchandise' => 1, 'total_harga' => 15000.00, 'id_pembeli' => 8, 'nrp' => '5025251187', 'id_metode' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_transaksi' => 'TRS000009', 'waktu_pemesanan' => '2026-05-05 19:20:00', 'total_merchandise' => 3, 'total_harga' => 180000.00, 'id_pembeli' => 9, 'nrp' => '505425034', 'id_metode' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_transaksi' => 'TRS000010', 'waktu_pemesanan' => '2026-05-05 20:10:00', 'total_merchandise' => 2, 'total_harga' => 90000.00, 'id_pembeli' => 10, 'nrp' => '505325012', 'id_metode' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 9. Detail Transaksi
        DB::table('detail_transaksi')->insert([
            ['id_detail' => 1, 'jumlah_barang' => 1, 'harga_satuan' => 15000.00, 'total' => 15000.00, 'id_transaksi' => 'TRS000001', 'id_merchandise' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_detail' => 2, 'jumlah_barang' => 1, 'harga_satuan' => 85000.00, 'total' => 85000.00, 'id_transaksi' => 'TRS000001', 'id_merchandise' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_detail' => 3, 'jumlah_barang' => 1, 'harga_satuan' => 85000.00, 'total' => 85000.00, 'id_transaksi' => 'TRS000002', 'id_merchandise' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_detail' => 4, 'jumlah_barang' => 3, 'harga_satuan' => 45000.00, 'total' => 135000.00, 'id_transaksi' => 'TRS000003', 'id_merchandise' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['id_detail' => 5, 'jumlah_barang' => 2, 'harga_satuan' => 35000.00, 'total' => 70000.00, 'id_transaksi' => 'TRS000004', 'id_merchandise' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['id_detail' => 6, 'jumlah_barang' => 2, 'harga_satuan' => 60000.00, 'total' => 120000.00, 'id_transaksi' => 'TRS000005', 'id_merchandise' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id_detail' => 7, 'jumlah_barang' => 2, 'harga_satuan' => 40000.00, 'total' => 80000.00, 'id_transaksi' => 'TRS000005', 'id_merchandise' => 8, 'created_at' => now(), 'updated_at' => now()],
            ['id_detail' => 8, 'jumlah_barang' => 5, 'harga_satuan' => 10000.00, 'total' => 50000.00, 'id_transaksi' => 'TRS000006', 'id_merchandise' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['id_detail' => 9, 'jumlah_barang' => 1, 'harga_satuan' => 45000.00, 'total' => 45000.00, 'id_transaksi' => 'TRS000007', 'id_merchandise' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['id_detail' => 10, 'jumlah_barang' => 1, 'harga_satuan' => 50000.00, 'total' => 50000.00, 'id_transaksi' => 'TRS000007', 'id_merchandise' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id_detail' => 11, 'jumlah_barang' => 1, 'harga_satuan' => 15000.00, 'total' => 15000.00, 'id_transaksi' => 'TRS000008', 'id_merchandise' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_detail' => 12, 'jumlah_barang' => 3, 'harga_satuan' => 60000.00, 'total' => 180000.00, 'id_transaksi' => 'TRS000009', 'id_merchandise' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id_detail' => 13, 'jumlah_barang' => 1, 'harga_satuan' => 90000.00, 'total' => 90000.00, 'id_transaksi' => 'TRS000010', 'id_merchandise' => 8, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
