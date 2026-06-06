<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class StaffFinance extends Authenticatable
{
    use Notifiable;

    protected $table = 'staff_finance';
    protected $primaryKey = 'nrp';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];

    protected $hidden = [
        'password',
    ];

    public function alamat()
    {
        return $this->hasMany(StaffAlamat::class, 'finance_nrp', 'nrp');
    }

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'nrp', 'nrp');
    }
}
