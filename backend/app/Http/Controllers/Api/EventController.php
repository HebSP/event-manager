<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class EventController extends Controller
{
    public function index(): JsonResponse
    {
        $events = Event::with('creator')->get();

        return response()->json($events);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'capacity' => ['required', 'integer', 'min:1'],
        ]);
        $validated['created_by'] = $request->user()->id;
        $event = Event::create($validated);

        return response()->json($event, 201);
    }

    public function update(Request $request, Event $event): JsonResponse
    {
        Gate::authorize('update', $event);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'capacity' => ['required', 'integer', 'min:1'],
        ]);

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy(Event $event): JsonResponse
    {
        Gate::authorize('delete', $event);;

        $event->delete();

        return response()->json([
            'message' => 'Evento excluído com sucesso.',
        ]);
    }

    public function register(Request $request, Event $event): JsonResponse
    {
        $user = $request->user();

        if ($event->participants()->where('user_id', $user->id)->exists()) {
            return response()->json([
                'message' => 'Você já está inscrito neste evento.',
            ], 422);
        }

        if ($event->participants()->count() >= $event->capacity) {
            return response()->json([
                'message' => 'Este evento está lotado.',
            ], 422);
        }

        $event->participants()->attach($user->id);

        return response()->json([
            'message' => 'Inscrição realizada com sucesso.',
        ], 201);
    }

    public function unregister(Request $request, Event $event): JsonResponse
    {
        $user = $request->user();

        if (!$event->participants()->where('user_id', $user->id)->exists()) {
            return response()->json([
                'message' => 'Você não está inscrito neste evento.',
            ], 422);
        }

        $event->participants()->detach($user->id);

        return response()->json([
            'message' => 'Inscrição cancelada com sucesso.',
        ]);
    }

    public function participants(Event $event): JsonResponse
    {
        $participants = $event->participants()->get();

        return response()->json($participants);
    }
}