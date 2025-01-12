<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Auth;
use App\Http\Resources\EventResource;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::where('user_id', Auth::user()->id)->get();

        return EventResource::collection($events);
    }
}
