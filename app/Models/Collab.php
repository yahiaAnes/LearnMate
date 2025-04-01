<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Collab extends Model
{
    use HasFactory;
    protected $fillable = [
        'creator_id',
        'partner_id',
        'status',
        'type',
        'subject',
        'description',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function partner()
    {
        return $this->belongsTo(User::class, 'partner_id');
    }
}
