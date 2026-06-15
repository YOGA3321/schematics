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

### 3. How Laravel Retrieves Data via Indexing (Under the Hood)

In the Laravel backend (specifically within `app/Http/Controllers` and `ProcessTransactionAction.php`), Eloquent ORM seamlessly translates our PHP code into optimized SQL queries that utilize the database indexes. Here is how it works:

| Laravel Method | How it Uses Indexing | Example in Code |
|----------------|----------------------|-----------------|
| **`find($id)`** | Performs a direct `O(1)` lookup using the Primary Key index. Bypasses sequential scanning for immediate, real-time data retrieval. | `Merchandise::find($id)` |
| **`with('relation')`** | Solves the N+1 query problem using **Eager Loading**. It runs a single `WHERE IN (...)` query that heavily utilizes Foreign Key indexes to fetch related models instantly. | `Transaksi::with(['pembeli'])` |
| **`lockForUpdate()`** | Uses the Primary Key index to apply a secure **Row-Level Lock** during sensitive stock deductions, preventing race conditions without locking the entire table. | `Merchandise::lockForUpdate()->find($id)` |
| **`paginate(15)`** | Combines index-based ordering (like `ORDER BY created_at`) with SQL `LIMIT` and `OFFSET` to efficiently load only a small slice of data into memory at a time. | `PesertaSeminar::paginate(15)` |

**The Data Retrieval Workflow (Step-by-Step):**
1. **Request Received**: The frontend requests the Transaction list page.
2. **Query Preparation**: The Controller builds the query `Transaksi::with(...)->orderBy('waktu_pemesanan', 'desc')`.
3. **Index Hit**: The database engine sees the `orderBy` and uses our custom `idx_waktu_pemesanan` index to instantly sort the pointers without scanning the actual row data.
4. **Relational Index Hit**: The `with()` command fetches relationships using the foreign key indexes (`id_pembeli`, `id_metode`).
5. **Memory Efficiency**: `paginate()` ensures the database only returns exactly 15 indexed rows to the application memory.

## Technology Stack

- **Backend**: Laravel (PHP)
- **Frontend**: React.js with Inertia.js
- **Styling**: Tailwind CSS
