# Product Requirements Document (PRD)
**Project Name:** Schematics ITS 2027 Merchandise POS & Admin System
**Framework:** Laravel 12 + Inertia.js (React) - Single Page Application (SPA)

## 1. Overview
Sistem ini adalah Point of Sale (POS) dan Admin Dashboard untuk manajemen penjualan merchandise event Schematics ITS 2027. Aplikasi ini melayani tiga antarmuka utama:
1. **Public Landing Page:** Halaman informatif untuk publik terkait event dan akses login.
2. **Staff Finance POS:** Antarmuka kasir bagi staf untuk memproses transaksi pembelian merchandise secara on-site dan pendaftaran peserta seminar (BST).
3. **Admin Dashboard:** Panel manajemen untuk mengelola data master (Staff, Merchandise) dan melihat riwayat transaksi.

## 2. Tech Stack & Infrastructure
- **Backend:** Laravel 12
- **Frontend:** React.js via Inertia.js (SPA mode)
- **Styling:** Tailwind CSS (Clean, modern UI, standar POS profesional)
- **Real-time Communication:** Laravel Reverb (WebSockets)
- **Export Engine:** `maatwebsite/excel` (Excel) dan `barryvdh/laravel-dompdf` (PDF)
- **Deployment & Server Architecture:** Aplikasi akan di-deploy menggunakan container Docker di atas environment Ubuntu Server (berjalan pada virtualisasi Proxmox). Untuk mengoptimalkan performa dan meminimalkan latensi *routing*, konfigurasi Nginx akan diatur untuk memprioritaskan *local proxy settings* dibandingkan *container-specific IP addresses*.

## 3. Database Architecture (Migration from SQL to Laravel)
Mengadaptasi skema SQL MBD (`FP (1).sql`) ke dalam Eloquent ORM. Logika *Trigger* dan *Stored Procedure* dari SQL akan dipindahkan ke level aplikasi (Laravel Observers & Action Classes).

**Tabel & Relasi Utama:**
- `pembeli`: `id` (PK), `nama_lengkap`.
- `peserta_seminar`: `id_peserta` (PK, string ex: BST0001), `email`, `nomor_telepon`, `id_pembeli` (FK, Unique).
- `staff_finance`: `nrp` (PK, string), `nama_lengkap`, `jenis_kelamin`, `nomor_telepon`, `password`.
- `staff_alamat`: `id` (PK), `alamat`, `finance_nrp` (FK). Maksimal 3 alamat per NRP.
- `metode_pembayaran`: `id` (PK), `nama_metode` (Tunai, QRIS, Transfer Bank).
- `merchandise`: `id` (PK), `nama_barang`, `asal_subevent`, `harga_barang`, `stok`.
- `transaksi`: `id_transaksi` (PK, string ex: TRS000001), `waktu_pemesanan`, `total_merchandise`, `total_harga`, `id_pembeli` (FK), `nrp_staff` (FK), `id_metode` (FK).
- `detail_transaksi`: `id_transaksi` (FK), `id_merchandise` (FK), `jumlah_barang`, `sub_total`.

## 4. Core Features & Functionalities

### 4.1. Public Landing Page & Auth
- Halaman depan berdesain modern-tech (dark theme dengan aksen biru/ungu neon).
- Menampilkan informasi event (NLC, NPC, NLDC, BST) dan katalog merchandise statis.
- Portal Login khusus Staff menggunakan `NRP` dan `Password`.

### 4.2. POS System (Staff Interface)
- **Katalog Produk:** Grid merchandise dengan filter berdasarkan sub-event.
- **Manajemen Keranjang (Cart):** Penambahan item, penyesuaian kuantitas, dan kalkulasi subtotal.
- **Form Pembeli & Upsell:** Input Nama Pembeli wajib. Terdapat *toggle* "Daftar Seminar BST". Jika aktif, field Email dan Nomor Telepon muncul.
- **Atomic Checkout:** Proses transaksi dibungkus dalam `DB::transaction()`. Pengurangan stok, generate ID kustom (`TRS...` & `BST...`), dan simpan data dilakukan secara atomik di sisi Laravel.
- **Real-time Stock Updates:** Setelah transaksi sukses, Laravel Reverb akan membroadcast *event* `StockUpdated` ke seluruh klien POS yang terhubung agar jumlah stok di layar kasir lain sinkron seketika tanpa perlu *refresh*.

### 4.3. Admin Dashboard
- CRUD Merchandise & CRUD Staff Finance (dengan dukungan form dinamis untuk 1-3 alamat).
- **Transaction History:** Tabel riwayat transaksi lengkap dengan relasi ke Staff dan Pembeli.
- **Export Data:** Tombol fungsional untuk mengunduh laporan transaksi dalam format `.xlsx` (Excel) dan `.pdf` (PDF).

## 5. Implementation Guidelines (Business Logic)
- **ID Generation:** Gunakan Eloquent Observers pada event `creating` di model `Transaksi` dan `PesertaSeminar` untuk membuat format ID kustom (misal `TRS000001`).
- **Data Validation:** Implementasi Laravel Form Requests secara ketat untuk setiap *endpoint* Inertia.
- **Realtime Listener:** Di sisi React, gunakan `laravel-echo` dan *adapter* Reverb untuk me-listen *channel* stok dan langsung melakukan state mutation pada data merchandise.