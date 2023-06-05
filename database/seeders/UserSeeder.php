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
            "name" => "Corcodel",
            "surname" => "Iulia",
            "username" => "iuliaco",
            "origin_country_id" => 179,
            "email" => "iuliaco2001@gmail.com",
            "password" => bcrypt("testtest")
        ]);
        User::create([
            "name" => "Isar",
            "surname" => "Ioana",
            "username" => "ioanai",
            "origin_country_id" => 179,
            "email" => "ioanaisar0@gmail.com",
            "password" => bcrypt("testtest")
        ]); 
        User::create([
            "name" => "Pricop",
            "surname" => "Razvan",
            "username" => "razzvy2023",
            "origin_country_id" => 179,
            "email" => "razvan.pricop@protonmail.com",
            "password" => bcrypt("testtest")
        ]);
    }
}
