<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $sqlPath = base_path('FP (1).sql');
        if (!file_exists($sqlPath)) {
            $this->command->error("File FP (1).sql tidak ditemukan.");
            return;
        }

        $sql = file_get_contents($sqlPath);

        // Remove comments
        $sql = preg_replace('/--.*/', '', $sql);
        $sql = preg_replace('/\/\*.*?\*\//s', '', $sql);

        // Match all INSERT INTO queries.
        // We only parse the insert statements from the first part of the SQL file,
        // before any stored procedures, triggers, or functions are defined.
        $parts = preg_split('/CREATE\s+(PROCEDURE|TRIGGER|FUNCTION)/i', $sql, 2);
        $insertSqlBlock = $parts[0];

        preg_match_all('/INSERT\s+INTO\s+[^;]+;/i', $insertSqlBlock, $matches);

        $tableMap = [
            'Pembeli' => 'pembeli',
            'Peserta_Seminar' => 'peserta_seminar',
            'Staff_Finance' => 'staff_finance',
            'Staff_Alamat' => 'staff_alamat',
            'Metode_Pembayaran' => 'metode_pembayaran',
            'Event' => 'event',
            'Merchandise' => 'merchandise',
            'Transaksi' => 'transaksi',
            'Detail_Transaksi' => 'detail_transaksi',
        ];

        $insertedCount = 0;
        foreach ($matches[0] as $query) {
            $query = trim($query);
            if (empty($query)) {
                continue;
            }

            // Replace table names with lowercase equivalents for case-sensitive databases
            foreach ($tableMap as $oldTable => $newTable) {
                $query = preg_replace('/\b' . preg_quote($oldTable, '/') . '\b/', $newTable, $query);
            }

            try {
                DB::unprepared($query);
                $insertedCount++;
            } catch (\Exception $e) {
                $this->command->error("Gagal menjalankan query: " . substr($query, 0, 100) . "... Error: " . $e->getMessage());
            }
        }

        $this->command->info("Berhasil mengimpor {$insertedCount} kelompok data INSERT INTO dari FP (1).sql.");
    }
}
