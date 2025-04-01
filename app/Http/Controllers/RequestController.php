<?php

namespace App\Http\Controllers;

use App\Models\Collab;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RequestSession;

class RequestController extends Controller
{
    public function index()
    {
        $requests = RequestSession::where('user_id', auth()->id())
            ->with(['partner', 'user'])
            ->latest()
            ->get();

        return Inertia::render('User/Requests/Requests', [
            'requests' => $requests
        ]);
    }

    public function accept(Collab $request)
    {
        $session = RequestSession::find($request->id);
        $session->update([
            'status' => 'accepted'
        ]);

        return back()->with('success', 'Request accepted successfully.');
    }

    public function reject(Collab $request)
    {
        $session = RequestSession::find($request->id);
        $session->update([
            'status' => 'rejected'
        ]);

        return back()->with('success', 'Request rejected successfully.');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required',
            'description' => 'required',
            'time' => 'required',
            'user_id' => 'required',
        ]);

        RequestSession::create([
            ...$validated,
            'partner_id' => auth()->id(),
        ]);

        return back()->with('success', 'Request sent successfully.');
    }
    
} 