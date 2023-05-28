<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        User::create([
            "name" => "Test",
            "surname" => "Test",
            "username" => "test",
            "origin_country_id" => 179,
            "email" => "admin@gmail.com",
            "password" => bcrypt("testtest")
        ]);
        User::create([
            "name" => "Test",
            "surname" => "Test",
            "username" => "test2",
            "origin_country_id" => 179,
            "email" => "admin2@gmail.com",
            "password" => bcrypt("testtest")
        ]);
    }
}
