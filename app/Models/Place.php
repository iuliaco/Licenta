<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    use HasFactory;

    protected $fillable = [
        'geoCode',
        'name',
        'category',
        'description',
        'address',
        'rating',
        'city_id',
    ];

    protected $casts = [
        'geoCode' => 'json',
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
