<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('staff_alamat', function (Blueprint $table) {
            $table->id('id_alamat');
            $table->text('alamat');
            $table->string('finance_nrp', 10);
            $table->timestamps();

            $table->foreign('finance_nrp')->references('nrp')->on('staff_finance')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('staff_alamat');
    }
};
