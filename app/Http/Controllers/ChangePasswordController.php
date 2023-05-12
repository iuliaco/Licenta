<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Providers\RouteServiceProvider;

class ChangePasswordController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user(); 
        $request->validate([
            'old_password' => ['required', function ($attribute, $value, $fail) use ($user) {
                if (!Hash::check($value, $user->password)) {
                    $fail(__('The current password is incorrect.'));
                }
            }],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->password = Hash::make($request->input('password'));
        $user->save();

        return redirect(RouteServiceProvider::HOME);
    }
}
