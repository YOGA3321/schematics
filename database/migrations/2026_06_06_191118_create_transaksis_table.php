<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transaksi', function (Blueprint $table) {
            $table->string('id_transaksi', 9)->primary();
            $table->dateTime('waktu_pemesanan');
            $table->integer('total_merchandise');
            $table->decimal('total_harga', 10, 2);
            $table->unsignedBigInteger('id_pembeli');
            $table->string('nrp', 10);
            $table->unsignedBigInteger('id_metode');
            $table->timestamps();

            $table->foreign('id_pembeli')->references('id_pembeli')->on('pembeli')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('nrp')->references('nrp')->on('staff_finance')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_metode')->references('id_metode')->on('metode_pembayaran')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transaksi');
    }
};
