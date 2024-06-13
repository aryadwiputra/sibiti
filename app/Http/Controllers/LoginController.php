<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        //validate the form data
        $request->validate([
            'nisn' => 'required',
            'password' => 'required'
        ]);

        //cek nisn dan password
        $student = Student::where([
            'nisn' => $request->nisn,
            'password' => $request->password
        ])->first();

        if (!$student) {
            return back()->with('error', 'NISN atau Password salah');
        }

        auth()->guard('student')->login($student);


        //redirect to dashboard
        return redirect()->route('student.dashboard');
    }
}
