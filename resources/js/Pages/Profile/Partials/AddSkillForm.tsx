import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { Textarea } from '@/Components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { X, Pencil } from 'lucide-react';

interface Skill {
    id: number;
    name: string;
    description: string;
    level: string;
}

interface AddSkillFormProps {
    className?: string;
    skills: Skill[];
}

export default function AddSkillForm({ className = '', skills }: AddSkillFormProps) {
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const { data, setData, post, processing, errors, reset, delete: destroy, put } = useForm({
        name: '',
        description: '',
        level: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingSkill) {
            put(route('skills.update', { id: editingSkill.id }), {
                onSuccess: () => {
                    reset();
                    setEditingSkill(null);
                },
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            post(route('skills.store'), {
                onSuccess: () => reset(),
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    const handleDelete = (skillId: number) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            destroy(route('skills.destroy', { id: skillId }), {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    const handleEdit = (skill: Skill) => {
        setEditingSkill(skill);
        setData({
            name: skill.name,
            description: skill.description,
            level: skill.level,
        });
    };

    return (
        <Card className="bg-transparent border-0">
            <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-xl font-bold text-white">Skills</CardTitle>
                <CardDescription className="text-gray-400">
                    Add and manage your skills
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-300">Skill Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                                required
                            />
                            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="level" className="text-gray-300">Level</Label>
                            <Select value={data.level} onValueChange={(value) => setData('level', value)}>
                                <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500">
                                    <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    <SelectItem value="Beginner" className="text-gray-300 hover:bg-gray-700">Beginner</SelectItem>
                                    <SelectItem value="Intermediate" className="text-gray-300 hover:bg-gray-700">Intermediate</SelectItem>
                                    <SelectItem value="Advanced" className="text-gray-300 hover:bg-gray-700">Advanced</SelectItem>
                                    <SelectItem value="Expert" className="text-gray-300 hover:bg-gray-700">Expert</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.level && <div className="text-red-500 text-sm">{errors.level}</div>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-gray-300">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                            placeholder="Brief description of your expertise in this skill"
                        />
                        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        {editingSkill ? 'Update Skill' : 'Add Skill'}
                    </Button>
                </form>

                {/* Skills List */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Your Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <div key={skill.id} className="group relative">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Badge 
                                            variant="secondary" 
                                            className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-4 py-1 text-sm cursor-pointer"
                                        >
                                            {skill.name}
                                            <span className="ml-2 text-xs text-gray-400">({skill.level})</span>
                                        </Badge>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-800 border-gray-700">
                                        <DialogHeader>
                                            <DialogTitle className="text-white">{skill.name}</DialogTitle>
                                            <DialogDescription className="text-gray-400">
                                                Level: {skill.level}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="mt-4">
                                            <p className="text-gray-300">{skill.description || 'No description available'}</p>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button
                                        onClick={() => handleEdit(skill)}
                                        className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600"
                                    >
                                        <Pencil size={12} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(skill.id)}
                                        className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 