<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthStudent
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //check if user is logged in
        $student = auth()->guard('student')->user();

        //if not, redirect to login page
        if (!$student) {
            return redirect('/');
        }

        //if user is logged in, continue to next middleware
        return $next($request);
    }
}
