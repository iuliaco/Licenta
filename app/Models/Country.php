<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Country extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

     protected $fillable = [
        'name', 'code'
    ];

    public function cities()
    {
        return $this->hasMany(City::class);
    }

    public function users() {
        return $this->hasMany(User::class, "origin_country_id");
    }
    
    public function trips() {
        return $this->hasMany(Trips::class, "country_id");
    }

    public function departureTrips() {
        return $this->hasMany(Trips::class, "origin_country_id");
    }

}
