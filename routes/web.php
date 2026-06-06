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

Route::post('/staff/login', function (Request $request) {
    $credentials = $request->validate([
        'nrp' => ['required', 'string'],
        'password' => ['required'],
    ]);

    if (\Illuminate\Support\Facades\Auth::attempt(['nrp' => $credentials['nrp'], 'password' => $credentials['password']])) {
        $request->session()->regenerate();
        return redirect()->intended('/pos');
    }

    return back()->withErrors([
        'nrp' => 'NRP atau Password salah.',
    ])->onlyInput('nrp');
});

Route::middleware('auth')->group(function () {
    Route::post('/staff/logout', function (Request $request) {
        \Illuminate\Support\Facades\Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    })->name('logout');

    Route::get('/pos', function () {
        $merchandise = \App\Models\Merchandise::with('event')->get();
        return Inertia::render('POS/Index', [
            'merchandise' => $merchandise
        ]);
    })->name('pos');
    
    Route::post('/api/checkout', [\App\Http\Controllers\CheckoutController::class, 'store']);
});
