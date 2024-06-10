<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get classrooms
        $classrooms = Classroom::query()->when(request()->search, function ($classrooms) {
            $classrooms = $classrooms->where('title', 'like', '%' . request()->search . '%');
        })->orderBy('title', 'ASC')->latest()->paginate(5)->withQueryString();

        //append query string to pagination links
        $classrooms->appends([request()->all]);

        //render with inertia
        return Inertia::render('Dashboard/Classrooms/Index', [
            'classrooms' => $classrooms,
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
            'title' => 'required|string|unique:classrooms'
        ], [
            'title.required' => 'Kolom kelas harus diisi!',
            'title.unique' => 'Kelas sudah ada!',
        ]);

        //create classroom
        Classroom::create([
            'title' => $request->title,
        ]);

        //redirect
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
    public function update(Request $request, Classroom $classroom)
    {
        //validate request
        $request->validate([
            'title' => 'required|string|unique:classrooms,title,' . $classroom->id,
        ]);

        //update classroom
        $classroom->update([
            'title' => $request->title,
        ]);

        //redirect
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //get classroom
        $classroom = Classroom::findOrFail($id);

        //delete classroom
        $classroom->forceDelete();

        //redirect
        return back();
    }
}
