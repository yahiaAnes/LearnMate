<?php

namespace App\Policies;

use App\Models\Collab;
use App\Models\User;

class CollabPolicy
{
    public function view(User $user, Collab $collab): bool
    {
        return $user->id === $collab->creator_id || $user->id === $collab->partner_id;
    }

    public function update(User $user, Collab $collab): bool
    {
        return $user->id === $collab->partner_id;
    }

    public function delete(User $user, Collab $collab): bool
    {
        return $user->id === $collab->creator_id;
    }
} 