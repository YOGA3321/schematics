CREATE DATABASE IF NOT EXISTS FP1;
USE FP1;

-- DROP DATABASE IF EXISTS FP1;

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
('Reynald Christian'),
('William Saputra'),
('William Wijaya'),
('William Tanoto'),
('William Halim'),
('William Kusuma'),
('William Pratama'),
('William Gunawan'),
('William Susanto'),
('William Hartono'),
('William Wibowo'),
('William Setiawan'),
('William Salim'),
('William Tjandra'),
('William Lesmana'),
('William Putra'),
('William Wijaya II'),
('William Hidayat'),
('William Effendi'),
('William Santoso'),
('William Wijaksono'),
('William Hermawan'),
('William Surya'),
('William Pranata'),
('William Yulianto'),
('William Wirawan'),
('William Sutanto'),
('William Adinata'),
('William Wibisono'),
('William Permana'),
('William Limanto'),
('William Tedjo'),
('William Marpaung'),
('William Siregar'),
('William Nainggolan'),
('William Sihombing'),
('William Hutapea'),
('William Tampubolon'),
('William Manurung'),
('William Simanjuntak'),
('William Pasaribu'),
('William Hutagalung'),
('William Sitompul'),
('William Sianturi'),
('William Panjaitan'),
('William Lubis'),
('William Pulungan'),
('William Lumbantoruan'),
('William Hasibuan'),
('William Gultom'),
('William Tobing'),
('William Saragih'),
('William Damanik'),
('William Purba'),
('William Sembiring'),
('William Ginting'),
('William Tarigan'),
('William Karo'),
('William Surbakti'),
('William Bangun'),
('William Perangin'),
('William Wijaya Kusuma'),
('William Tanjung'),
('William Halim Saputra'),
('William Kusuma Putra'),
('William Pratama Ardianto'),
('William Gunawan Raharjo'),
('William Susanto Saputra'),
('William Hartono Lambok'),
('William Wibowo Setiawan'),
('William Setiawan Wijaya'),
('William Salim Lesmana'),
('William Tjandra Putra'),
('William Lesmana Gunawan'),
('William Putra Wijaya'),
('William Hidayat Kurniawan'),
('William Effendi Adiputra'),
('William Santoso Ekaputra'),
('William Wijaksono Hutapea'),
('William Hermawan Sihombing'),
('William Surya Nainggolan'),
('William Pranata Hasugian'),
('William Yulianto Sembiring'),
('William Wirawan Ginting'),
('William Sutanto Tarigan'),
('William Adinata Saragih'),
('William Wibisono Damanik'),
('William Permana Purba'),
('William Limanto Sembiring'),
('William Tedjo Rahardjo'),
('William Marpaung Saragih'),
('William Siregar Tobing'),
('William Nainggolan Junior'),
('William Sihombing Ias'),
('William Hutapea Effendi'),
('William Tampubolon Porsezian'),
('William Manurung Bangun'),
('William Simanjuntak Perangin'),
('William Pasaribu Wijaya'),
('William Hutagalung Damanik'),
('William Hans Chandra');

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
('BST0010', 'dimas.sp@gmail.com', '081455667788', 3),
('BST0011', 'w.lubis45@gmail.com', '081200000045', 45),
('BST0012', 'w.wijaya12@gmail.com', '081200000012', 12),
('BST0013', 'wirawan.ginting@gmail.com', '081200000088', 88),
('BST0014', 'yulianto.w@gmail.com', '081200000034', 34),
('BST0015', 'nainggolan.jr@gmail.com', '081200000102', 102),
('BST0016', 'w.tarigan55@gmail.com', '081200000055', 55),
('BST0017', 'w.setiawan.w@gmail.com', '081200000077', 77),
('BST0018', 'setiawan.will21@gmail.com', '081200000021', 21),
('BST0019', 'tedjo.rahardjo@gmail.com', '081200000099', 99),
('BST0020', 'will.kusuma15@gmail.com', '081200000015', 15),
('BST0021', 'w.kusuma.putra@gmail.com', '081200000066', 66),
('BST0022', 'permana.w29@gmail.com', '081200000029', 29),
('BST0023', 'w.putra.w@gmail.com', '081200000081', 81),
('BST0024', 'hutapea.effendi@gmail.com', '081200000105', 105),
('BST0025', 'w.marpaung42@gmail.com', '081200000042', 42),
('BST0026', 'tanjung.will63@gmail.com', '081200000063', 63),
('BST0027', 'w.susanto18@gmail.com', '081200000018', 18),
('BST0028', 'sutanto.tarigan@gmail.com', '081200000091', 91),
('BST0029', 'bangun.w58@gmail.com', '081200000058', 58),
('BST0030', 'tampubolon.w37@gmail.com', '081200000037', 37),
('BST0031', 'hutagalung.damanik@gmail.com', '081200000109', 109),
('BST0032', 'putra.william25@gmail.com', '081200000025', 25),
('BST0033', 'w.gunawan.r@gmail.com', '081200000071', 71),
('BST0034', 'hasibuan.will48@gmail.com', '081200000048', 48),
('BST0035', 'w.santoso.e@gmail.com', '081200000083', 83),
('BST0036', 'hans.chandra.w@gmail.com', '081200000110', 110),
('BST0037', 'halim.w14@gmail.com', '081200000014', 14),
('BST0038', 'wijaya.kusuma@gmail.com', '081200000060', 60),
('BST0039', 'tedjo.william@gmail.com', '081200000031', 31),
('BST0040', 'limanto.s@gmail.com', '081200000095', 95),
('BST0041', 'purba.w52@gmail.com', '081200000052', 52),
('BST0042', 'w.wibowo.s@gmail.com', '081200000075', 75),
('BST0043', 'hidayat.w27@gmail.com', '081200000027', 27),
('BST0044', 'hermawan.sihombing@gmail.com', '081200000085', 85),
('BST0045', 'hartono.w19@gmail.com', '081200000019', 19),
('BST0046', 'siregar.tobing@gmail.com', '081200000101', 101),
('BST0047', 'simanjuntak.w@gmail.com', '081200000039', 39),
('BST0048', 'susanto.saputra@gmail.com', '081200000068', 68),
('BST0049', 'damanik.w50@gmail.com', '081200000050', 50),
('BST0050', 'yulianto.sembiring@gmail.com', '081200000093', 93);

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
('TRS000003', '2026-05-01 08:15:00', 1, 15000.00, 11, '5025251187', 1),
('TRS000004', '2026-05-01 08:30:00', 2, 95000.00, 12, '505425034', 2),
('TRS000005', '2026-05-01 09:00:00', 3, 15000.00, 13, '505325012', 3),
('TRS000006', '2026-05-01 09:45:00', 2, 105000.00, 14, '5025251274', 1),
('TRS000007', '2026-05-01 10:10:00', 1, 15000.00, 15, '505425019', 2),
('TRS000008', '2026-05-01 11:05:00', 2, 95000.00, 16, '5025251056', 3),
('TRS000009', '2026-05-01 11:30:00', 3, 15000.00, 17, '505325037', 1),
('TRS000010', '2026-05-01 12:15:00', 2, 105000.00, 18, '5025251187', 2),
('TRS000011', '2026-05-01 13:00:00', 1, 15000.00, 19, '505425034', 3),
('TRS000012', '2026-05-01 13:45:00', 2, 95000.00, 20, '505325012', 1),
('TRS000013', '2026-05-01 14:20:00', 3, 15000.00, 21, '5025251274', 2),
('TRS000014', '2026-05-01 15:10:00', 2, 105000.00, 22, '505425019', 3),
('TRS000015', '2026-05-01 15:55:00', 1, 15000.00, 23, '5025251056', 1),
('TRS000016', '2026-05-01 16:30:00', 2, 95000.00, 24, '505325037', 2),
('TRS000017', '2026-05-01 17:05:00', 3, 15000.00, 25, '5025251187', 3),
('TRS000018', '2026-05-01 18:00:00', 2, 105000.00, 26, '505425034', 1),
('TRS000019', '2026-05-01 18:40:00', 1, 15000.00, 27, '505325012', 2),
('TRS000020', '2026-05-01 19:20:00', 2, 95000.00, 28, '5025251274', 3),
('TRS000021', '2026-05-01 20:00:00', 3, 15000.00, 29, '505425019', 1),
('TRS000022', '2026-05-01 20:45:00', 2, 105000.00, 30, '5025251056', 2),

