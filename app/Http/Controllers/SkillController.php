<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'level' => 'required|string|in:Beginner,Intermediate,Advanced,Expert',
        ]);

        $skill = Skill::create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        return back()->with('success', 'Skill added successfully');
    }

    public function destroy($id)
    {
        $skill = Skill::where('user_id', auth()->id())->findOrFail($id);
        $skill->delete();

        return back()->with('success', 'Skill deleted successfully');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'level' => 'required|string|in:Beginner,Intermediate,Advanced,Expert',
        ]);

        $skill = Skill::where('user_id', auth()->id())->findOrFail($id);
        $skill->update($request->all());

        return back()->with('success', 'Skill updated successfully.');
    }
} 