USE FP1;

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

-- DROP PROCEDURE IF EXISTS Proses_Transaksi;

-- Contoh penggunaan
INSERT INTO Transaksi (ID_Transaksi, Waktu_Pemesanan, Total_Merchandise, Total_Harga, ID_Pembeli, NRP, ID_Metode)
VALUES ('TRS000011', NOW(), 0, 0.00, 1, '5025251187', 1);
CALL Proses_Transaksi('TRS000011', 2, 3); 