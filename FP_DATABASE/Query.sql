USE FP1;

-- Query untuk menampilkan tipe merchandise, sisa stok, dan total pendapatan per merchandise
SELECT 
    M.Tipe_Merchandise,
    M.Stok AS Sisa_Stok,
    IFNULL(SUM(DT.Total), 0) AS Total_Pendapatan
FROM Merchandise M
LEFT JOIN Detail_Transaksi DT ON M.ID_Merchandise = DT.ID_Merchandise
GROUP BY 
    M.ID_Merchandise, 
    M.Tipe_Merchandise, 
    M.Stok;

-- Query untuk menampilkan nama staff kasir yang melayani pembeli tertentu pada waktu tertentu
SELECT 
    SF.Nama_Lengkap AS Nama_Staff_Kasir
FROM Transaksi T
JOIN Pembeli P ON T.ID_Pembeli = P.ID_Pembeli
JOIN Staff_Finance SF ON T.NRP = SF.NRP
WHERE P.Nama_Lengkap = 'Nadia Putri' 
  AND T.Waktu_Pemesanan = '2026-05-03 14:10:00';

-- Query untuk menampilkan nama metode pembayaran dan total pendapatan per metode pembayaran
SELECT 
    MP.Metode_Pembayaran AS Nama_Metode_Pembayaran,
    SUM(T.Total_Harga) AS Total_Pendapatan
FROM Metode_Pembayaran MP
JOIN Transaksi T ON MP.ID_Metode = T.ID_Metode
GROUP BY 
    MP.Metode_Pembayaran
ORDER BY Total_Pendapatan DESC;

-- Query untuk menampilkan nama pembeli dan email peserta seminar
SELECT 
    P.Nama_Lengkap,
    PS.Email
FROM Pembeli P
JOIN Peserta_Seminar PS ON P.ID_Pembeli = PS.ID_Pembeli;

-- Query untuk menampilkan total transaksi dan total pendapatan per hari
SELECT 
    DATE(Waktu_Pemesanan) AS Tanggal_Transaksi,
    COUNT(ID_Transaksi) AS Jumlah_Transaksi,
    SUM(Total_Harga) AS Total_Pendapatan
FROM Transaksi T
GROUP BY DATE(Waktu_Pemesanan)
ORDER BY Tanggal_Transaksi ASC;