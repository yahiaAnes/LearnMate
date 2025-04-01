<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\CollabController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\ResponseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/complete-info/{id}', function ($id) {
        $user = \App\Models\User::findOrFail($id);
        return Inertia::render('CompleteInfo', [
            'user' => $user
        ]);
    })->name('complete.info');

    Route::get('/search-partner', [UserController::class, 'searchPartners'])->name('search.partner');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Skills routes
    Route::post('/skills', [SkillController::class, 'store'])->name('skills.store');
    Route::put('/skills/{id}', [SkillController::class, 'update'])->name('skills.update');
    Route::delete('/skills/{id}', [SkillController::class, 'destroy'])->name('skills.destroy');

    // Collaboration routes
    Route::resource('collabs', CollabController::class);

    // Requests routes
    Route::resource('requests', RequestController::class);
    Route::post('/requests/store', [RequestController::class, 'store'])->name('requests.store');
    Route::post('/requests/{request}/accept', [RequestController::class, 'accept'])->name('requests.accept');
    Route::post('/requests/{request}/reject', [RequestController::class, 'reject'])->name('requests.reject');

    // Responses routes
    Route::resource('responses', ResponseController::class);
    Route::post('/responses/{response}/cancel', [ResponseController::class, 'cancel'])->name('responses.cancel');
});

Route::get('/CompleteInfo',[UserController::class, 'CompleteInfo'])->middleware(['auth'])->name('CompleteInfo');

Route::post('/CompleteInfo/store_info/{id}', [UserController::class, 'storeInfo'])->middleware(['auth'])->name('users.storeInfo');

Route::get('/help', function () {
    return Inertia::render('Help/Help');
})->middleware(['auth', 'verified'])->name('help');

require __DIR__.'/auth.php';
