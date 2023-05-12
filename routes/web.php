<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TripController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\CountryFunctionalitiesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::resource('posts', PostController::class);
Route::get('/settings', [UserController::class, 'index'])->middleware(['auth', 'verified'])->name("users.get");

Route::get('/test', [TripController::class, 'index'])->middleware(['auth', 'verified'])->name("trips.get");
Route::get('/safety', [CountryFunctionalitiesController::class, 'getSafetyPage'])->middleware(['auth', 'verified'])->name("country.safety");
Route::get('/add-trip', [TripController::class, 'createOld'])->middleware(['auth', 'verified'])->name("add.trip.form");
Route::get('/best-attractions', [TripController::class, 'showInterestPoints'])->middleware(['auth', 'verified'])->name("best.attractions");
Route::get('/flight-price', [TripController::class, 'showFlightPrice'])->middleware(['auth', 'verified'])->name("best.attractions");
Route::get('/view-trips', [TripController::class, 'view'])->middleware(['auth', 'verified'])->name("view.trips");
Route::get('/test2', [TripController::class, 'createNew'])->middleware(['auth', 'verified'])->name("add.trip");


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name("welcome");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('api')->group(function () {
    Route::post('change-password', [ChangePasswordController::class, 'store'])->name('change.password');
    Route::post('update-user', [UserController::class, 'update'])->name('update.user');
    Route::get('/safety/{id}', [CountryFunctionalitiesController::class, 'getCountryCitiesList']);
    Route::get('/iata-codes/{id}', [CountryFunctionalitiesController::class, 'getCountryIataCodes']);
    Route::post('/safety-results', [CountryFunctionalitiesController::class, 'getSafetyForCity'])->name("city.safety");
    Route::post('/add-trip', [TripController::class, 'store'])->name("trip.add");
    Route::put('/modify-trip/{id}', [TripController::class, 'update'])->name("trip.modify");
    Route::delete('/delete-trip/{id}', [TripController::class, 'destroy'])->name("trip.delete");
});


Route::controller(GoogleController::class)->group(function(){
    Route::get('auth/google', 'redirectToGoogle')->name('auth.google');
    Route::get('auth/google/callback', 'handleGoogleCallback');
});

require __DIR__.'/auth.php';
