<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function checkEmail(Request $request)
    {
        $email = $request->email;

        $exists = User::where('email', $email)->exists();

        return response()->json(['exists' => $exists]);
    }

    public function checkArtistName(Request $request)
    {
        $artistName = $request->artist_name;

        $exists = User::where('artist_name', $artistName)->exists();

        return response()->json(['exists' => $exists]);
    }
}