('TRS000023', '2026-05-02 11:05:00', 3, 135000.00, 3, '505325012', 3),
('TRS000024', '2026-05-02 13:40:00', 2, 70000.00, 4, '5025251274', 1),
('TRS000025', '2026-05-02 09:00:00', 1, 15000.00, 31, '505325037', 3),
('TRS000026', '2026-05-02 09:30:00', 2, 95000.00, 32, '5025251187', 1),
('TRS000027', '2026-05-02 10:15:00', 3, 15000.00, 33, '505425034', 2),
('TRS000028', '2026-05-02 11:00:00', 2, 105000.00, 34, '505325012', 3),
('TRS000029', '2026-05-02 12:00:00', 1, 15000.00, 35, '5025251274', 1),
('TRS000030', '2026-05-02 12:45:00', 2, 95000.00, 36, '505425019', 2),
('TRS000031', '2026-05-02 13:30:00', 3, 15000.00, 37, '5025251056', 3),
('TRS000032', '2026-05-02 14:15:00', 2, 105000.00, 38, '505325037', 1),
('TRS000033', '2026-05-02 15:00:00', 1, 15000.00, 39, '5025251187', 2),
('TRS000034', '2026-05-02 15:45:00', 2, 95000.00, 40, '505425034', 3),
('TRS000035', '2026-05-02 16:30:00', 3, 15000.00, 41, '505325012', 1),
('TRS000036', '2026-05-02 17:10:00', 2, 105000.00, 42, '5025251274', 2),
('TRS000037', '2026-05-02 18:00:00', 1, 15000.00, 43, '505425019', 3),
('TRS000038', '2026-05-02 18:50:00', 2, 95000.00, 44, '5025251056', 1),
('TRS000039', '2026-05-02 19:30:00', 3, 15000.00, 45, '505325037', 2),
('TRS000040', '2026-05-02 20:10:00', 2, 105000.00, 46, '5025251187', 3),
('TRS000041', '2026-05-02 20:45:00', 1, 15000.00, 47, '505425034', 1),
('TRS000042', '2026-05-02 21:05:00', 2, 95000.00, 48, '505325012', 2),
('TRS000043', '2026-05-02 21:25:00', 3, 15000.00, 49, '5025251274', 3),
('TRS000044', '2026-05-02 21:45:00', 2, 105000.00, 50, '505425019', 1),

