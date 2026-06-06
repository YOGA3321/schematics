<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MerchandiseStockUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $id_merchandise;
    public $stok;

    /**
     * Create a new event instance.
     */
    public function __construct($id_merchandise, $stok)
    {
        $this->id_merchandise = $id_merchandise;
        $this->stok = $stok;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('pos-channel'),
        ];
    }
    
    public function broadcastAs()
    {
        return 'stock.updated';
    }
}
