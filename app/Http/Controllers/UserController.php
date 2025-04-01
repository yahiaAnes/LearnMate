<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Collab;

class UserController extends Controller
{
    public function CompleteInfo(){
        $user = Auth()->user();
        
        return Inertia::render('CompleteInfo',[
            'user'=> $user,
        ]);
    }

    public function storeInfo(Request $request, $id)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'university' => 'required|string|max:255',
            'speciality' => 'required|string|max:255',
            'level' => 'required|string|max:255',
            'bio' => 'required|string|max:255',
           
        ]);

        

        $user = User::findOrFail($id);

        $user->update([
            'university' => $validated['university'],
            'speciality' => $validated['speciality'],
            'level' => $validated['level'],
            'bio' => $validated['bio'],
            
        ]);

        return Inertia::render('Dashboard');
    }

    public function searchPartners()
    {
        $users = User::select('id', 'name', 'email', 'profile_image', 'speciality', 'level', 'bio')
            ->where('id', '!=', auth()->id()) // Exclude current user
            ->get();
        
        $collabs = Collab::with(['creator'])
            ->latest()
            ->get();
        return Inertia::render('User/SearchPartner', [
            'users' => $users,
            'collabs' => $collabs
        ]);
    }
}
