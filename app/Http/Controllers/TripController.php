<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Trip;
use App\Models\Country;

class TripController extends Controller
{
    /**
     * Display a listing of the resource in json.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        $trips = $user->trips();
        
        // Return the list of trips as a JSON response
        return response()->json([
            'message' => 'List of trips retrieved successfully',
            'data' => $trips
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function view()
    {
        $user = Auth::user();
        $trips = User::find($user->id)->trips()->with('country', 'city')->get();
        $countries = Country::get();
        // dd($trips);
        
        // Return the list of trips as a JSON response
        return Inertia::render('Trips/View', ['trips' => $trips, 'countries' => $countries]);
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
        public function createOld()
    {
        $countries = Country::get();
        return Inertia::render('Trips/CreateOld', ['countries' => $countries]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createNew()
    {
        $countries = Country::get();
        return Inertia::render('Trips/CreateNew', ['countries' => $countries]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showInterestPoints()
    {
        $countries = Country::get();
        return Inertia::render('Trips/InterestPoints', ['countries' => $countries]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showFlightPrice()
    {
        $countries = Country::get();
        return Inertia::render('Trips/FlightPrice', ['countries' => $countries]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate( [
            'country_id' => ['required'],
            'city_id' => ['required'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
        ]);
  
        $trip = new Trip($request->all());
        $trip->user_id = Auth::id();
        $trip->country_id = $request->country_id;
        $trip->city_id = $request->city_id;
        $trip->start_date = \Carbon\Carbon::parse($request->start_date)->format('Y-m-d');
        $trip->end_date = \Carbon\Carbon::parse($request->end_date)->format('Y-m-d');

        $trip->save();
        
        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource. Inertia
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Trip  $trip
     * @return response()
     */
    public function edit(Trip $trip)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        
        $request->validate( [
            'country_id' => ['required'],
            'city_id' => ['required'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
        ]);

        $trip = Trip::find($id);
        if($trip && $trip->user_id == Auth::id()) {
            $trip->country_id = $request->country_id;
            $trip->city_id = $request->city_id;
            $trip->start_date = \Carbon\Carbon::parse($request->start_date)->format('Y-m-d');
            $trip->end_date = \Carbon\Carbon::parse($request->end_date)->format('Y-m-d');
            $trip->description = $request->description;
            $trip->rated = $request->rated;
            $trip->story = $request->story;
            $trip->save();
        }
        $user = Auth::user();
        $trips = User::find($user->id)->trips()->with('country', 'city')->get();
        $countries = Country::get();

        return Inertia::render('Trips/View', ['trips' => $trips, 'countries' => $countries]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $trip = Trip::find($id);
        if($trip && $trip->user_id == Auth::id()) {
            $trip->delete();
        }
       

        $user = Auth::user();
        $trips = User::find($user->id)->trips()->with('country', 'city')->get();
        $countries = Country::get();
        
        return Inertia::render('Trips/View', ['trips' => $trips, 'countries' => $countries]);

    }
}
