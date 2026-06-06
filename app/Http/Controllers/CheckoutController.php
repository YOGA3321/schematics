<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Actions\ProcessTransactionAction;

class CheckoutController extends Controller
{
    public function store(Request $request, ProcessTransactionAction $action)
    {
        $validated = $request->validate([
            'pembeli.nama_lengkap' => 'required|string|max:50',
            'seminar' => 'nullable|array',
            'seminar.email' => 'required_with:seminar|email|max:50',
            'seminar.nomor_telepon' => 'required_with:seminar|string|max:15',
            'id_metode' => 'required|integer',
            'cart' => 'required|array|min:1',
            'cart.*.id_merchandise' => 'required|integer',
            'cart.*.jumlah' => 'required|integer|min:1',
        ]);

        try {
            // Get currently authenticated staff, fallback for demo
            $nrp = auth()->check() ? auth()->user()->nrp : '5025251187';

            $transaksi = $action->execute(
                $validated['pembeli'],
                $validated['seminar'] ?? null,
                $nrp,
                $validated['id_metode'],
                $validated['cart']
            );

            return response()->json([
                'message' => 'Transaksi berhasil diproses',
                'transaksi' => $transaksi
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
