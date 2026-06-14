USE FP1;

-- Indexing pada waktu pemesanan untuk mempercepat query berdasarkan waktu
CREATE INDEX idx_waktu_pemesanan ON Transaksi(Waktu_Pemesanan);

-- Indexing pada nama pembeli untuk mempercepat pencarian berdasarkan nama
CREATE INDEX idx_nama_pembeli ON Pembeli(Nama_Lengkap);
CREATE INDEX idx_fk_pembeli ON Transaksi(ID_Pembeli);