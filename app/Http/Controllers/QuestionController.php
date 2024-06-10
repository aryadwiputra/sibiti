<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Exam $exam)
    {
        //render with inertia
        return Inertia::render('Dashboard/Questions/Create', [
            'exam' => $exam,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Exam $exam)
    {
        //validate request
        $request->validate([
            'question' => 'required',
            'option_1' => 'required',
            'option_2' => 'required',
            'option_3' => 'required',
            'option_4' => 'required',
            'option_5' => 'required',
            'answer' => 'required',
        ]);

        //create question
        Question::create([
            'exam_id' => $exam->id,
            'question' => $request->question,
            'option_1' => $request->option_1,
            'option_2' => $request->option_2,
            'option_3' => $request->option_3,
            'option_4' => $request->option_4,
            'option_5' => $request->option_5,
            'answer' => $request->answer,
        ]);

        return to_route('exams.show', $exam);
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
    public function edit(Exam $exam, Question $question)
    {
        //render with inertia
        return Inertia::render('Dashboard/Questions/Edit', [
            'exam' => $exam,
            'question' => $question,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam, Question $question)
    {

        //validate request
        $request->validate([
            'question' => 'required',
            'option_1' => 'required',
            'option_2' => 'required',
            'option_3' => 'required',
            'option_4' => 'required',
            'option_5' => 'required',
            'answer' => 'required',
        ]);

        //update question
        $question->update([
            'question' => $request->question,
            'option_1' => $request->option_1,
            'option_2' => $request->option_2,
            'option_3' => $request->option_3,
            'option_4' => $request->option_4,
            'option_5' => $request->option_5,
            'answer' => $request->answer,
        ]);

        return to_route('exams.show', $exam);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam, Question $question)
    {
        $question->forceDelete();

        return back();
    }
}
