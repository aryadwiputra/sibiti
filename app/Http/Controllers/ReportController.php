<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Exam;
use App\Models\Grade;
use App\Models\ExamSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        //geta ll exams
        $exams = Exam::with('lesson', 'classroom')->get();

        return Inertia::render('Dashboard/Reports/Index', [
            'exams' => $exams,
            'grades' => []
        ]);
    }

    /**
     * filter
     *
     * @param  mixed $request
     * @return void
     */
    public function filter(Request $request)
    {
        $this->validate($request, [
            'exam_id' => 'required',
        ]);

        //geta ll exams
        $exams = Exam::with('lesson', 'classroom')->get();

        //get exam
        $exam = Exam::with('lesson', 'classroom')
            ->where('id', $request->exam_id)
            ->first();

        if ($exam) {

            //get exam session
            $exam_session = ExamSession::where('exam_id', $exam->id)->first();

            //get grades / nilai
            $grades = Grade::with('student', 'exam.classroom', 'exam.lesson', 'exam_session')
                ->where('exam_id', $exam->id)
                ->where('exam_session_id', $exam_session->id)
                ->get();

        } else {
            $grades = [];
        }

        return Inertia::render('Dashboard/Reports/Index', [
            'exams' => $exams,
            'grades' => $grades,
        ]);
    }
}
