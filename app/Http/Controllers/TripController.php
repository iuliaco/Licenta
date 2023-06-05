<?php

namespace App\Http\Controllers;
use App\Models\City;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Trip;
use App\Models\Country;
use App\Models\SubTrip;
use App\Models\Place;
use Http;

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
        $trips = User::find($user->id)->trips()->with('departureAirport', 'returningAirport', 'originCountry', 'country', 'subtrips.city' )->get();
        $countries = Country::get();
        
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
    public function create()
    {
        $countries = Country::get();
        return Inertia::render('Trips/Create', ['countries' => $countries]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showInterestPoints()
    {
        $countries = Country::get();
        return Inertia::render('Trips/InterestPointsPage', ['countries' => $countries]);
    }

    private function getGooglePlacePhotoUrl($placeName)
{
    $apiKey = config('services.google.api_key');

    // Retrieve photo reference for the place
    $placeDetailsUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' . urlencode($placeName) . '&inputtype=textquery&fields=photos&key=' . $apiKey;
    $placeDetailsResponse = Http::get($placeDetailsUrl);
    $placeDetails = $placeDetailsResponse->json();

    if (isset($placeDetails['candidates'][0]['photos'][0]['photo_reference'])) {
        $photoReference = $placeDetails['candidates'][0]['photos'][0]['photo_reference'];

        // Construct photo URL
        $photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' . $photoReference . '&key=' . $apiKey;

        return $photoUrl;
    }

    return null;
}

    public function storeInterestPoints(Request $request)
    {
        $request->validate([
            'country_id' => 'required|integer|exists:countries,id',
            'city_id' => 'required|integer|exists:cities,id'
        ]);
        $city = City::findOrFail($request->city_id);
        $places = Place::where('city_id', $request->city_id)->get();
        if($places->count() == 0) {
            $client = new \GuzzleHttp\Client();

            // $response = $client->request('GET', 'https://api.foursquare.com/v3/places/search?ll=' . $city->lat . '%2C' . $city->lon . '&radius=10000&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cdescription&sort=RELEVANCE&limit=50', [
            //     $response = $client->request('GET', 'https://api.foursquare.com/v3/places/search?ll=44.4325%2C26.1039&radius=10000&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cdescription&sort=RELEVANCE&limit=50',
            //     [
            //     'headers' => [
            //     'Authorization' => config('services.foursquare.api_key'),
            //     'accept' => 'application/json',
            // ],
            // ]);
            $response = $client->request('GET', 'https://api.foursquare.com/v3/places/search?ll=' . $city->lat . '%2C' . $city->lon . '&radius=10000&fields=name%2Cgeocodes%2Clocation%2Ccategories%2Crating%2Cdescription&sort=RELEVANCE&limit=50', [
                'headers' => [
                  'Authorization' => 'fsq3wlRWMHtfkXNVML0TCQKBVy6/SqGceQUp3xaPokUSSlI=',
                  'accept' => 'application/json',
                ],
              ]);

              $responseContent = $response->getBody()->getContents();
              $jsonObject = json_decode($responseContent);
              foreach($jsonObject->results as $index => $result) {
                $place = new Place();
                $place->name = $result->name;
                $place->setAttribute('geoCode->lat', $result->geocodes->main->latitude);
                $place->setAttribute('geoCode->lon', $result->geocodes->main->longitude);
                if(property_exists($result, 'rating'))
                    $place->rating = $result->rating;
                if(property_exists($result, 'description'))
                    $place->description = $result->description;
                if(property_exists($result, 'location'))
                    if(property_exists($result->location, 'formatted_address'))
                        $place->address = $result->location->formatted_address;
                if(property_exists($result, 'categories') && count($result->categories) > 0)
                    $place->category = $result->categories[0]->name;
                $place->city_id = $request->city_id;
                $place->save();

                if ($index < 3) {
                    $photoUrl = $this->getGooglePlacePhotoUrl($place->name);
                    $place->photoUrl = $photoUrl;
                    $place->save();
                }
              }
        }
        $countries = Country::get();
        $places = Place::where('city_id', $request->city_id)->get();
        // dd($places);
        return Inertia::render('Trips/InterestPointsPage', ['countries' => $countries, 'places' => $places, 'country_id' => $request->country_id, 'city_id' => $request->city_id]);
        
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showFlightPrice(Request $request)
    {
        $countries = Country::get();
        if($request->input('finalObject') == null){
            return Inertia::render('Trips/FlightPrice', ['countries' => $countries]);
        }
        $finalObject = $request->input('finalObject');
        $date = $request->input('date');
        $amount = $request->input('amount');
        $currentCountryFrom = $request->input('currentCountryFrom');
        $currentCountryTo = $request->input('currentCountryTo');
        $iataCodeFrom = $request->input('iataCodeFrom');
        $iataCodeTo = $request->input('iataCodeTo');
        
        return Inertia::render('Trips/FlightPrice', [
            'countries' => $countries,
            'finalObject' => $finalObject,
            'date' => $date,
            'amount' => $amount,
            'currentCountryFrom' => $currentCountryFrom,
            'currentCountryTo' => $currentCountryTo,
            'iataCodeFrom' => $iataCodeFrom,
            'iataCodeTo' => $iataCodeTo,
        ]);
    
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getReviews(Request $request)
    {
        $country = $request->query('country_name');
        $city = $request->query('city_name');
        if($country != null && $city != null){
            $countryObject = Country::where('name', $country)->first();
            $cityObject = City::where('name', $city)->first();
            $cities = $countryObject->cities()->get();
            $countries = Country::get();
            $subtrips = SubTrip::where('city_id', $cityObject->id)->get();
            $subtrips->map(function ($u) {

                $u['userId'] = User::find($u->trip->user_id)->id;
                $u['username'] = User::find($u->trip->user_id)->username;
                $u['city'] = City::find($u->city_id)->name;

                return $u;
                
                }); 
            // dd($subtrips);
            return Inertia::render('Reviews', ['countries' => $countries, 'cities' => $cities, 'country' => $countryObject, 'city' => $cityObject, 'reviews' => $subtrips]);

        }

        $countries = Country::get();
        return Inertia::render('Reviews', ['countries' => $countries]);
        
    }

     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * 
     */
    public function checkCountryInNewTrip(Request $request)
    {
        $request->validate( [
            'country_id' => ['required'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
        ]);
  
        return redirect()->back();
    }

    public function checkSubTripInNewTrip(Request $request)
    {
        $request->validate( [
            'subtrips.0.city_id' => ['required'],
            'subtrips.0.start_date' => ['required', 'date'],
            'subtrips.0.end_date' => ['required', 'date'],
        ],[
        'subtrips.0.city_id.required' => 'City is required.',
        'subtrips.0.start_date.required' => 'Start date is required.',
        'subtrips.0.end_date.required' => 'End date is required.',
        ]
        );
        
        return redirect()->back();
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
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
            'subtrips.*.city_id' => ['required'],
            'subtrips.*.start_date' => ['required', 'date'],
            'subtrips.*.end_date' => ['required', 'date'],
        ],[
        'country_id.required' => 'Destination country is required.',
        'start_date.required' => 'Start date is required.',
        'end_date.required' => 'End date is required.',
        'subtrips.*.city_id.required' => 'City is required.',
        'subtrips.*.start_date.required' => 'Start date is required.',
        'subtrips.*.end_date.required' => 'End date is required.',
        ]
        );
        // dd($request->all());
  
        $trip = new Trip($request->all());
        $trip->user_id = Auth::id();
        $trip->country_id = $request->country_id;
        $trip->start_date = \Carbon\Carbon::parse($request->start_date)->format('Y-m-d');
        $trip->end_date = \Carbon\Carbon::parse($request->end_date)->format('Y-m-d');
        $trip->description = ($request->description == null || $request->description == "") ? null : $request->description;
        $trip->rated = ($request->rated == null || $request->rated == "") ? null :  $request->rated;
        $trip->departure_airport_id = ($request->departure_airport_id == null || $request->departure_airport_id == "") ? null :  $request->departure_airport_id;
        $trip->returning_airport_id = ($request->returning_airport_id == null || $request->returning_airport_id == "") ? null :  $request->returning_airport_id;
        $trip->origin_country_id = ($request->origin_country_id == null || $request->origin_country_id == "") ? null :  $request->origin_country_id;

        $trip->save();
        
        foreach ($request->subtrips as $subtrip) {
            $newSubTrip = new SubTrip();
            $newSubTrip->city_id = $subtrip['city_id'];
            $newSubTrip->trip_id = $trip->id;
            $newSubTrip->start_date = \Carbon\Carbon::parse($subtrip['start_date'])->format('Y-m-d');
            $newSubTrip->end_date = \Carbon\Carbon::parse($subtrip['end_date'])->format('Y-m-d');
            $newSubTrip->hotel = ($subtrip['hotel'] == null || $subtrip['hotel'] == "") ? null : $subtrip['hotel'];
            $newSubTrip->transport = ($subtrip['transport'] == null || $subtrip['transport'] == "") ? null : $subtrip['transport'];
            $newSubTrip->description = ($subtrip['description'] == null || $subtrip['description'] == "") ? null : $subtrip['description'];
            $newSubTrip->liked = ($subtrip['liked'] == null || $subtrip['liked'] == "") ? null : $subtrip['liked'];
            $newSubTrip->disliked = ($subtrip['disliked'] == null || $subtrip['disliked'] == "") ? null : $subtrip['disliked'];
            $newSubTrip->rated = ($subtrip['rated'] == null || $subtrip['rated'] == "") ? null : $subtrip['rated'];
            $newSubTrip->save();
        }

        return redirect()->back();
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
    public function edit(int $id)
    {
        $countries = Country::get();
        $trip = Trip::with('departureAirport', 'returningAirport', 'originCountry', 'country', 'subtrips.city')->findOrFail($id);
        return Inertia::render('Trips/Update', ['countries' => $countries, 'trip' => $trip]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     */
    public function update(Request $request, $id)
    {
        //
        
        $request->validate( [
            'country_id' => ['required'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
            'subtrips.*.city_id' => ['required'],
            'subtrips.*.start_date' => ['required', 'date'],
            'subtrips.*.end_date' => ['required', 'date'],
        ],[
        'country_id.required' => 'Destination country is required.',
        'start_date.required' => 'Start date is required.',
        'end_date.required' => 'End date is required.',
        'subtrips.*.city_id.required' => 'City is required.',
        'subtrips.*.start_date.required' => 'Start date is required.',
        'subtrips.*.end_date.required' => 'End date is required.',
        ]
        );

        $trip = Trip::find($id);
        if($trip && $trip->user_id == Auth::id()) {
            $trip->country_id = $request->country_id;
            $trip->start_date = \Carbon\Carbon::parse($request->start_date)->format('Y-m-d');
            $trip->end_date = \Carbon\Carbon::parse($request->end_date)->format('Y-m-d');
            $trip->description = ($request->description == null || $request->description == "") ? null : $request->description;
            $trip->rated = ($request->rated == null || $request->rated == "") ? null :  $request->rated;
            $trip->departure_airport_id = ($request->departure_airport_id == null || $request->departure_airport_id == "") ? null :  $request->departure_airport_id;
            $trip->returning_airport_id = ($request->returning_airport_id == null || $request->returning_airport_id == "") ? null :  $request->returning_airport_id;
            $trip->origin_country_id = ($request->origin_country_id == null || $request->origin_country_id == "") ? null :  $request->origin_country_id;
    
            $trip->save();
        }

        $subtrips = $request->input('subtrips', []);
    
        foreach ($subtrips as $subtrip) {
            $subtripId = $subtrip['id'] ?? null;
            $data = [
                'city_id' => $subtrip['city_id'],
                'start_date' => \Carbon\Carbon::parse($subtrip['start_date'])->format('Y-m-d'),
                'end_date' => \Carbon\Carbon::parse($subtrip['end_date'])->format('Y-m-d'),
                'hotel' => ($subtrip['hotel'] == null || $subtrip['hotel'] == "") ? null : $subtrip['hotel'],
                'transport' => ($subtrip['transport'] == null || $subtrip['transport'] == "") ? null : $subtrip['transport'],
                'description' => ($subtrip['description'] == null || $subtrip['description'] == "") ? null : $subtrip['description'],
                'liked' => ($subtrip['liked'] == null || $subtrip['liked'] == "") ? null : $subtrip['liked'],
                'disliked' => ($subtrip['disliked'] == null || $subtrip['disliked'] == "") ? null : $subtrip['disliked'],
                'rated' => ($subtrip['rated'] == null || $subtrip['rated'] == "") ? null : $subtrip['rated'],
            ];
            
            if ($subtripId) {
                $trip->subtrips()->where('id', $subtripId)->update($data);
            } else {
                $trip->subtrips()->create($data);
            }
        }
        
        $deletedSubtripIds = collect($trip->subtrips)->pluck('id')->diff(collect($subtrips)->pluck('id'))->all();
        Subtrip::whereIn('id', $deletedSubtripIds)->delete();

        $user = Auth::user();
        $trips = User::find($user->id)->trips()->with('departureAirport', 'returningAirport', 'originCountry','country', 'subtrips.city' )->get();
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
        $trips = User::find($user->id)->trips()->with('departureAirport', 'returningAirport', 'originCountry', 'country', 'subtrips.city')->get();
        $countries = Country::get();
        
        return Inertia::render('Trips/View', ['trips' => $trips, 'countries' => $countries]);

    }
}
