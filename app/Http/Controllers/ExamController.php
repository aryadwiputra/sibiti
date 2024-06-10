<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Classroom;
use App\Models\Exam;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get exams
        $exams = Exam::when(request()->search, function ($exams) {
            $exams = $exams->where('title', 'like', '%' . request()->search . '%');
        })->with('lesson', 'classroom', 'questions')->latest()->paginate(5);

        //append query string to pagination links
        $exams->appends(['q' => request()->search]);

        $lessons = Lesson::all();

        $classrooms = Classroom::all();

        //render with inertia
        return Inertia::render('Dashboard/Exams/Index', [
            'exams' => $exams,
            'lessons' => $lessons,
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
            'title' => 'required',
            'lesson_id' => 'required|integer',
            'classroom_id' => 'required|integer',
            'duration' => 'required|integer',
            'description' => 'required',
            'random_question' => 'required',
            'random_answer' => 'required',
            'show_answer' => 'required',
        ]);

        //create exam
        Exam::create([
            'title' => $request->title,
            'lesson_id' => $request->lesson_id,
            'classroom_id' => $request->classroom_id,
            'duration' => $request->duration,
            'description' => $request->description,
            'random_question' => $request->random_question,
            'random_answer' => $request->random_answer,
            'show_answer' => $request->show_answer,
        ]);

        //redirect
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //get exam
        $exam = Exam::with('lesson', 'classroom')->findOrFail($id);

        //get relation questions with pagination
        $exam->setRelation('questions', $exam->questions()->paginate(5));

        //render with inertia
        return Inertia::render('Dashboard/Exams/Show', [
            'exam' => $exam,
        ]);
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
    public function update(Request $request, Exam $exam)
    {
        //validate request
        $request->validate([
            'title' => 'required',
            'lesson_id' => 'required|integer',
            'classroom_id' => 'required|integer',
            'duration' => 'required|integer',
            'description' => 'required',
            'random_question' => 'required',
            'random_answer' => 'required',
            'show_answer' => 'required',
        ]);

        //update exam
        $exam->update([
            'title' => $request->title,
            'lesson_id' => $request->lesson_id,
            'classroom_id' => $request->classroom_id,
            'duration' => $request->duration,
            'description' => $request->description,
            'random_question' => $request->random_question,
            'random_answer' => $request->random_answer,
            'show_answer' => $request->show_answer,
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //get exam
        $exam = Exam::findOrFail($id);

        //delete exam
        $exam->forceDelete();

        //redirect
        return back();
    }
}
