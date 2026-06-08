<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Merchandise;
use App\Models\Event;
use Illuminate\Support\Facades\Storage;

class MerchandiseController extends Controller
{
    public function index()
    {
        $merchandises = Merchandise::with('event')->get();
        return Inertia::render('Merchandise/Index', [
            'merchandises' => $merchandises
        ]);
    }

    public function create()
    {
        $events = Event::all();
        return Inertia::render('Merchandise/Create', [
            'events' => $events
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tipe_merchandise' => 'required|string|max:20',
            'harga_merchandise' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'id_event' => 'required|exists:event,id_event',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('merchandise', 'public');
            $validated['foto'] = $path;
        }

        Merchandise::create($validated);

        return redirect()->route('merchandise.index')->with('success', 'Merchandise berhasil ditambahkan.');
    }

    public function edit($id)
    {
        $merchandise = Merchandise::findOrFail($id);
        $events = Event::all();
        return Inertia::render('Merchandise/Edit', [
            'merchandise' => $merchandise,
            'events' => $events
        ]);
    }

    public function update(Request $request, $id)
    {
        $merchandise = Merchandise::findOrFail($id);

        $validated = $request->validate([
            'tipe_merchandise' => 'required|string|max:20',
            'harga_merchandise' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'id_event' => 'required|exists:event,id_event',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('merchandise', 'public');
            $validated['foto'] = $path;
        }

        $merchandise->update($validated);

        return redirect()->route('merchandise.index')->with('success', 'Merchandise berhasil diperbarui.');
    }
}
