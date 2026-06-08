<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('merchandise', function (Blueprint $table) {
            $table->id('id_merchandise');
            $table->string('tipe_merchandise', 20);
            $table->decimal('harga_merchandise', 10, 2);
            $table->integer('stok');
            $table->unsignedBigInteger('id_event');
            $table->string('foto')->nullable();
            $table->timestamps();

            $table->foreign('id_event')->references('id_event')->on('event')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('merchandise');
    }
};