('TRS000045', '2026-05-03 14:10:00', 4, 200000.00, 5, '505425019', 2),
('TRS000046', '2026-05-03 15:30:00', 5, 50000.00, 6, '5025251056', 3),
('TRS000047', '2026-05-03 08:20:00', 1, 15000.00, 51, '5025251056', 2),
('TRS000048', '2026-05-03 09:10:00', 2, 95000.00, 52, '505325037', 3),
('TRS000049', '2026-05-03 09:50:00', 3, 15000.00, 53, '5025251187', 1),
('TRS000050', '2026-05-03 10:40:00', 2, 105000.00, 54, '505425034', 2),
('TRS000051', '2026-05-03 11:20:00', 1, 15000.00, 55, '505325012', 3),
('TRS000052', '2026-05-03 12:15:00', 2, 95000.00, 56, '5025251274', 1),
('TRS000053', '2026-05-03 13:00:00', 3, 15000.00, 57, '505425019', 2),
('TRS000054', '2026-05-03 13:45:00', 2, 105000.00, 58, '5025251056', 3),
('TRS000055', '2026-05-03 14:30:00', 1, 15000.00, 59, '505325037', 1),
('TRS000056', '2026-05-03 15:10:00', 2, 95000.00, 60, '5025251187', 2),
('TRS000057', '2026-05-03 16:00:00', 3, 15000.00, 61, '505425034', 3),
('TRS000058', '2026-05-03 16:50:00', 2, 105000.00, 62, '505325012', 1),
('TRS000059', '2026-05-03 17:35:00', 1, 15000.00, 63, '5025251274', 2),
('TRS000060', '2026-05-03 18:20:00', 2, 95000.00, 64, '505425019', 3),
('TRS000061', '2026-05-03 19:10:00', 3, 15000.00, 65, '5025251056', 1),
('TRS000062', '2026-05-03 19:50:00', 2, 105000.00, 66, '505325037', 2),
('TRS000063', '2026-05-03 20:30:00', 1, 15000.00, 67, '5025251187', 3),
('TRS000064', '2026-05-03 21:00:00', 2, 95000.00, 68, '505425034', 1),
('TRS000065', '2026-05-03 21:30:00', 3, 15000.00, 69, '505325012', 2),
('TRS000066', '2026-05-03 21:50:00', 2, 105000.00, 70, '5025251274', 3),

