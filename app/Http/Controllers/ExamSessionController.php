<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\ExamSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamSessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get exam_sessions
        $exam_sessions = ExamSession::when(request()->q, function ($exam_sessions) {
            $exam_sessions = $exam_sessions->where('title', 'like', '%' . request()->q . '%');
        })->with('exam.classroom', 'exam.lesson', 'exam_groups')->latest()->paginate(5);

        //append query string to pagination links
        $exam_sessions->appends(['q' => request()->q]);

        //render with inertia
        return Inertia::render('Dashboard/ExamSessions/Index', [
            'exam_sessions' => $exam_sessions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //get exams
        $exams = Exam::all();

        //render with inertia
        return Inertia::render('Dashboard/ExamSessions/Create', [
            'exams' => $exams,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate request
        $request->validate([
            'title' => 'required',
            'exam_id' => 'required',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        //create exam_session
        ExamSession::create([
            'title' => $request->title,
            'exam_id' => $request->exam_id,
            'start_time' => date('Y-m-d H:i:s', strtotime($request->start_time)),
            'end_time' => date('Y-m-d H:i:s', strtotime($request->end_time)),
        ]);

        //redirect
        return to_route('exam_sessions.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //get exam_session
        $exam_session = ExamSession::with('exam.classroom', 'exam.lesson')->findOrFail($id);

        //get relation exam_groups with pagination
        $exam_session->setRelation('exam_groups', $exam_session->exam_groups()->with('student.classroom')->paginate(5));

        //render with inertia
        return Inertia::render('Dashboard/ExamSessions/Show', [
            'exam_session' => $exam_session,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //get exam_session
        $exam_session = ExamSession::findOrFail($id);

        //get exams
        $exams = Exam::all();

        //render with inertia
        return Inertia::render('Admin/ExamSessions/Edit', [
            'exam_session' => $exam_session,
            'exams' => $exams,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExamSession $exam_session)
    {
        //validate request
        $request->validate([
            'title' => 'required',
            'exam_id' => 'required',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        //update exam_session
        $exam_session->update([
            'title' => $request->title,
            'exam_id' => $request->exam_id,
            'start_time' => date('Y-m-d H:i:s', strtotime($request->start_time)),
            'end_time' => date('Y-m-d H:i:s', strtotime($request->end_time)),
        ]);

        //redirect
        return to_route('exam_sessions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //get exam_session
        $exam_session = ExamSession::findOrFail($id);

        //delete exam_session
        $exam_session->delete();

        //redirect
        return back();
    }
}
