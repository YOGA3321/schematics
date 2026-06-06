<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'event';
    protected $primaryKey = 'id_event';
    protected $guarded = [];

    public function merchandise()
    {
        return $this->hasMany(Merchandise::class, 'id_event', 'id_event');
    }
}
