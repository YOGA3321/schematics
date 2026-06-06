<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PesertaSeminar extends Model
{
    protected $table = 'peserta_seminar';
    protected $primaryKey = 'id_peserta';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];

    public function pembeli()
    {
        return $this->belongsTo(Pembeli::class, 'id_pembeli', 'id_pembeli');
    }
}
