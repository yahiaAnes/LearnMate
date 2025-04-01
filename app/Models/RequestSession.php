<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RequestSession extends Model
{
    
    use HasFactory;
    
    protected $fillable = [
        'subject',
        'description',
        'status',
        'comment',
        'review',
        'time',
        'user_id',
        'partner_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function partner()
    {
        return $this->belongsTo(User::class, 'partner_id');
    }
}
