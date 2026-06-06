CREATE DATABASE IF NOT EXISTS FP1;
USE FP1;

create table Pembeli(
    ID_Pembeli int AUTO_INCREMENT primary key,
    Nama_Lengkap varchar(50) not null
);

create table Peserta_Seminar(
    ID_Peserta char(7) primary key,
    Email varchar(25) not null,
    Nomor_Telepon varchar(14) not null,
    ID_Pembeli int not null unique,
    foreign key (ID_Pembeli) references Pembeli(ID_Pembeli) on delete cascade on update cascade
);

create table Staff_Finance(
    NRP char(10) primary key,
    Nama_Lengkap varchar(50) not null,
    Jenis_Kelamin char(1) not null,
    Nomor_Telepon varchar(14) not null
);

create table Staff_Alamat(
    ID_Alamat INT AUTO_INCREMENT primary key,
    Alamat text not null,
    Finance_NRP char(10) not null,
    foreign key (Finance_NRP) references Staff_Finance(NRP) on delete cascade on update cascade
);

create table Metode_Pembayaran(
    ID_Metode int AUTO_INCREMENT primary key,
    Metode_Pembayaran varchar(20) not null
);

create table Transaksi (
    ID_Transaksi char(9) primary key,
    Waktu_Pemesanan Datetime not null,
    Total_Merchandise int not null,
    Total_Harga Decimal(10,2) not null,
    ID_Pembeli int not null,
    NRP char(10) not null,
    ID_Metode int not null,
    foreign key (ID_Pembeli) references Pembeli(ID_Pembeli) on delete cascade on update cascade,
    foreign key (NRP) references Staff_Finance(NRP) on delete cascade on update cascade,
    foreign key (ID_Metode) references Metode_Pembayaran(ID_Metode) on delete cascade on update cascade
);

create table Event(
    ID_Event int AUTO_INCREMENT primary key,
    Nama_Subevent varchar(25) not null
);

create table Merchandise(
    ID_Merchandise int AUTO_INCREMENT primary key,
    Tipe_Merchandise varchar(10) not null,
    Harga_Merchandise decimal(10,2) not null,
    Stok int not null,
    ID_Event int not null,
    foreign key (ID_Event) references Event(ID_Event) on delete cascade on update cascade
);

create table Detail_Transaksi(
    ID_Detail int AUTO_INCREMENT primary key,
    Jumlah_Barang int not null,
    Harga_Satuan decimal(10,2) not null,
    Total decimal(10, 2) not null,
    ID_Transaksi char(9) not null,
    ID_Merchandise int not null,
    foreign key (ID_Transaksi) references Transaksi(ID_Transaksi) on delete cascade on update cascade,
    foreign key (ID_Merchandise) references Merchandise(ID_Merchandise) on delete cascade on update cascade
);

--data dummy

INSERT INTO Pembeli (Nama_Lengkap) VALUES
('Raka Mahendra'),
('Claudia Evelyn'),
('Dimas Saputro'),
('Felix Jonathan'),
('Nadia Putri'),
('Yoga Pramana'),
('Keisya Anindita'),
('Arvin Kurniawan'),
('Salsa Aurelia'),
('Reynald Christian');

INSERT INTO Peserta_Seminar 
(ID_Peserta, Email, Nomor_Telepon, ID_Pembeli)
VALUES
('BST0001', 'reynaldc@gmail.com', '081298761201', 10),
('BST0002', 'nadput@gmail.com', '081377882134', 5),
('BST0003', 'arvink@gmail.com', '082145778921', 8),
('BST0004', 'felixjon@gmail.com', '081564738291', 4),
('BST0005', 'salsaaur@gmail.com', '081298112345', 9),
('BST0006', 'rakamahendra@gmail.com', '082211119876', 1),
('BST0007', 'yogapram@gmail.com', '081390087654', 6),
('BST0008', 'claudiaev@gmail.com', '082233445566', 2),
('BST0009', 'keisyaaa@gmail.com', '081712349988', 7),
('BST0010', 'dimas.sp@gmail.com', '081455667788', 3);

INSERT INTO Staff_Finance
(NRP, Nama_Lengkap, Jenis_Kelamin, Nomor_Telepon)
VALUES
('5025251187', 'Kevin Pratama', 'L', '081300000001'),
('505425034', 'Michelle Tan', 'P', '081300000002'),
('505325012', 'Rizky Ramadhan', 'L', '081300000003'),
('5025251274', 'Felicia Amanda', 'P', '081300000004'),
('505425019', 'William Jonathan', 'L', '081300000005'),
('5025251056', 'Stefani Olivia', 'P', '081300000006'),
('505325037', 'Bryan Sebastian', 'L', '081300000007');

INSERT INTO Staff_Alamat
(Alamat, Finance_NRP)
VALUES
('Jl. Raya ITS No. 1 Surabaya', '5025251187'),
('Jl. Manyar Kertoarjo No. 10 Surabaya', '505425034'),
('Jl. Dharmahusada No. 25 Surabaya', '505325012'),
('Jl. Keputih Tegal No. 7 Surabaya', '5025251274'),
('Jl. Merr Rungkut No. 8 Surabaya', '505425019'),
('Jl. Arif Rahman Hakim No. 19 Surabaya', '5025251056'),
('Jl. Sukolilo Baru No. 22 Surabaya', '505325037');

INSERT INTO Metode_Pembayaran
(Metode_Pembayaran)
VALUES
('Transfer Bank'),
('QRIS'),
('Tunai');

INSERT INTO Event
(Nama_Subevent)
VALUES
('BST'),
('NPC'),
('NLC'),
('REEVA');

