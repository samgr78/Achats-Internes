<?php

use Illuminate\Support\Facades\Route;

// Toute URL hors /api est gérée par Vue Router
Route::view('/{any?}', 'app')->where('any', '^(?!(api|sanctum|up)(/|$)).*$');