('TRS000067', '2026-05-04 16:45:00', 2, 95000.00, 7, '505325037', 1),
('TRS000068', '2026-05-04 18:00:00', 1, 15000.00, 8, '5025251187', 2),
('TRS000069', '2026-05-04 08:30:00', 1, 15000.00, 71, '505425019', 1),
('TRS000070', '2026-05-04 09:20:00', 2, 95000.00, 72, '5025251056', 2),
('TRS000071', '2026-05-04 10:15:00', 3, 15000.00, 73, '505325037', 3),
('TRS000072', '2026-05-04 11:00:00', 2, 105000.00, 74, '5025251187', 1),
('TRS000073', '2026-05-04 12:00:00', 1, 15000.00, 75, '505425034', 2),
('TRS000074', '2026-05-04 12:45:00', 2, 95000.00, 76, '505325012', 3),
('TRS000075', '2026-05-04 13:30:00', 3, 15000.00, 77, '5025251274', 1),
('TRS000076', '2026-05-04 14:20:00', 2, 105000.00, 78, '505425019', 2),
('TRS000077', '2026-05-04 15:10:00', 1, 15000.00, 79, '5025251056', 3),
('TRS000078', '2026-05-04 15:55:00', 2, 95000.00, 80, '505325037', 1),
('TRS000079', '2026-05-04 16:40:00', 3, 15000.00, 81, '5025251187', 2),
('TRS000080', '2026-05-04 17:30:00', 2, 105000.00, 82, '505425034', 3),
('TRS000081', '2026-05-04 18:15:00', 1, 15000.00, 83, '505325012', 1),
('TRS000082', '2026-05-04 19:00:00', 2, 95000.00, 84, '5025251274', 2),
('TRS000083', '2026-05-04 19:45:00', 3, 15000.00, 85, '505425019', 3),
('TRS000084', '2026-05-04 20:20:00', 2, 105000.00, 86, '5025251056', 1),
('TRS000085', '2026-05-04 20:55:00', 1, 15000.00, 87, '505325037', 2),
('TRS000086', '2026-05-04 21:15:00', 2, 95000.00, 88, '5025251187', 3),
('TRS000087', '2026-05-04 21:35:00', 3, 15000.00, 89, '505425034', 1),
('TRS000088', '2026-05-04 21:55:00', 2, 105000.00, 90, '505325012', 2),

('TRS000089', '2026-05-05 19:20:00', 3, 180000.00, 9, '505425034', 1),
('TRS000090', '2026-05-05 20:10:00', 2, 90000.00, 10, '505325012', 3),
('TRS000091', '2026-05-05 08:45:00', 1, 15000.00, 91, '5025251274', 3),
('TRS000092', '2026-05-05 09:30:00', 2, 95000.00, 92, '505425019', 1),
('TRS000093', '2026-05-05 10:15:00', 3, 15000.00, 93, '5025251056', 2),
('TRS000094', '2026-05-05 11:05:00', 2, 105000.00, 94, '505325037', 3),
('TRS000095', '2026-05-05 12:00:00', 1, 15000.00, 95, '5025251187', 1),
('TRS000096', '2026-05-05 12:50:00', 2, 95000.00, 96, '505425034', 2),
('TRS000097', '2026-05-05 13:40:00', 3, 15000.00, 97, '505325012', 3),
('TRS000098', '2026-05-05 14:30:00', 2, 105000.00, 98, '5025251274', 1),
('TRS000099', '2026-05-05 15:15:00', 1, 15000.00, 99, '505425019', 2),
('TRS000100', '2026-05-05 16:05:00', 2, 95000.00, 100, '5025251056', 3),
('TRS000101', '2026-05-05 16:55:00', 3, 15000.00, 101, '505325037', 1),
('TRS000102', '2026-05-05 17:45:00', 2, 105000.00, 102, '5025251187', 2),
('TRS000103', '2026-05-05 18:30:00', 1, 15000.00, 103, '505425034', 3),
('TRS000104', '2026-05-05 19:15:00', 2, 95000.00, 104, '505325012', 1),
('TRS000105', '2026-05-05 20:00:00', 3, 15000.00, 105, '5025251274', 2),
('TRS000106', '2026-05-05 20:30:00', 2, 105000.00, 106, '505425019', 3),
('TRS000107', '2026-05-05 21:00:00', 1, 15000.00, 107, '5025251056', 1),
('TRS000108', '2026-05-05 21:20:00', 2, 95000.00, 108, '505325037', 2),
('TRS000109', '2026-05-05 21:40:00', 3, 15000.00, 109, '5025251187', 3),
('TRS000110', '2026-05-05 21:55:00', 2, 105000.00, 110, '505425034', 1);


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

