<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Country;

class City extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'country_id',
        'lat',
        'lon',
    ];

    public function country():BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function trips() {
        return $this->hasMany(Trips::class);
    }
    
}
