<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class Course extends Model
{
    use HasFactory;
    
    protected $fillable = ['title', 'description', 'image', 'price', 'duration', 'level', 'speciality', 'date'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }
        
        try {
            // Check if the image exists in storage
            if (Storage::disk('public')->exists('CourseImages/' . $this->image)) {
                return asset('storage/CourseImages/' . $this->image);
            }
            
            // If not found in storage, return a default image
            return 'https://ui-avatars.com/api/?name=' . urlencode($this->title);
        } catch (\Exception $e) {
            // Log the error and return a default image
            \Log::error('Error getting image URL: ' . $e->getMessage());
            return 'https://ui-avatars.com/api/?name=' . urlencode($this->title);
        }
    }
}
