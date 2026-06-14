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