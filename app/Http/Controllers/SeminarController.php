<?php

namespace App\Http\Controllers;

use App\Models\PesertaSeminar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeminarController extends Controller
{
    public function index()
    {
        $peserta = PesertaSeminar::with('pembeli')->get();
        return Inertia::render('Seminar/Index', [
            'peserta' => $peserta
        ]);
    }
}
