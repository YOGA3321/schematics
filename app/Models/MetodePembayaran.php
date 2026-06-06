<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetodePembayaran extends Model
{
    protected $table = 'metode_pembayaran';
    protected $primaryKey = 'id_metode';
    protected $guarded = [];

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'id_metode', 'id_metode');
    }
}
