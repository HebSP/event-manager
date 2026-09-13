<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/events', [EventController::class, 'index']);
Route::middleware('auth:sanctum')->post('/events', [EventController::class, 'store']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->put('/events/{event}', [EventController::class, 'update']);

Route::middleware('auth:sanctum')->delete('/events/{event}', [EventController::class, 'destroy']);

Route::middleware('auth:sanctum')->post('/events/{event}/register', [EventController::class, 'register']);

Route::middleware('auth:sanctum')->delete('/events/{event}/register', [EventController::class, 'unregister']);

Route::get('/events/{event}/participants', [EventController::class, 'participants']);