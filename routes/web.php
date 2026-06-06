<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('LandingPage');
});

Route::get('/staff/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::middleware('auth')->group(function () {
    Route::get('/pos', function () {
        $merchandise = \App\Models\Merchandise::with('event')->get();
        return Inertia::render('POS/Index', [
            'merchandise' => $merchandise
        ]);
    })->name('pos');
    
    Route::post('/api/checkout', [\App\Http\Controllers\CheckoutController::class, 'store']);
});

