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
            $table->string('password'); // Added for login
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('staff_finance');
    }
};
