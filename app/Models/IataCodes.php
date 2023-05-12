<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IataCodes extends Model
{
    use HasFactory;

    public const CONTINENT_AFRICA= 'AF';
    public const CONTINENT_ASIA = 'AS';
    public const CONTINENT_EUROPE= 'EU';
    public const CONTINENT_NORTH_AMERICA= 'NA';
    public const CONTINENT_SOUTH_AMERICA= 'SA';
    public const CONTINENT_ONCEANIA= 'OC';


     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name', 'iata_code','status', 'iso_code', 'continent', 'size', 'lat', 'lon'
    ];
}
