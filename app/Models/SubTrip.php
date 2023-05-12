<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class SubTrip extends Model
{
    use HasFactory;

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class);
    }

    public function rules()
    {
        return [
            'rated' => 'nullable|integer|between:1,5'
        ];
    }

    protected $fillable = [
        'start_date',
        'end_date',
        'hotel',
        'transport',
        'description',
        'liked',
        'disliked',
        'rated'
    ];


}
