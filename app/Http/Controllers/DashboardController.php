<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trip;
use Carbon\Carbon;
use Inertia\Inertia;
use Auth;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $nextTrips = User::find($user->id)->trips()->where('start_date', '>', Carbon::now())
        ->orderBy('start_date', 'asc')
        ->with('departureAirport', 'returningAirport', 'originCountry', 'country', 'subtrips.city' )
        ->take(3)
        ->get();

        $lastTrips = User::find($user->id)->trips()->where('start_date', '<', Carbon::now())
        ->orderBy('start_date', 'desc')
        ->with('departureAirport', 'returningAirport', 'originCountry', 'country', 'subtrips.city' )
        ->take(3)
        ->get();

        $allTrips = User::find($user->id)->trips()->with('subtrips.city')->get();

        return Inertia::render('Dashboard', ['futureTrips' => $nextTrips, 'pastTrips' => $lastTrips, 'allTrips' => $allTrips]);
    }
}
