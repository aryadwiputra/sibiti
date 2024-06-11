<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Exam;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // Total Exam
        $exams = Exam::query()->with('classroom', 'lesson')->count();

        // Total Students
        $students = Student::query()->count();

        // Total Users
        $users = User::query()->count();

        // Total Classrooms
        $classrooms = Classroom::query()->count();

        return Inertia::render('Dashboard/Index', [
            'exams' => $exams,
            'students' => $students,
            'users' => $users,
            'classrooms' => $classrooms
        ]);
    }
}
