# Aplikasi POS Schematics

Schematics POS adalah sistem Point-Of-Sale (POS) dan pendaftaran terintegrasi yang dikembangkan untuk acara Schematics. Sistem ini dilengkapi fitur penjualan *merchandise* secara real-time, riwayat transaksi, dan manajemen peserta seminar.

## Fitur Utama

- **Merchandise & POS**: Antarmuka penjualan kasir *real-time* untuk *merchandise* acara.
- **Riwayat Transaksi**: Pembukuan komprehensif untuk melacak seluruh transaksi.
- **Pendaftaran Seminar**: Manajemen pendaftaran peserta seminar.
- **Performa Optimal**: Menggunakan *server-side pagination* dan sistem *indexing database* tingkat lanjut untuk menangani jutaan data tanpa penurunan performa.

## Strategi Database Indexing

Untuk memastikan aplikasi tetap cepat dan responsif saat menahan beban berat (misal: jutaan data transaksi), kami mengimplementasikan Strategi Indexing Database yang komprehensif:

### 1. Primary & Foreign Key Indexes
Setiap relasi tabel secara otomatis memanfaatkan *index* bawaan dari skema *database*.
- **Contoh pada file Migration (`database/migrations/`):**
  - `$table->foreign('id_transaksi')` (Detail Transaksi)
  - `$table->foreign('id_pembeli')` (Transaksi & Peserta Seminar)
  - `$table->foreign('nrp')` (Transaksi)
  - `$table->foreign('id_event')` (Merchandise)

### 2. Custom Performance Indexes
Kami juga membuat file *migration* khusus (`2026_06_08_064824_add_indexes_to_pos_tables.php`) untuk mengoptimalkan kolom-kolom yang sering dicari. Ini memastikan proses *filter*, pencarian, dan *sorting* melewati metode *full-table scan* yang lambat.
- **`idx_waktu_pemesanan` (`waktu_pemesanan`)**: Mempercepat proses pengurutan waktu transaksi (`ORDER BY waktu_pemesanan DESC`) dan *filter* rentang tanggal.
- **`idx_nama_pembeli` (`nama_lengkap`)**: Mengoptimalkan fitur pencarian nama lengkap pembeli secara langsung.
- **`idx_fk_pembeli` (`id_pembeli` di tabel `transaksi`)**: Mempercepat operasi pencarian saat sistem mengambil riwayat belanja dari pelanggan tertentu.

Dengan menggabungkan strategi *indexing* ini dan metode **Server-Side Pagination** pada *controller* backend (`paginate(15)`), penggunaan memori *server* dan waktu respons akan tetap stabil dan cepat seberapapun besar *database*-nya.

### 3. Cara Laravel Mengambil Data via Indexing (Under the Hood)

Di dalam *backend* Laravel (terutama pada folder `app/Http/Controllers` dan `ProcessTransactionAction.php`), Eloquent ORM secara otomatis menerjemahkan kode PHP kita menjadi *query* SQL teroptimasi yang memanfaatkan *index database*. Berikut cara kerjanya:

| Metode Laravel | Cara Memanfaatkan Indexing | Contoh pada Kode |
|----------------|----------------------------|------------------|
| **`find($id)`** | Melakukan pencarian absolut `O(1)` menggunakan *Primary Key index*. Melewati proses pengecekan baris demi baris, sehingga data terambil sangat cepat secara *real-time*. | `Merchandise::find($id)` |
| **`with('relation')`** | Menyelesaikan masalah *N+1 query* menggunakan **Eager Loading**. Sistem hanya me-run 1 *query* tambahan (`WHERE IN (...)`) yang sangat bergantung pada *Foreign Key index* untuk menarik seluruh relasi data dalam sekejap. | `Transaksi::with(['pembeli'])` |
| **`lockForUpdate()`** | Menggunakan *Primary Key index* untuk melakukan **Row-Level Lock** (mengunci 1 baris secara aman) saat pemotongan stok, mencegah *race condition* tanpa harus mengunci seluruh tabel *database*. | `Merchandise::lockForUpdate()->find($id)` |
| **`paginate(15)`** | Menggabungkan *index* pengurutan data (seperti `ORDER BY created_at`) dengan fitur `LIMIT` dan `OFFSET` milik SQL, sehingga *server* hanya perlu menarik sepenggal data kecil ke dalam memorinya. | `PesertaSeminar::paginate(15)` |

**Alur Pengambilan Data (Step-by-Step):**
1. **Request Diterima**: Sisi *Frontend* meminta data halaman daftar Transaksi.
2. **Persiapan Query**: *Controller* membangun *query*: `Transaksi::with(...)->orderBy('waktu_pemesanan', 'desc')`.
3. **Index Hit**: Mesin *database* melihat perintah `orderBy` dan langsung menggunakan custom index kita (`idx_waktu_pemesanan`) untuk mengurutkan *pointer* tanpa harus men-scan isi barisnya.
4. **Relational Index Hit**: Perintah `with()` memanggil tabel relasi dengan memanfaatkan *foreign key index* (`id_pembeli`, `id_metode`).
5. **Efisiensi Memori**: Metode `paginate()` memastikan bahwa *database* hanya benar-benar mengembalikan pas 15 baris data (yang sudah di-*index*) ke dalam memori aplikasi.

## Technology Stack

- **Backend**: Laravel (PHP)
- **Frontend**: React.js dengan Inertia.js
- **Styling**: Tailwind CSS
