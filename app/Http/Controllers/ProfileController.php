<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    //

    public function show(Request $request, int $id = null)
    {
        $userId = Auth::user()->id;
        if($id) {
            $userId = $id;
        }
        $user = User::with("originCountry")->findOrFail($userId);
        // dd($user);
        return Inertia::render('Profile/Show',['user' => $user]);
    }
}
