<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],
    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => 'http://127.0.0.1/callback/google',
        'api_key' => env('GOOGLE_API_KEY'),
      ], 
      'api_ninja' => [
        'api_key' => env('API_NINJA_API_KEY'),
      ], 
      'amadeus' => [
        'api_key' => env('AMADEUS_API_KEY'),
        'api_secret' => env('AMADEUS_API_SECRET'),
      ], 
      'foursquare' => [
        'api_key' => env('FOURSQUARE_API_KEY'),
      ],
      'unsplash' => [
        'access_key' => env('UNSPLASH_ACCESS_KEY'),
        'secret_key' => env('UNSPLASH_SECRET_KEY'),
      ]
];
