<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffAlamat extends Model
{
    protected $table = 'staff_alamat';
    protected $primaryKey = 'id_alamat';
    protected $guarded = [];

    public function staffFinance()
    {
        return $this->belongsTo(StaffFinance::class, 'finance_nrp', 'nrp');
    }
}
