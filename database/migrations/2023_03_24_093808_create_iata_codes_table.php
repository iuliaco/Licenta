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
        Schema::create('iata_codes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('iata_code')->unique();
            $table->tinyInteger('status');
            $table->string('iso_code');
            $table->string('continent');
            $table->string('size');
            $table->float('lat');
            $table->float('lon');
            $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('iata_codes');
    }
};
