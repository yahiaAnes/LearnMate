<?php

namespace App\Http\Controllers;

use App\Models\Collab;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollabController extends Controller
{
    public function index()
    {
        $collabs = Collab::where('creator_id', auth()->id())
            ->orWhere('partner_id', auth()->id())
            ->whereNotNull('partner_id')
            ->with(['creator', 'partner'])
            ->latest()
            ->get();

        return Inertia::render('User/Collabs/Index', [
            'collabs' => $collabs
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Collabs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:learn,teach,study_group,project,mentorship,research',
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $collab = Collab::create([
            'creator_id' => auth()->id(),
            'type' => $validated['type'],
            'subject' => $validated['subject'],
            'description' => $validated['description'],
            'status' => 'pending',
        ]);

        return redirect()->route('collabs.show', $collab)
            ->with('success', 'Collaboration request sent successfully');
    }

    public function show(Collab $collab)
    {
        return Inertia::render('User/Collabs/Show', [
            'collab' => $collab->load(['creator', 'partner'])
        ]);
    }

    public function edit(Collab $collab)
    {
        return Inertia::render('User/Collabs/Edit', [
            'collab' => $collab
        ]);
    }

    public function update(Request $request, Collab $collab)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:accepted,rejected',
        ]);

        $collab->update($validated);

        return redirect()->route('collabs.show', $collab)
            ->with('success', 'Collaboration request ' . $validated['status']);
    }

    public function destroy(Collab $collab)
    {
        $collab->delete();

        return redirect()->route('collabs.index')
            ->with('success', 'Collaboration deleted successfully');
    }
} 