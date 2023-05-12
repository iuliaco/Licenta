<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\IataCodes;
use File;

class IataSeeder extends Seeder
{
    /**
     * Run the database seeds,
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("airports.json");

        $iata_codes = json_decode($json);

        foreach ($iata_codes as $key => $value) {
            if($value->type == "airport" && property_exists($value, 'lat') && property_exists($value, 'lon')&& property_exists($value, 'name') && $value->name != null) {
                IataCodes::create([

                    "name" => $value->name,
                    "iata_code" => $value->iata,
                    "status" => $value->status,
                    "iso_code" => $value->iso,
                    "continent" => $value->continent,
                    "size" => $value->size,
                    "lat" => floatval($value->lat),
                    "lon" => floatval($value->lon)

                    
                ]);
            }

        }
    }
}
