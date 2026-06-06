<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('peserta_seminar', function (Blueprint $table) {
            $table->string('id_peserta', 7)->primary();
            $table->string('email', 50);
            $table->string('nomor_telepon', 15);
            $table->unsignedBigInteger('id_pembeli')->unique();
            $table->timestamps();

            $table->foreign('id_pembeli')->references('id_pembeli')->on('pembeli')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('peserta_seminar');
    }
};
