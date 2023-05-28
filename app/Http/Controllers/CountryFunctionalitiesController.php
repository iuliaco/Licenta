<?php

namespace App\Http\Controllers;
use App\Models\Place;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Country;
use App\Models\City;
use App\Models\IataCodes;
use GuzzleHttp\Client;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;


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

        $iataCodes = IataCodes::where('iso_code', $country->code)->orderBy('name', 'asc')->get();
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

        if($city->safety_overall == null) {
            if(Cache::get('amadeus_bearer') == null) {
                $client_api_key = config('services.amadeus.api_key');
                $client_secret = config('services.amadeus.api_secret');
                $grant_type = "client_credentials";
                $response = Http::asForm()->post('https://test.api.amadeus.com/v1/security/oauth2/token', [
                    'grant_type' => $grant_type,
                    'client_id' => $client_api_key,
                    'client_secret' => $client_secret,
                    'Content-Type' => 'application/x-www-form-urlencoded',
                ]);
                
                if ($response->successful()) {
                    $responseData = $response->json();
                    $expires_in = $responseData['expires_in'];
                    $access_token = $responseData['access_token'];
                    Cache::put('amadeus_bearer', $access_token, $expires_in);
                } else {
                    return response()->json($response->json(), 500);
                }
            }
            $client = new Client(['headers' => ['Authorization' => 'Bearer ' . Cache::get('amadeus_bearer')]]);
            $response = $client->get('https://test.api.amadeus.com/v1/safety/safety-rated-locations?latitude=' . $city->lat . '&longitude=' . $city->lon . '&radius=20' . '&page%5Boffset%5D=0');
            if ($response->getStatusCode() >= 200 && $response->getStatusCode() < 300) {
                $responseContent = $response->getBody()->getContents();
                $jsonObject = json_decode($responseContent);
                dd($jsonObject);
                $safetyScores = $jsonObject['data'][0]['safetyScores'];
                $city->safety_overall = $safetyScores['overall'];
                $city->safety_lgbtq = $safetyScores['lgbtq'];
                $city->safety_medical = $safetyScores['medical'];
                $city->safety_physicalHarm = $safetyScores['physicalHarm'];
                $city->safety_politicalFreedom = $safetyScores['politicalFreedom'];
                $city->safety_theft = $safetyScores['theft'];
                $city->safety_woman = $safetyScores['woman'];
                $city->save();
            } 

        }


        dd($city);
        return response()->json(1);

    }
   

    public function getFlightPrice(Request $request)
    {
        $request->validate([
            'country_id_from' => 'required|integer|exists:countries,id',
            'iata_code_from' => 'required|integer|exists:iata_codes,id',
            'country_id_to' => 'required|integer|exists:countries,id',
            'iata_code_to' => 'required|integer|exists:iata_codes,id',
            'date' => 'required|date_format:Y-m-d',
            'amount' => 'required|integer'
        ]);

        $iataCodeFrom = IataCodes::findOrFail($request->iata_code_from);
        $iataCodeTo = IataCodes::findOrFail($request->iata_code_to);

        if(Cache::get('amadeus_bearer') == null) {
            $client_api_key = config('services.amadeus.api_key');
            $client_secret = config('services.amadeus.api_secret');
            $grant_type = "client_credentials";
            $response = Http::asForm()->post('https://test.api.amadeus.com/v1/security/oauth2/token', [
                'grant_type' => $grant_type,
                'client_id' => $client_api_key,
                'client_secret' => $client_secret,
                'Content-Type' => 'application/x-www-form-urlencoded',
            ]);
            
            if ($response->successful()) {
                $responseData = $response->json();
                $expires_in = $responseData['expires_in'];
                $access_token = $responseData['access_token'];
                Cache::put('amadeus_bearer', $access_token, $expires_in);
            }

           

        }

        $client = new Client(['headers' => ['Authorization' => 'Bearer ' . Cache::get('amadeus_bearer')]]);
        $response = $client->get('https://test.api.amadeus.com/v1/analytics/itinerary-price-metrics?originIataCode=' . $iataCodeFrom->iata_code . '&destinationIataCode=' . $iataCodeTo->iata_code . '&departureDate=' . $request->date . '&oneWay=true');
        $responseContent = $response->getBody()->getContents();
        $jsonObject = json_decode($responseContent);
        $prices = $jsonObject->data[0];
        $finalObject = [

            'price' => $prices->priceMetrics,
            'original_price' => $request->amount,
        ];
        // $countries = Country::get();
        // return  redirect()->back()->with(['finalObject' => $finalObject, 'countries' => $countries, 'date' => $request->date, 'amount' => $request->amount, 'currentCountryFrom' => $request->country_id_from, 'currentCountryTo' => $request->country_id_to, 'iataCodeFrom' => $request->iata_code_from, 'iataCodeTo' => $request->iata_code_to]);

        return redirect()->route('flight.get', [
            'finalObject' => $finalObject,
            'date' => $request->date,
            'amount' => $request->amount,
            'currentCountryFrom' => $request->country_id_from,
            'currentCountryTo' => $request->country_id_to,
            'iataCodeFrom' => $request->iata_code_from,
            'iataCodeTo' => $request->iata_code_to,
        ]);

    }
}
