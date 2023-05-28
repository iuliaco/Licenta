<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
class FileController extends Controller
{
    public function show($filename)
    {
        $path = storage_path('app/' . $filename);

        // Check if the file exists
        if (!Storage::exists($path)) {
            abort(404);
        }

        // Return the file as a response
        return response()->file($path,['Content-type' => 'image/jpeg']);
    }
}

