<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('staff_finance', function (Blueprint $table) {
            $table->string('nrp', 10)->primary();
            $table->string('nama_lengkap', 50);
            $table->char('jenis_kelamin', 1);
            $table->string('nomor_telepon', 15);
            $table->string('password')->default('$2y$12$BJTBhakHgrB/pXJ0Z6enWOkXGkKAlXOeR7NsQ0OY.OCIPw.O1d83u'); // Default: password123
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('staff_finance');
    }
};
