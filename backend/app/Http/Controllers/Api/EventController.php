<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\JsonResponse;

class EventController extends Controller
{
    public function index(): JsonResponse
    {
        $events = Event::with('creator')->get();

        return response()->json($events);
    }
}