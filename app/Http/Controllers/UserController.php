<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Country;
use App\Providers\RouteServiceProvider;
use Illuminate\Validation\Rule;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        //
        $user = Auth::user();
        $countries = Country::get();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->append('originCountryName');

        // return response()->json($user);
        return Inertia::render('Settings', ['user' => $user, 'countries' => $countries]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'surname' => 'required|string|max:50',
            'username' => ['required','string','max:30', Rule::unique('users')->ignore(auth()->id())],
            'origin_country_id' => 'required|integer',

        ]);
        $user = User::find(Auth::user()->id);
        $user->fill($request->all());
        $user->save();
        return redirect(RouteServiceProvider::HOME);

    }

        /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|file|mimes:jpeg,png|max:2048',
        ]);
        
        $avatarName = auth()->user()->id.'_avatar'.time().'.'.request()->avatar->getClientOriginalExtension();
        $user = User::find(Auth::user()->id);
        $user-> profile_photo_url = $avatarName;
        $user->save();
        $request->avatar->storeAs('public/avatars',$avatarName);

        return redirect(RouteServiceProvider::HOME);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
