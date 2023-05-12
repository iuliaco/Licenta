<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use File;
use App\Models\Country;
use App\Models\City;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("cities.json");
        $countries = json_decode($json);
        $data = json_decode($json, true);
        foreach ($data as $country => $cities) {
            $countryId = Country::where('name', $country)->first();
            print($country);

            foreach ($cities as $cityName) {
                City::create([
                    "name" => $cityName,
                    "country_id" => $countryId->id
                ]);

            }
        }

    }
}
