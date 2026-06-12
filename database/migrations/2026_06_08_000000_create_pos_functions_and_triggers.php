<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Drop existing procedures, functions and triggers just in case migrate:fresh didn't clear them
        DB::unprepared("DROP PROCEDURE IF EXISTS Proses_Transaksi");
        DB::unprepared("DROP PROCEDURE IF EXISTS Cek_Stok");
        DB::unprepared("DROP FUNCTION IF EXISTS fn_pendapatan_event");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_generate_id_peserta");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_generate_id_transaksi");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_update_total_transaksi");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_kurangi_stok");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_hitung_detail");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_cek_stok");

        // Procedures
        DB::unprepared("
            CREATE PROCEDURE Cek_Stok(
                IN p_ID_Merchandise INT,
                IN p_Jumlah_Barang INT,
                OUT p_Stok_Cukup BOOLEAN
            )
            BEGIN
                DECLARE v_Stok INT;
                
                SELECT stok INTO v_Stok FROM merchandise WHERE id_merchandise = p_ID_Merchandise;
                
                IF v_Stok >= p_Jumlah_Barang THEN
                    SET p_Stok_Cukup = TRUE;
                ELSE
                    SET p_Stok_Cukup = FALSE;
                END IF;
            END;
        ");

        DB::unprepared("
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
                    SELECT harga_merchandise INTO v_Harga 
                    FROM merchandise 
                    WHERE id_merchandise = p_ID_Merchandise;
                    
                    SET v_Total = v_Harga * p_Jumlah_Barang;
                    
                    INSERT INTO detail_transaksi (jumlah_barang, harga_satuan, total, id_transaksi, id_merchandise)
                    VALUES (p_Jumlah_Barang, v_Harga, v_Total, p_ID_Transaksi, p_ID_Merchandise);
                    
                    UPDATE merchandise 
                    SET stok = stok - p_Jumlah_Barang 
                    WHERE id_merchandise = p_ID_Merchandise;
                    
                ELSE
                    SIGNAL SQLSTATE '45000' 
                    SET MESSAGE_TEXT = 'stok tidak mencukupi';
                END IF;
            END;
        ");

        // Functions
        DB::unprepared("
            CREATE FUNCTION fn_pendapatan_event(
                p_ID_Event INT
            )
            RETURNS DECIMAL(12,2)
            READS SQL DATA
            DETERMINISTIC
            BEGIN
                DECLARE v_Total DECIMAL(12,2);
                
                SELECT IFNULL(SUM(dt.total), 0) INTO v_Total
                FROM detail_transaksi dt
                JOIN merchandise m ON dt.id_merchandise = m.id_merchandise
                WHERE m.id_event = p_ID_Event;
                
                RETURN v_Total;
            END;
        ");

        // Triggers
        DB::unprepared("
            CREATE TRIGGER trg_cek_stok BEFORE INSERT ON detail_transaksi
            FOR EACH ROW
            BEGIN
                DECLARE stok_sekarang INT;
                SELECT stok INTO stok_sekarang FROM merchandise WHERE id_merchandise = NEW.id_merchandise;

                IF stok_sekarang < NEW.jumlah_barang THEN
                    SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'stok tidak mencukupi';
                END IF;
            END;
        ");

        DB::unprepared("
            CREATE TRIGGER trg_hitung_detail BEFORE INSERT ON detail_transaksi
            FOR EACH ROW
            BEGIN
                SET NEW.harga_satuan = (SELECT harga_merchandise FROM merchandise WHERE id_merchandise = NEW.id_merchandise);
                SET NEW.total = NEW.harga_satuan * NEW.jumlah_barang;
            END;
        ");

        DB::unprepared("
            CREATE TRIGGER trg_kurangi_stok AFTER INSERT ON detail_transaksi
            FOR EACH ROW
            BEGIN
                UPDATE merchandise SET
                stok = stok - NEW.jumlah_barang WHERE id_merchandise = NEW.id_merchandise;
            END;
        ");

        DB::unprepared("
            CREATE TRIGGER trg_update_total_transaksi AFTER INSERT ON detail_transaksi
            FOR EACH ROW
            BEGIN
                UPDATE transaksi SET
                total_merchandise = (SELECT SUM(jumlah_barang) FROM detail_transaksi WHERE id_transaksi = NEW.id_transaksi),
                total_harga = (SELECT SUM(total) FROM detail_transaksi WHERE id_transaksi = NEW.id_transaksi)
                WHERE id_transaksi = NEW.id_transaksi;
            END;
        ");

        DB::unprepared("
            CREATE TRIGGER trg_generate_id_transaksi 
            BEFORE INSERT ON transaksi
            FOR EACH ROW
            BEGIN
                DECLARE max_id INT;
                DECLARE new_id CHAR(9);
                
                SELECT IFNULL(MAX(CAST(SUBSTRING(id_transaksi, 4) AS UNSIGNED)), 0) INTO max_id 
                FROM transaksi;
                
                SET new_id = CONCAT('TRS', LPAD(max_id + 1, 6, '0')); 
                SET NEW.id_transaksi = new_id;
            END;
        ");

        DB::unprepared("
            CREATE TRIGGER trg_generate_id_peserta 
            BEFORE INSERT ON peserta_seminar
            FOR EACH ROW
            BEGIN
                DECLARE max_id INT;
                DECLARE new_id CHAR(7);
                
                SELECT IFNULL(MAX(CAST(SUBSTRING(id_peserta, 4) AS UNSIGNED)), 0) INTO max_id 
                FROM peserta_seminar;
                
                SET new_id = CONCAT('BST', LPAD(max_id + 1, 4, '0'));
                SET NEW.id_peserta = new_id;
            END;
        ");
    }

    public function down(): void
    {
        DB::unprepared("DROP TRIGGER IF EXISTS trg_generate_id_peserta");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_generate_id_transaksi");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_update_total_transaksi");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_kurangi_stok");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_hitung_detail");
        DB::unprepared("DROP TRIGGER IF EXISTS trg_cek_stok");
        
        DB::unprepared("DROP PROCEDURE IF EXISTS Proses_Transaksi");
        DB::unprepared("DROP PROCEDURE IF EXISTS Cek_Stok");
        DB::unprepared("DROP FUNCTION IF EXISTS fn_pendapatan_event");
    }
};
