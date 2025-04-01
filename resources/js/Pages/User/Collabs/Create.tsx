import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';

interface User {
    id: number;
    name: string;
    email: string;
    profile_image?: string;
}

interface Props {
    users: User[];
}

export default function Create({ users }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        type: '',
        subject: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('collabs.store'), {
            onSuccess: () => {
                reset();
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-200 leading-tight">Create Collaboration</h2>}
        >
            <Head title="Create Collaboration" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-gray-200">Create New Collaboration</CardTitle>
                            <CardDescription className="text-gray-400">
                                Start a new collaboration with another user
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="type" className="text-gray-300">Collaboration Type</Label>
                                        <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                            <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                <SelectItem value="teach" className="text-gray-300 hover:bg-gray-700">Teach</SelectItem>
                                                <SelectItem value="learn" className="text-gray-300 hover:bg-gray-700">Learn</SelectItem>
                                                <SelectItem value="study_group" className="text-gray-300 hover:bg-gray-700">Study Group</SelectItem>
                                                <SelectItem value="project" className="text-gray-300 hover:bg-gray-700">Project</SelectItem>
                                                <SelectItem value="mentorship" className="text-gray-300 hover:bg-gray-700">Mentorship</SelectItem>
                                                <SelectItem value="research" className="text-gray-300 hover:bg-gray-700">Research</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && <div className="text-red-500 text-sm">{errors.type}</div>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                                        <Input
                                            id="subject"
                                            value={data.subject}
                                            onChange={e => setData('subject', e.target.value)}
                                            className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                                            placeholder="e.g., Computer Science, Mathematics"
                                            required
                                        />
                                        {errors.subject && <div className="text-red-500 text-sm">{errors.subject}</div>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-gray-300">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                                        className="min-h-32 bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                                        placeholder="Describe your collaboration proposal..."
                                        required
                                    />
                                    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        Send Collaboration Request
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
