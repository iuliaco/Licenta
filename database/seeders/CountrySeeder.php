<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Country;
use File;
class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $json = File::get("countries.json");
        $countries = json_decode($json);
        foreach ($countries as $key => $value) {
            Country::create([
                "name" => $value->name,
                "code" => $value->code
            ]);

        }

    }
}
