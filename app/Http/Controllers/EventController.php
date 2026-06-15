<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        // === PENGAMBILAN DATA INDEXING ===
        // Mengambil semua data event dan diurutkan berdasarkan waktu pembuatan terbaru untuk ditampilkan di tabel daftar Event
        $events = Event::orderBy('created_at', 'desc')->get();
        return Inertia::render('Event/Index', [
            'events' => $events
        ]);
    }

    public function create()
    {
        return Inertia::render('Event/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_subevent' => 'required|string|max:100',
        ]);

        Event::create($validated);

        return redirect()->route('event.index')->with('success', 'Event Category created successfully.');
    }

    public function edit($id)
    {
        $event = Event::findOrFail($id);
        return Inertia::render('Event/Edit', [
            'event' => $event
        ]);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validate([
            'nama_subevent' => 'required|string|max:100',
        ]);

        $event->update($validated);

        return redirect()->route('event.index')->with('success', 'Event Category updated successfully.');
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        
        // Prevent deleting if it has merchandise
        if ($event->merchandise()->count() > 0) {
            return redirect()->route('event.index')->with('error', 'Cannot delete event because it is used in merchandise.');
        }

        $event->delete();

        return redirect()->route('event.index')->with('success', 'Event Category deleted successfully.');
    }
}
