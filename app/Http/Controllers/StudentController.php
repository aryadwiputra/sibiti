<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get students
        $students = Student::query()->when(request()->search, function ($students) {
            $students = $students->where('name', 'like', '%' . request()->search . '%')->orWhere('nisn', 'like', '%' . request()->search . '%');
        })->with('classroom')->latest()->paginate(5);

        $classrooms = Classroom::all();

        //append query string to pagination links
        $students->appends(['q' => request()->search]);

        //render with inertia
        return Inertia::render('Dashboard/Students/Index', [
            'students' => $students,
            'classrooms' => $classrooms
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate request
        $request->validate([
            'name' => 'required|string|max:255',
            'nisn' => 'required|unique:students',
            'gender' => 'required|string',
            'password' => 'required',
            'classroom_id' => 'required'
        ]);

        //create student
        Student::create([
            'name' => $request->name,
            'nisn' => $request->nisn,
            'gender' => $request->gender,
            'password' => $request->password,
            'classroom_id' => $request->classroom_id
        ]);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        //validate request
        $request->validate([
            'name' => 'required|string|max:255',
            'nisn' => 'required|unique:students,nisn,' . $student->id,
            'gender' => 'required|string',
            'classroom_id' => 'required',
            'password' => ''
        ]);

        //check passwordy
        if ($request->password == "") {

            //update student without password
            $student->update([
                'name' => $request->name,
                'nisn' => $request->nisn,
                'gender' => $request->gender,
                'classroom_id' => $request->classroom_id
            ]);
        } else {

            //update student with password
            $student->update([
                'name' => $request->name,
                'nisn' => $request->nisn,
                'gender' => $request->gender,
                'password' => $request->password,
                'classroom_id' => $request->classroom_id
            ]);
        }

        //redirect
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //get student
        $student = Student::findOrFail($id);

        //delete student
        $student->forceDelete();

        //redirect
        return back();
    }
}
