<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'add-task',
        'update-task',
        'complete-task',
        'favorite-task',
        'delete-all',
        'delete-selected',
        'delete',
        'register',
        'login',
        'logout',
        'check'


    ];
}
