<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Chat;
use Illuminate\Support\Arr;

class CommentController extends Controller
{


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function conversations() {
        $conversations = Chat::conversations(Chat::conversations()->conversation)
          ->setParticipant(auth()->user())
          ->get()
          ->toArray()['data'];

        $conversations = Arr::pluck($conversations, 'conversation_id');
        dd($conversations);
    }
}
