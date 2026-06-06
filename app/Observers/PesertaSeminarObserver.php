<?php

namespace App\Observers;

use App\Models\PesertaSeminar;
use Illuminate\Support\Facades\DB;

class PesertaSeminarObserver
{
    public function creating(PesertaSeminar $pesertaSeminar): void
    {
        if (empty($pesertaSeminar->id_peserta)) {
            // Find max id_peserta
            $maxId = PesertaSeminar::max(DB::raw('CAST(SUBSTRING(id_peserta, 4) AS UNSIGNED)'));
            $nextId = $maxId ? $maxId + 1 : 1;
            
            $pesertaSeminar->id_peserta = 'BST' . str_pad($nextId, 4, '0', STR_PAD_LEFT);
        }
    }
}
