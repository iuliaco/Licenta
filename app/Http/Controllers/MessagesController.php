<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Chat;
use Illuminate\Support\Arr;
use Inertia\Inertia;


class MessagesController extends Controller
{
    //

    public function conversations(Request $request) {
        $conversations = Chat::conversations(Chat::conversations()->conversation)
          ->setParticipant(auth()->user())
          ->get()
          ->toArray()['data'];

        $conversations = Arr::pluck($conversations, 'conversation_id');
        $data = [
            'conversations' => array_map('intval', $conversations),
            'participant' => [
                'id' => auth()->user()->id,
                'type' => get_class(auth()->user())
            ]
        ];

        return Inertia::render('Messages/View', ['conversations' => $data]);
        
    }

    public function conversation(Request $request, int $id) {

        $otherUser = \App\Models\User::findorFail($id);
        $participants = [$otherUser, auth()->user()];
        $conversation = Chat::conversations()->between(auth()->user(), $otherUser);
        if($conversation == null)
            $conversation = Chat::makeDirect()->createConversation($participants);

        $conversations = Chat::conversations(Chat::conversations()->conversation)
          ->setParticipant(auth()->user())
          ->get()
          ->toArray()['data'];
        $conversations = Arr::pluck($conversations, 'conversation_id');
        
        // dd(Chat::conversation($conversation)->setParticipant($otherUser)->getMessages());
        $data = [
            'conversations' => array_map('intval', $conversations),
            'participant' => [
                'id' => auth()->user()->id,
                'type' => get_class(auth()->user())
            ],
            'principal_conversation' => $conversation->id
        ];
        // dd($data);

        return Inertia::render('Messages/View', ['conversations' => $data]);
        
    }

    
}
