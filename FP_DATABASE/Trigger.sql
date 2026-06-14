USE FP1;

-- trigger untuk cek stok
DELIMITER $$
create trigger trg_cek_stok BEFORE INSERT ON Detail_Transaksi
FOR EACH ROW
BEGIN
    declare stok_sekarang int;
    select Stok into stok_sekarang from Merchandise where ID_Merchandise = NEW.ID_Merchandise;

    IF stok_sekarang < NEW.Jumlah_Barang THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'stok tidak mencukupi';
    END IF;
END$$
DELIMITER ;

-- trigger untuk hitung total detail transaksi
DELIMITER $$
create trigger trg_hitung_detail BEFORE INSERT ON Detail_Transaksi
FOR EACH ROW
BEGIN
    set NEW.Harga_Satuan = (select Harga_Merchandise from Merchandise where ID_Merchandise = NEW.ID_Merchandise);
    set NEW.Total = NEW.Harga_Satuan * NEW.Jumlah_Barang;
END$$
DELIMITER ;

--trigger kurangi stok merch
DELIMITER $$
create trigger trg_kurangi_stok AFTER INSERT ON Detail_Transaksi
FOR EACH ROW
BEGIN
    update Merchandise set
    stok = stok - NEW.Jumlah_barang where ID_Merchandise = NEW.ID_Merchandise;
END$$
DELIMITER ;

-- trigger hitung total harga & total merch
DELIMITER $$
create trigger trg_update_total_transaksi AFTER INSERT ON Detail_Transaksi
FOR EACH ROW
BEGIN
    update Transaksi set
    Total_Merchandise = (select SUM(Jumlah_Barang) from Detail_Transaksi where ID_Transaksi = NEW.ID_Transaksi),
    Total_harga = (select SUM(Total) from Detail_Transaksi where ID_Transaksi = NEW.ID_Transaksi)
    where ID_Transaksi = NEW.ID_Transaksi;
END$$
DELIMITER ;

-- contoh penggunaan
INSERT INTO Detail_Transaksi
(Jumlah_Barang, ID_Transaksi, ID_Merchandise)
VALUES
(2, 'TRS000012', 1);

-- Trigger untuk generate ID Transaksi
DELIMITER $$
CREATE TRIGGER trg_generate_id_transaksi 
BEFORE INSERT ON Transaksi
FOR EACH ROW
BEGIN
    DECLARE max_id INT;
    DECLARE new_id CHAR(9);
    
    SELECT IFNULL(MAX(CAST(SUBSTRING(ID_Transaksi, 4) AS UNSIGNED)), 0) INTO max_id 
    FROM Transaksi;
    
    SET new_id = CONCAT('TRS', LPAD(max_id + 1, 6, '0')); 
    SET NEW.ID_Transaksi = new_id;
END$$
DELIMITER ;

-- contoh penggunaan trigger generate ID Transaksi
INSERT INTO Transaksi (Waktu_Pemesanan, Total_Merchandise, Total_Harga, ID_Pembeli, NRP, ID_Metode) 
VALUES (NOW(), 0, 0.00, 1, '5025251187', 1);

-- Trigger untuk generate ID Peserta
DELIMITER $$
CREATE TRIGGER trg_generate_id_peserta 
BEFORE INSERT ON Peserta_Seminar
FOR EACH ROW
BEGIN
    DECLARE max_id INT;
    DECLARE new_id CHAR(7);
    
    SELECT IFNULL(MAX(CAST(SUBSTRING(ID_Peserta, 4) AS UNSIGNED)), 0) INTO max_id 
    FROM Peserta_Seminar;
    
    -- Generate ID baru
    SET new_id = CONCAT('BST', LPAD(max_id + 1, 4, '0'));
    SET NEW.ID_Peserta = new_id;
END$$
DELIMITER ;

-- contoh penggunaan trigger generate ID Peserta
INSERT INTO Pembeli (Nama_Lengkap) VALUES ('John Doe');
INSERT INTO Peserta_Seminar (Email, Nomor_Telepon, ID_Pembeli) VALUES ('john.doe@example.com', '081234567890', 11);