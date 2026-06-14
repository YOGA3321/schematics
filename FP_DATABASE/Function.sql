USE FP1;

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