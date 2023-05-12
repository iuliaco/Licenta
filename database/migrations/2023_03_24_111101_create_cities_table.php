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
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->unsignedBigInteger('country_id');
            $table->decimal('lat', 9, 6)->nullable();
            $table->decimal('lon', 9, 6)->nullable();
            $table->integer('safety_overall')->nullable();
            $table->integer('safety_lgbtq')->nullable();
            $table->integer('safety_medical')->nullable();
            $table->integer('safety_physicalHarm')->nullable();
            $table->integer('safety_politicalFreedom')->nullable();
            $table->integer('safety_theft')->nullable();
            $table->integer('safety_woman')->nullable();
            $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cities');
    }
};
