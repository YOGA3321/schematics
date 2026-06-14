<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $sqlPath = base_path('FP_DATABASE/DML.sql');
        if (!file_exists($sqlPath)) {
            $this->command->error("File FP_DATABASE/DML.sql tidak ditemukan.");
            return;
        }

        $sql = file_get_contents($sqlPath);

        // Remove USE FP1; to make it db agnostic
        $sql = preg_replace('/USE\s+[a-zA-Z0-9_]+;/i', '', $sql);

        try {
            DB::unprepared($sql);
            $this->command->info("Berhasil mengimpor data dari FP_DATABASE/DML.sql.");
        } catch (\Exception $e) {
            $this->command->error("Gagal menjalankan query: " . $e->getMessage());
        }
    }
}
