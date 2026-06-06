<?php

namespace App\Observers;

use App\Models\Transaksi;
use Illuminate\Support\Facades\DB;

class TransaksiObserver
{
    public function creating(Transaksi $transaksi): void
    {
        if (empty($transaksi->id_transaksi)) {
            // Find max id_transaksi
            $maxId = Transaksi::max(DB::raw('CAST(SUBSTRING(id_transaksi, 4) AS UNSIGNED)'));
            $nextId = $maxId ? $maxId + 1 : 1;
            
            $transaksi->id_transaksi = 'TRS' . str_pad($nextId, 6, '0', STR_PAD_LEFT);
        }
    }
}
