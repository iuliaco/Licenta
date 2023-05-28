<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->date("start_date")->nullable();
            $table->date("end_date")->nullable();
            $table->string("description")->nullable();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('country_id');
            $table->unsignedBigInteger('origin_country_id')->nullable();
            $table->unsignedBigInteger('departure_airport_id')->nullable();
            $table->unsignedBigInteger('returning_airport_id')->nullable();
            $table->unsignedTinyInteger('rated')->nullable();
            $table->timestamps();
            $table->foreign('origin_country_id')->references('id')->on('countries')->onDelete('cascade');
            $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('departure_airport_id')->references('id')->on('iata_codes')->onDelete('cascade');
            $table->foreign('returning_airport_id')->references('id')->on('iata_codes')->onDelete('cascade');
        });
    }

    /**
     * 
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trips');
    }
};
