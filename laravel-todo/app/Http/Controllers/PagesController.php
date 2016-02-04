<?php

namespace App\Http\Controllers;


use App\Http\Requests;

use Illuminate\Support\Facades\Auth;

class PagesController extends Controller
{


    public function home(){
        $username="";
        if (Auth::check())
        {

            $username = Auth::user()->username;
        }
        return view('pages.home')->with('username',$username);
    }
}
