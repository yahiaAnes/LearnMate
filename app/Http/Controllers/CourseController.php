<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::all()->map(function ($course) {
            return [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'image' => $course->image,
                'price' => $course->price,
                'duration' => $course->duration,
                'level' => $course->level,
                'speciality' => $course->speciality,
                'date' => $course->date,
                'image_url' => $course->image_url,
            ];
        });

        return Inertia::render('User/Courses/Courses', [
            'courses' => $courses,
        ]);
    }

    public function show(Course $course)
    {
        return Inertia::render('User/Courses/CourseDetails', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'long_description' => $course->long_description,
                'image' => $course->image,
                'price' => $course->price,
                'duration' => $course->duration,
                'level' => $course->level,
                'speciality' => $course->speciality,
                'date' => $course->date,
                'image_url' => $course->image_url,
                'requirements' => $course->requirements,
                'objectives' => $course->objectives,
                'instructor' => $course->instructor ? [
                    'name' => $course->instructor->name,
                    'bio' => $course->instructor->bio,
                    'avatar' => $course->instructor->avatar,
                ] : null,
            ],
        ]);
    }
} 