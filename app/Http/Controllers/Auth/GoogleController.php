<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        // Check if the user with the google_id already exists
        $user = User::where('google_id', $googleUser->getId())->first();

        if (!$user) {
            // If no user is found, check if the email already exists
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                // If a user with the email exists, update their Google ID
                $user->update(['google_id' => $googleUser->getId()]);
            } else {
                // Otherwise, create a new user
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'email_verified_at' => Carbon::now(), // Mark email as verified
                    'password' => Hash::make(str()->random(24)), // Hash the password securely
                ]);
            }
        }

        // Ensure the email_verified_at field is set for Google users
        if (is_null($user->email_verified_at)) {
            $user->update(['email_verified_at' => Carbon::now()]);
        }

        // Log the user in
        Auth::login($user);

        return redirect('/dashboard'); // Redirect to the desired page after login
    }
}