(1, 90000.00, 90000.00, 'TRS000010', 8),

(1, 15000.00, 15000.00, 'TRS000011', 1),

(1, 85000.00, 85000.00, 'TRS000012', 2),
(1, 10000.00, 10000.00, 'TRS000012', 6),

(3, 5000.00, 15000.00, 'TRS000013', 7),

(1, 12000.00, 12000.00, 'TRS000014', 5),
(1, 45000.00, 45000.00, 'TRS000014', 4),

(1, 15000.00, 15000.00, 'TRS000015', 1),
(1, 85000.00, 85000.00, 'TRS000016', 2),
(1, 10000.00, 10000.00, 'TRS000016', 6),
(3, 5000.00, 15000.00, 'TRS000017', 7),
(1, 60000.00, 60000.00, 'TRS000018', 3),
(1, 45000.00, 45000.00, 'TRS000018', 4),
(1, 15000.00, 15000.00, 'TRS000019', 1),
(1, 85000.00, 85000.00, 'TRS000020', 2),
(1, 10000.00, 10000.00, 'TRS000020', 6),
(3, 5000.00, 15000.00, 'TRS000021', 7),
(1, 60000.00, 60000.00, 'TRS000022', 3),
(1, 45000.00, 45000.00, 'TRS000022', 4),
(1, 15000.00, 15000.00, 'TRS000023', 1),
(1, 85000.00, 85000.00, 'TRS000024', 2),
(1, 10000.00, 10000.00, 'TRS000024', 6),
(3, 5000.00, 15000.00, 'TRS000025', 7),
(1, 60000.00, 60000.00, 'TRS000026', 3),
(1, 45000.00, 45000.00, 'TRS000026', 4),
(1, 15000.00, 15000.00, 'TRS000027', 1),
(1, 85000.00, 85000.00, 'TRS000028', 2),
(1, 10000.00, 10000.00, 'TRS000028', 6),
(3, 5000.00, 15000.00, 'TRS000029', 7),
(1, 12000.00, 12000.00, 'TRS000030', 5),
(1, 45000.00, 45000.00, 'TRS000030', 4),
(1, 15000.00, 15000.00, 'TRS000031', 1),
(1, 85000.00, 85000.00, 'TRS000032', 2),
(1, 10000.00, 10000.00, 'TRS000032', 6),
(3, 5000.00, 15000.00, 'TRS000033', 7),
(1, 60000.00, 60000.00, 'TRS000034', 3),
(1, 45000.00, 45000.00, 'TRS000034', 4),
(1, 15000.00, 15000.00, 'TRS000035', 1),
(1, 85000.00, 85000.00, 'TRS000036', 2),
(1, 10000.00, 10000.00, 'TRS000036', 6),
(3, 5000.00, 15000.00, 'TRS000037', 7),
(1, 12000.00, 12000.00, 'TRS000038', 5),
(1, 45000.00, 45000.00, 'TRS000038', 4),
(1, 15000.00, 15000.00, 'TRS000039', 1),
(1, 85000.00, 85000.00, 'TRS000040', 2),
(1, 10000.00, 10000.00, 'TRS000040', 6),
(3, 5000.00, 15000.00, 'TRS000041', 7),
(1, 12000.00, 12000.00, 'TRS000042', 5),
(1, 45000.00, 45000.00, 'TRS000042', 4),
(1, 15000.00, 15000.00, 'TRS000043', 1),
(1, 85000.00, 85000.00, 'TRS000044', 2),
(1, 10000.00, 10000.00, 'TRS000044', 6),
(3, 5000.00, 15000.00, 'TRS000045', 7),
(1, 12000.00, 12000.00, 'TRS000046', 5),
(1, 45000.00, 45000.00, 'TRS000046', 4),
(1, 15000.00, 15000.00, 'TRS000047', 1),
(1, 85000.00, 85000.00, 'TRS000048', 2),
(1, 10000.00, 10000.00, 'TRS000048', 6),
(3, 5000.00, 15000.00, 'TRS000049', 7),
(1, 60000.00, 60000.00, 'TRS000050', 3),
(1, 45000.00, 45000.00, 'TRS000050', 4),
(1, 15000.00, 15000.00, 'TRS000051', 1),
(1, 85000.00, 85000.00, 'TRS000052', 2),
(1, 10000.00, 10000.00, 'TRS000052', 6),
(3, 5000.00, 15000.00, 'TRS000053', 7),
(1, 60000.00, 60000.00, 'TRS000054', 3),
(1, 45000.00, 45000.00, 'TRS000054', 4),
(1, 15000.00, 15000.00, 'TRS000055', 1),
(1, 85000.00, 85000.00, 'TRS000056', 2),
(1, 10000.00, 10000.00, 'TRS000056', 6),
(3, 5000.00, 15000.00, 'TRS000057', 7),
(1, 60000.00, 60000.00, 'TRS000058', 3),
(1, 45000.00, 45000.00, 'TRS000058', 4),
(1, 15000.00, 15000.00, 'TRS000059', 1),
(1, 85000.00, 85000.00, 'TRS000060', 2),
(1, 10000.00, 10000.00, 'TRS000060', 6),
(3, 5000.00, 15000.00, 'TRS000061', 7),
(1, 60000.00, 60000.00, 'TRS000062', 3),
(1, 45000.00, 45000.00, 'TRS000062', 4),
(1, 15000.00, 15000.00, 'TRS000063', 1),
(1, 85000.00, 85000.00, 'TRS000064', 2),
(1, 10000.00, 10000.00, 'TRS000064', 6),
(3, 5000.00, 15000.00, 'TRS000065', 7),
(1, 60000.00, 60000.00, 'TRS000066', 3),
(1, 45000.00, 45000.00, 'TRS000066', 4),
(1, 15000.00, 15000.00, 'TRS000067', 1),
(1, 85000.00, 85000.00, 'TRS000068', 2),
(1, 10000.00, 10000.00, 'TRS000068', 6),
(3, 5000.00, 15000.00, 'TRS000069', 7),
(1, 60000.00, 60000.00, 'TRS000070', 3),
(1, 45000.00, 45000.00, 'TRS000070', 4),
(1, 15000.00, 15000.00, 'TRS000071', 1),
(1, 85000.00, 85000.00, 'TRS000072', 2),
(1, 10000.00, 10000.00, 'TRS000072', 6),
(3, 5000.00, 15000.00, 'TRS000073', 7),
(1, 60000.00, 60000.00, 'TRS000074', 3),
(1, 45000.00, 45000.00, 'TRS000074', 4),
(1, 15000.00, 15000.00, 'TRS000075', 1),
(1, 85000.00, 85000.00, 'TRS000076', 2),
(1, 10000.00, 10000.00, 'TRS000076', 6),
(3, 5000.00, 15000.00, 'TRS000077', 7),
(1, 60000.00, 60000.00, 'TRS000078', 3),
(1, 45000.00, 45000.00, 'TRS000078', 4),
(1, 15000.00, 15000.00, 'TRS000079', 1),
(1, 85000.00, 85000.00, 'TRS000080', 2),
(1, 10000.00, 10000.00, 'TRS000080', 6),
(3, 5000.00, 15000.00, 'TRS000081', 7),
(1, 60000.00, 60000.00, 'TRS000082', 3),
(1, 45000.00, 45000.00, 'TRS000082', 4),
(1, 15000.00, 15000.00, 'TRS000083', 1),
(1, 85000.00, 85000.00, 'TRS000084', 2),
(1, 10000.00, 10000.00, 'TRS000084', 6),
(3, 5000.00, 15000.00, 'TRS000085', 7),
(1, 60000.00, 60000.00, 'TRS000086', 3),
(1, 45000.00, 45000.00, 'TRS000086', 4),
(1, 15000.00, 15000.00, 'TRS000087', 1),
(1, 85000.00, 85000.00, 'TRS000088', 2),
(1, 10000.00, 10000.00, 'TRS000088', 6),
(3, 5000.00, 15000.00, 'TRS000089', 7),
(1, 60000.00, 60000.00, 'TRS000090', 3),
(1, 45000.00, 45000.00, 'TRS000090', 4),
(1, 15000.00, 15000.00, 'TRS000091', 1),
(1, 85000.00, 85000.00, 'TRS000092', 2),
(1, 10000.00, 10000.00, 'TRS000092', 6),
(3, 5000.00, 15000.00, 'TRS000093', 7),
(1, 60000.00, 60000.00, 'TRS000094', 3),
(1, 45000.00, 45000.00, 'TRS000094', 4),
(1, 15000.00, 15000.00, 'TRS000095', 1),
(1, 85000.00, 85000.00, 'TRS000096', 2),
(1, 10000.00, 10000.00, 'TRS000096', 6),
(3, 5000.00, 15000.00, 'TRS000097', 7),
(1, 60000.00, 60000.00, 'TRS000098', 3),
(1, 45000.00, 45000.00, 'TRS000098', 4),
(1, 15000.00, 15000.00, 'TRS000099', 1),
(1, 85000.00, 85000.00, 'TRS000100', 2),
(1, 10000.00, 10000.00, 'TRS000100', 6),
(3, 5000.00, 15000.00, 'TRS000101', 7),
(1, 60000.00, 60000.00, 'TRS000102', 3),
(1, 45000.00, 45000.00, 'TRS000102', 4),
(1, 15000.00, 15000.00, 'TRS000103', 1),
(1, 85000.00, 85000.00, 'TRS000104', 2),
(1, 10000.00, 10000.00, 'TRS000104', 6),
(3, 5000.00, 15000.00, 'TRS000105', 7),
(1, 60000.00, 60000.00, 'TRS000106', 3),
(1, 45000.00, 45000.00, 'TRS000106', 4),
(1, 15000.00, 15000.00, 'TRS000107', 1),
(1, 85000.00, 85000.00, 'TRS000108', 2),
(1, 10000.00, 10000.00, 'TRS000108', 6),
(3, 5000.00, 15000.00, 'TRS000109', 7),
(1, 60000.00, 60000.00, 'TRS000110', 3),
(1, 45000.00, 45000.00, 'TRS000110', 4);

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

-- Indexing pada waktu pemesanan untuk mempercepat query berdasarkan waktu
CREATE INDEX idx_waktu_pemesanan ON Transaksi(Waktu_Pemesanan);

-- Indexing pada nama pembeli untuk mempercepat pencarian berdasarkan nama
CREATE INDEX idx_nama_pembeli ON Pembeli(Nama_Lengkap);
CREATE INDEX idx_fk_pembeli ON Transaksi(ID_Pembeli);

-- Function hitung pendapatan per event
DELIMITER $$

CREATE FUNCTION fn_pendapatan_event(
    p_ID_Event INT
)
RETURNS DECIMAL(12,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE v_Total DECIMAL(12,2);

    SELECT IFNULL(SUM(dt.Total),0)
    INTO v_Total
    FROM Detail_Transaksi dt
    JOIN Merchandise m
        ON dt.ID_Merchandise = m.ID_Merchandise
    WHERE m.ID_Event = p_ID_Event;

    RETURN v_Total;
END$$

DELIMITER ;

-- Contoh penggunaan
SELECT
    Nama_Subevent,
    fn_pendapatan_event(ID_Event) AS Pendapatan
FROM Event;

-- Case Query
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