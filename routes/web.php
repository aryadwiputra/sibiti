<?php

use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ExamGroupController;
use App\Http\Controllers\ExamSessionController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard/Index');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(['prefix' => 'dashboard', 'middleware' => ['auth']], function () {
    // dashboard route
    Route::get('/', DashboardController::class)->name('dashboard');
    // permissions route
    Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions.index');
    // roles route
    Route::resource('/roles', RoleController::class)->except(['create', 'edit', 'show']);
    // users route
    Route::resource('/users', UserController::class)->except('show');


    // Features
    Route::resource('classrooms', ClassroomController::class);
    Route::resource('students', StudentController::class);
    Route::resource('lessons', LessonController::class);
    Route::resource('exams', ExamController::class);

    //custom route for create question exam
    Route::get('/exams/{exam}/questions/create', [QuestionController::class, 'create'])->name('exams.questions.create');
    //custom route for store question exam
    Route::post('/exams/{exam}/questions/store', [QuestionController::class, 'store'])->name('exams.questions.store');
    //custom route for edit question exam
    Route::get('/exams/{exam}/questions/{question}/edit', [QuestionController::class, 'edit'])->name('exams.questions.edit');
    //custom route for update question exam
    Route::put('/exams/{exam}/questions/{question}/update', [QuestionController::class, 'update'])->name('exams.questions.update');
    //custom route for destroy question exam
    Route::delete('/exams/{exam}/questions/{question}/destroy', [QuestionController::class, 'destroy'])->name('exams.questions.destroy');

    //route resource exam_sessions
    Route::resource('/exam_sessions', ExamSessionController::class);

    //custom route for enrolle create
    Route::get('/exam_sessions/{exam_session}/group/create', [ExamGroupController::class, 'create'])->name('exam_sessions.group.create');
    //custom route for enrolle store
    Route::post('/exam_sessions/{exam_session}/group/store', [ExamGroupController::class, 'store'])->name('exam_sessions.group.store');
    //custom route for enrolle destroy
    Route::delete('/exam_sessions/{exam_session}/group/{exam_group}/destroy', [ExamGroupController::class, 'destroy'])->name('exam_sessions.group.destroy');


    //route index reports
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');

    //route index reports filter
    Route::get('/reports/filter', [ReportController::class, 'filter'])->name('reports.filter');

});

require __DIR__ . '/auth.php';
