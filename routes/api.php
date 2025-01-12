<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;

Route::prefix('v1')->group(function () {
    Route::post('/validate-email', [AuthController::class, 'checkEmail']);
    Route::post('/validate-artist-name', [AuthController::class, 'checkArtistName']);

    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/events', [EventController::class, 'index']);
    });

    Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
        return $request->user();
    });

    require __DIR__.'/auth.php';
});
