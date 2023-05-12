<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Country;
use App\Models\City;
use App\Models\IataCodes;
use GuzzleHttp\Client;
use Illuminate\Validation\Rule;

class CountryFunctionalitiesController extends Controller
{
    public function getSafetyPage()
    {
        $user = Auth::user(); 
        $countries = Country::get();

        // return response()->json($user);
        return Inertia::render('CountrySafety', ['user' => $user, 'countries' => $countries]);

    }

    public function getCountryIataCodes($id)
    {
        $country = Country::findOrFail($id);

        $iataCodes = IataCodes::where('iso_code', $country->code)->get();
        // return response()->json($user);
        return response()->json($iataCodes);;

    }

    public function getCountryCitiesList($id)
    {
        $cities = Country::findOrFail($id)->cities()->orderBy('name')->get();

        // return response()->json($user);
        return response()->json($cities);;

    }

    public function getSafetyForCity(Request $request)
    {
        $request->validate([
            'country_id' => 'required|integer|exists:countries,id',
            'city_id' => 'required|integer|exists:cities,id'
        ]);
        $city = City::findOrFail($request->city_id);
        // dd($city);


        if($city->lon == null || $city->lat == null){
            $client_id = config('services.api_ninja.api_key');
            $api_url = 'https://api.api-ninjas.com/v1/geocoding?city=' . $city->name;
            $client = new Client(['headers' => ['X-Api-Key' => $client_id]]);
            $response = $client->get($api_url);
            $responseContent = $response->getBody()->getContents();
            $jsonObject = json_decode($responseContent);
            $city->lon = $jsonObject[0]->longitude;
            $city->lat = $jsonObject[0]->latitude;
            $city->save();
        }
        dd($city);
        return response()->json(1);

    }
   
}
