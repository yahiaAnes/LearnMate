import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface User {
    id: number;
    name: string;
    email: string;
    profile_image?: string;
}

interface Collab {
    id: number;
    type: string;
    subject: string;
    description: string;
    status: 'pending' | 'accepted' | 'rejected';
    created_at: string;
    creator: User;
    partner: User;
}

interface Props {
    collabs: Collab[];
}

export default function Index({ collabs }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'accepted':
                return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
            case 'rejected':
                return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
            default:
                return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-200 leading-tight">My Collaborations</h2>}
        >
            <Head title="My Collaborations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-gray-200">All Collaborations</CardTitle>
                            <CardDescription className="text-gray-400">
                                View and manage your collaborations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {collabs.map((collab) => (
                                    <Card key={collab.id} className="bg-gray-700/50 border-gray-600">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <Avatar>
                                                        <AvatarImage src={collab.creator.profile_image} />
                                                        <AvatarFallback>
                                                            {collab.creator.name.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="text-gray-200 font-medium">{collab.subject}</h3>
                                                        <p className="text-sm text-gray-400">
                                                            {collab.type.replace('_', ' ').charAt(0).toUpperCase() + collab.type.slice(1)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge className={getStatusColor(collab.status)}>
                                                    {collab.status.charAt(0).toUpperCase() + collab.status.slice(1)}
                                                </Badge>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-400 line-clamp-2">{collab.description}</p>
                                            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                                <span>Created {formatDistanceToNow(new Date(collab.created_at))} ago</span>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                                            View Details
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="bg-gray-800 border-gray-700">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-gray-200">{collab.subject}</DialogTitle>
                                                            <DialogDescription className="text-gray-400">
                                                                {collab.type.replace('_', ' ').charAt(0).toUpperCase() + collab.type.slice(1)}
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-300">Description</h4>
                                                                <p className="mt-1 text-sm text-gray-400">{collab.description}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-300">Status</h4>
                                                                <Badge className={`mt-1 ${getStatusColor(collab.status)}`}>
                                                                    {collab.status.charAt(0).toUpperCase() + collab.status.slice(1)}
                                                                </Badge>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-300">Created</h4>
                                                                <p className="mt-1 text-sm text-gray-400">
                                                                    {new Date(collab.created_at).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 