INSERT INTO Merchandise
(Tipe_Merchandise, Harga_Merchandise, Stok, ID_Event)
VALUES
('Keychain', 15000.00, 100, 1),
('Tshirt', 85000.00, 50, 1),
('Tumbler', 60000.00, 40, 2),
('Totebag', 45000.00, 70, 2),
('Kipas', 12000.00, 150, 3),
('Lanyard', 10000.00, 200, 3),
('Sticker', 5000.00, 300, 4),
('Tshirt', 90000.00, 45, 4);

INSERT INTO Transaksi
(ID_Transaksi, Waktu_Pemesanan, Total_Merchandise,
 Total_Harga, ID_Pembeli, NRP, ID_Metode)
VALUES
('TRS000001', '2026-05-01 09:15:00', 2, 100000.00, 1, '5025251187', 1),
('TRS000002', '2026-05-01 10:20:00', 1, 85000.00, 2, '505425034', 2),
('TRS000003', '2026-05-02 11:05:00', 3, 135000.00, 3, '505325012', 3),
('TRS000004', '2026-05-02 13:40:00', 2, 70000.00, 4, '5025251274', 1),
('TRS000005', '2026-05-03 14:10:00', 4, 200000.00, 5, '505425019', 2),
('TRS000006', '2026-05-03 15:30:00', 5, 50000.00, 6, '5025251056', 3),
('TRS000007', '2026-05-04 16:45:00', 2, 95000.00, 7, '505325037', 1),
('TRS000008', '2026-05-04 18:00:00', 1, 15000.00, 8, '5025251187', 2),
('TRS000009', '2026-05-05 19:20:00', 3, 180000.00, 9, '505425034', 1),
('TRS000010', '2026-05-05 20:10:00', 2, 90000.00, 10, '505325012', 3);

INSERT INTO Detail_Transaksi
(Jumlah_Barang, Harga_Satuan, Total, ID_Transaksi, ID_Merchandise)
VALUES
(1, 15000.00, 15000.00, 'TRS000001', 1),
(1, 85000.00, 85000.00, 'TRS000001', 2),

(1, 85000.00, 85000.00, 'TRS000002', 2),

(3, 45000.00, 135000.00, 'TRS000003', 4),

(2, 35000.00, 70000.00, 'TRS000004', 4),

(2, 60000.00, 120000.00, 'TRS000005', 3),
(2, 40000.00, 80000.00, 'TRS000005', 8),

(5, 10000.00, 50000.00, 'TRS000006', 6),

(1, 45000.00, 45000.00, 'TRS000007', 4),
(1, 50000.00, 50000.00, 'TRS000007', 3),

(1, 15000.00, 15000.00, 'TRS000008', 1),

(3, 60000.00, 180000.00, 'TRS000009', 3),

(1, 90000.00, 90000.00, 'TRS000010', 8);

-- Prosedur untuk melakukan cek stok sebelum melakukan transaksi
DELIMITER $$
CREATE PROCEDURE Cek_Stok(
    IN p_ID_Merchandise INT,
    IN p_Jumlah_Barang INT,
    OUT p_Stok_Cukup BOOLEAN
)
BEGIN
    DECLARE v_Stok INT;
    
    SELECT Stok INTO v_Stok FROM Merchandise WHERE ID_Merchandise = p_ID_Merchandise;
    
    IF v_Stok >= p_Jumlah_Barang THEN
        SET p_Stok_Cukup = TRUE;
    ELSE
        SET p_Stok_Cukup = FALSE;
    END IF;
END$$
DELIMITER ;

-- Contoh penggunaan ketika melakukan transaksi
DELIMITER $$

CREATE PROCEDURE Proses_Transaksi(
    IN p_ID_Transaksi CHAR(9),
    IN p_ID_Merchandise INT,
    IN p_Jumlah_Barang INT
)
BEGIN
    DECLARE v_Stok_Cukup BOOLEAN;
    DECLARE v_Harga DECIMAL(10,2);
    DECLARE v_Total DECIMAL(10,2);
    
    CALL Cek_Stok(p_ID_Merchandise, p_Jumlah_Barang, v_Stok_Cukup);
    
    IF v_Stok_Cukup THEN
        
        SELECT Harga_Merchandise INTO v_Harga 
        FROM Merchandise 
        WHERE ID_Merchandise = p_ID_Merchandise;
        
        SET v_Total = v_Harga * p_Jumlah_Barang;
        
        INSERT INTO Detail_Transaksi (Jumlah_Barang, Harga_Satuan, Total, ID_Transaksi, ID_Merchandise)
        VALUES (p_Jumlah_Barang, v_Harga, v_Total, p_ID_Transaksi, p_ID_Merchandise);
        
        UPDATE Merchandise 
        SET Stok = Stok - p_Jumlah_Barang 
        WHERE ID_Merchandise = p_ID_Merchandise;
        
    ELSE
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'stok tidak mencukupi';
    END IF;
END$$

DELIMITER ;

DROP PROCEDURE IF EXISTS Proses_Transaksi;

-- Contoh penggunaan
INSERT INTO Transaksi (ID_Transaksi, Waktu_Pemesanan, Total_Merchandise, Total_Harga, ID_Pembeli, NRP, ID_Metode)
VALUES ('TRS000011', NOW(), 0, 0.00, 1, '5025251187', 1);
CALL Proses_Transaksi('TRS000011', 2, 3); 

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

-- Indexing pada waktu pemesanan untuk mempercepat query berdasarkan waktu
CREATE INDEX idx_waktu_pemesanan ON Transaksi(Waktu_Pemesanan);

-- Indexing pada nama pembeli untuk mempercepat pencarian berdasarkan nama
CREATE INDEX idx_nama_pembeli ON Pembeli(Nama_Lengkap);
CREATE INDEX idx_fk_pembeli ON Transaksi(ID_Pembeli);