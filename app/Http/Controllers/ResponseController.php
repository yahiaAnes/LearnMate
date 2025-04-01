<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RequestSession;


class ResponseController extends Controller
{
    public function index()
    {
        $requests = RequestSession::where('partner_id', auth()->id())
            ->with(['partner', 'user'])
            ->latest()
            ->get();

        return Inertia::render('User/Responses/Responses', [
            'requests' => $requests
        ]);
    }

    public function cancel(RequestSession $response)
    {
        $request = RequestSession::find($response->id);
        $request->delete();

        return back()->with('success', 'Request cancelled successfully.');
    }
}
