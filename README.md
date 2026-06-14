# Schematics POS Application

Schematics POS is an integrated Point-Of-Sale (POS) and registration system developed for the Schematics event. It features real-time merchandise sales, transaction history, and seminar participant management.

## Key Features

- **Merchandise & POS**: Real-time sales interface for event merchandise.
- **Transaction History**: Comprehensive ledger for tracking all transactions.
- **Seminar Registration**: Management of seminar participants.
- **Optimized Performance**: Server-side pagination and advanced database indexing for managing millions of records without performance degradation.

## Database Indexing Strategies (For Presentation)

To ensure the application remains fast and responsive under heavy load (e.g., millions of transaction records), we have implemented comprehensive Database Indexing:

### 1. Primary & Foreign Key Indexes
All relational mappings inherently use indexes automatically provided by the database schema definitions. 
- **Migration Examples (`database/migrations/`):**
  - `$table->foreign('id_transaksi')` (Detail Transaksi)
  - `$table->foreign('id_pembeli')` (Transaksi & Peserta Seminar)
  - `$table->foreign('nrp')` (Transaksi)
  - `$table->foreign('id_event')` (Merchandise)

### 2. Custom Performance Indexes
We have explicitly created a dedicated migration `2026_06_08_064824_add_indexes_to_pos_tables.php` to optimize specific heavily queried columns. These ensure that filtering, searching, and sorting operations bypass expensive full-table scans.
- **`idx_waktu_pemesanan` (`waktu_pemesanan`)**: Speeds up the transaction ledger's chronological sorting (`ORDER BY waktu_pemesanan DESC`) and date-range filtering.
- **`idx_nama_pembeli` (`nama_lengkap`)**: Optimizes search functionality for looking up buyers by their full name.
- **`idx_fk_pembeli` (`id_pembeli` in `transaksi` table)**: Accelerates lookup operations when retrieving the purchase history of a specific participant.

By combining these indexing strategies with **Server-Side Pagination** on the backend controllers (`paginate(15)`), the server memory and response times are kept highly efficient regardless of database size.

## Technology Stack

- **Backend**: Laravel (PHP)
- **Frontend**: React.js with Inertia.js
- **Styling**: Tailwind CSS
