<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home route
Route::get('/', fn () =>
    Inertia::render('Welcome', [
        'canLogin' => Route::has('login')
    ])
)->name('home');

// Dashboard route
Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

// Authenticated and verified routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Profile routes
    Route::controller(ProfileController::class)->group(function () {
        Route::get('profile', 'edit')->name('profile.edit');
        Route::patch('profile', 'update')->name('profile.update');
        Route::delete('profile', 'destroy')->name('profile.destroy');
    });

    // User management routes
    Route::resource('users', UserController::class);
    Route::resource('farms', FarmController::class);
});

require __DIR__.'/auth.php';
