<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Country;
use App\Models\User;

class Trip extends Model
{
    use HasFactory;

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function originCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }



    public function subtrips() {
        return $this->hasMany(SubTrip::class);
    }
    
    public function departureAirport()
    {
        return $this->belongsTo(IataCodes::class, 'departure_airport_id', 'id');
    }

    public function returningAirport()
    {
        return $this->belongsTo(IataCodes::class, 'returning_airport_id', 'id');
    }

    protected $fillable = [
        'departure_date',
        'return_date',
        'description',
        'story',
        'rated'
    ];
}
