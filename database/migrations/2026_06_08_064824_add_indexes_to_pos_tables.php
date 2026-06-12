<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('transaksi', function (Blueprint $table) {
            $table->index('waktu_pemesanan', 'idx_waktu_pemesanan');
            $table->index('id_pembeli', 'idx_fk_pembeli');
        });

        Schema::table('pembeli', function (Blueprint $table) {
            $table->index('nama_lengkap', 'idx_nama_pembeli');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaksi', function (Blueprint $table) {
            $table->dropIndex('idx_waktu_pemesanan');
            $table->dropIndex('idx_fk_pembeli');
        });

        Schema::table('pembeli', function (Blueprint $table) {
            $table->dropIndex('idx_nama_pembeli');
        });
    }
};
