<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel; 

class User extends Authenticatable implements MustVerifyEmail , FilamentUser
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'university',
        'bio',
        'level',
        'speciality',
        'profile_image',
        'email_verified_at',
        'google_id',
    ];


    public function canAccessPanel(Panel $panel): bool
    {
        //return $this->email === 'sbahiyahia19@gmail.com' && $this->hasVerifiedEmail();
        // You can customize the logic to determine which user can access the Filament admin panel
        // You can also add roles or permissions to the User model and check them here
        return $this->hasVerifiedEmail();
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function skills()
    {
        return $this->hasMany(Skill::class);
    }

    public function requestSessions()
    {
        return $this->hasMany(RequestSession::class);
    }

    public function createdCollabs()
    {
        return $this->hasMany(Collab::class, 'creator_id');
    }

    public function partnerCollabs()
    {
        return $this->hasMany(Collab::class, 'partner_id');
    }

    public function getCollabsAttribute()
    {
        return $this->createdCollabs->merge($this->partnerCollabs);
    }
}
