<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pembeli extends Model
{
    protected $table = 'pembeli';
    protected $primaryKey = 'id_pembeli';
    protected $guarded = [];

    public function pesertaSeminar()
    {
        return $this->hasOne(PesertaSeminar::class, 'id_pembeli', 'id_pembeli');
    }

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'id_pembeli', 'id_pembeli');
    }
}
