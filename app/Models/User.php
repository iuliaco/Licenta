<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Trip;
use App\Models\Country;
use Musonza\Chat\Traits\Messageable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    use Messageable;

    public function trips(): HasMany
    {
        return $this->hasMany(Trip::class);
    }

    public function originCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function getOriginCountryNameAttribute()
    {
        return $this->originCountry->name;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'username',
        'email',
        'languages',
        'age',
        'gender',
        'password',
        'origin_country_id',
        'social_id',
        'social_type',  // 1 - google
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

//     protected $appends = [
//         'profile_photo_url',
//     ];
}
