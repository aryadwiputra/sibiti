<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExamSession extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'exam_id',
        'title',
        'start_time',
        'end_time',
    ];

    /**
     * exam_groups
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function exam_groups()
    {
        return $this->hasMany(ExamGroup::class);
    }

    /**
     * exam
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
