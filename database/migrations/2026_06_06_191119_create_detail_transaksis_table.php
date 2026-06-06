<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('detail_transaksi', function (Blueprint $table) {
            $table->id('id_detail');
            $table->integer('jumlah_barang');
            $table->decimal('harga_satuan', 10, 2);
            $table->decimal('total', 10, 2);
            $table->string('id_transaksi', 9);
            $table->unsignedBigInteger('id_merchandise');
            $table->timestamps();

            $table->foreign('id_transaksi')->references('id_transaksi')->on('transaksi')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_merchandise')->references('id_merchandise')->on('merchandise')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('detail_transaksi');
    }
};
