<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\IataCodes;
use App\Models\City;
use App\Models\Trip;
use App\Models\SubTrip;
use Carbon\Carbon;

class TripsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

            // Array of potential descriptions
        $descriptions = [
            'An epic journey through the mountains and forests.',
            'A relaxing beach vacation in the sun and surf.',
            'A cultural expedition visiting museums and historical landmarks.',
            'An exciting city break with shopping and nightlife.',
            'A gastronomic tour trying all the best local cuisines.',
            'A thrilling adventure filled with outdoor sports and activities.',
            'A peaceful retreat into the countryside away from the hustle and bustle.',
            'A wild safari exploring the unique local wildlife in their natural habitat.',
            'A scenic cruise around the most picturesque coastlines.',
            'An educational trip focused on local history, traditions, and people.',
            // ... you can add more descriptions ...
        ];

        // Array of potential likes
        $likes = [
            'The beautiful view of the mountains.',
            'The relaxing atmosphere of the beach.',
            'The rich history of the museums.',
            'The exciting city nightlife.',
            'The delicious local cuisine.',
            'The thrilling outdoor activities.',
            'The peaceful countryside.',
            'The exotic local wildlife.',
            'The picturesque coastlines.',
            'Learning about local history and traditions.',
            // ... you can add more likes ...
        ];

        // Array of potential dislikes
        $dislikes = [
            'Too crowded tourist spots.',
            'The weather was too hot.',
            'Public transportation was confusing.',
            'Local food was too spicy.',
            'Too many mosquitos.',
            'The noise from the city traffic.',
            'The hotel was not very clean.',
            'Lack of vegetarian food options.',
            'Too much walking required.',
            'Language barrier was a problem.',
            // ... you can add more dislikes ...
        ];
        
        $countryIds = [14, 15, 22, 34, 39, 55, 57, 58, 59, 73, 74, 81, 84, 98, 99, 108, 110, 128, 134, 135, 144, 154, 157, 174, 175, 179, 188, 190, 203, 209, 210, 229, 230];
        $airportIds = IataCodes::where('size', 'large')
            ->orWhere('size', 'medium')
            ->pluck('id')
            ->toArray();

        for ($i = 0; $i < 50; $i++) {
            $countryIdSource = $faker->randomElement($countryIds);
            $airportIdSource = $this->getAirportId($countryIdSource, $airportIds);
            $countryIdDestination = $faker->randomElement($countryIds);
            $airportIdDestination = $this->getAirportId($countryIdDestination, $airportIds);
            $start_date = $faker->dateTimeBetween('-1 years', '+1 years');
            $end_date = $faker->dateTimeInInterval($start_date->format('Y-m-d'), '+1 month');
          
            while ($end_date <= $start_date) {
                $end_date = $faker->dateTimeInInterval($start_date->format('Y-m-d'), '+1 month');
            }
            
            $description = null;
            $like = null;
            $dislike = null;
            $rated = null;

            // Only assign description and rating if end_date is not in the future
            if ($end_date <= Carbon::now()) {
                $description = $faker->randomElement($descriptions);
                $like = $faker->randomElement($likes);
                $dislike = $faker->randomElement($dislikes);
                $rated = $faker->numberBetween(1, 5);
            }

            $trip_id = Trip::insertGetId([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'description' => $faker->randomElement($descriptions),
                'user_id' => $faker->numberBetween(1, 3),
                'country_id' => $countryIdDestination,
                'origin_country_id' => $countryIdSource,
                'departure_airport_id' => $airportIdSource,
                'returning_airport_id' => $airportIdDestination,
                'rated' =>$rated,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            // Create 1-3 subtrips for each trip
            $subtrips = rand(1, 3);
            $tripDuration = $end_date->diff($start_date)->days;
            $subTripDurations = array_fill(0, $subtrips, floor($tripDuration/$subtrips));

            for ($j = 0; $j < $tripDuration % $subtrips; $j++) {
                $subTripDurations[$j]++;
            }
            $currentSubTripStartDate = clone $start_date;
            for ($j = 0; $j < $subtrips; $j++) {
                $cityId = City::where('country_id', $countryIdDestination)->inRandomOrder()->first()->id;
              
                $subtrip_start_date = clone $currentSubTripStartDate;
                $subtrip_end_date = (clone $currentSubTripStartDate)->modify('+' . $subTripDurations[$j] . ' days');
                $currentSubTripStartDate = (clone $subtrip_end_date)->modify('+1 day');
                if ($end_date <= Carbon::now()) {
                    $description = $faker->randomElement($descriptions);
                    $like = $faker->randomElement($likes);
                    $dislike = $faker->randomElement($dislikes);
                    $rated = $faker->numberBetween(1, 5);
                }
                Subtrip::insert([
                    'start_date' => $subtrip_start_date->format('Y-m-d'),
                    'end_date' => $subtrip_end_date->format('Y-m-d'),
                    'hotel' => $faker->company,
                    'transport' => $faker->randomElement(['car', 'bus', 'plane', 'train']),
                    'trip_id' => $trip_id,
                    'city_id' => $cityId,
                    'description' => $description,
                    'liked' => $like,
                    'disliked' => $dislike,
                    'rated' => $rated,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]);
            }
        }
    }

    /**
     * Fetch a random airport_id based on country_id.
     *
     * @param  int  $countryId
     * @param  array  $airportIds
     * @return int
     */
    protected function getAirportId(int $countryId, array $airportIds)
    {
        // Fetch airports based on country_id (iso_code)
        $airports = IataCodes::whereIn('id', $airportIds)
            ->where('iso_code', $countryId)
            ->pluck('id')
            ->toArray();

        // If no matching airports were found, fallback to the overall airportIds
        $airports = count($airports) > 0 ? $airports : $airportIds;

        return Faker::create()->randomElement($airports);
    }

}
