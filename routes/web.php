<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\EventController;

Route::get('/', function () {
    return Inertia::render('LandingPage');
});

Route::get('/staff/login', function () {
    if (\Illuminate\Support\Facades\Auth::check()) {
        return redirect('/pos');
    }
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
        $events = \App\Models\Event::all();
        return Inertia::render('POS/Index', [
            'merchandises' => $merchandise,
            'events' => $events
        ]);
    })->name('pos');
    
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('/merchandise', [\App\Http\Controllers\MerchandiseController::class, 'index'])->name('merchandise.index');
    Route::get('/transactions', [\App\Http\Controllers\TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transactions/pdf', [\App\Http\Controllers\TransactionController::class, 'pdf'])->name('transactions.pdf');
    Route::get('/transactions/{id}', [\App\Http\Controllers\TransactionController::class, 'show'])->name('transactions.show');
    
    Route::get('/seminar', [\App\Http\Controllers\SeminarController::class, 'index'])->name('seminar.index');
    Route::get('/seminar/{id}/edit', [\App\Http\Controllers\SeminarController::class, 'edit'])->name('seminar.edit');
    Route::put('/seminar/{id}', [\App\Http\Controllers\SeminarController::class, 'update'])->name('seminar.update');
    Route::delete('/seminar/{id}', [\App\Http\Controllers\SeminarController::class, 'destroy'])->name('seminar.destroy');

    Route::resource('staff', \App\Http\Controllers\StaffController::class);
    
    Route::get('/merchandise/create', [\App\Http\Controllers\MerchandiseController::class, 'create'])->name('merchandise.create');
    Route::post('/merchandise', [\App\Http\Controllers\MerchandiseController::class, 'store'])->name('merchandise.store');
    Route::get('/merchandise/{id}/edit', [\App\Http\Controllers\MerchandiseController::class, 'edit'])->name('merchandise.edit');
    Route::put('/merchandise/{id}', [\App\Http\Controllers\MerchandiseController::class, 'update'])->name('merchandise.update');
    
    Route::resource('event', EventController::class);

    Route::post('/api/checkout', [\App\Http\Controllers\CheckoutController::class, 'store']);
});
