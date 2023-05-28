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
        Schema::create('sub_trips', function (Blueprint $table) {
            $table->id();
            $table->date("start_date")->nullable();
            $table->date("end_date")->nullable();
            $table->text("hotel")->nullable();
            $table->text("transport")->nullable();
            $table->unsignedBigInteger('trip_id');
            $table->unsignedBigInteger('city_id');
            $table->string("description")->nullable();
            $table->text("liked")->nullable();
            $table->text("disliked")->nullable();
            $table->unsignedTinyInteger('rated')->nullable();
            $table->timestamps();
            $table->foreign('trip_id')->references('id')->on('trips')->onDelete('cascade');
            $table->foreign('city_id')->references('id')->on('cities')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sub_trips');
    }
};
