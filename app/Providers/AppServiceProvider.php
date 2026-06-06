<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\PesertaSeminar;
use App\Models\Transaksi;
use App\Observers\PesertaSeminarObserver;
use App\Observers\TransaksiObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        PesertaSeminar::observe(PesertaSeminarObserver::class);
        Transaksi::observe(TransaksiObserver::class);
    }
}
