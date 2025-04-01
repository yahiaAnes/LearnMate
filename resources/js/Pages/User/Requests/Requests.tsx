import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Search, Filter, Users, Calendar, Clock, MessageSquare, BookOpen, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface User {
    id: number;
    name: string;
    email: string;
    profile_image: string | null;
    speciality: string;
    level: string;
    bio: string;
}

interface Request {
    id: number;
    subject: string;
    description: string;
    time: string;
    status: string;
    created_at: string;
    user_id: number;
    partner_id: number;
    partner?: User;
    user?: User;
}

const requestStatuses = {
    pending: 'Pending',
    accepted: 'Accepted',
    rejected: 'Rejected',
    completed: 'Completed',
    cancelled: 'Cancelled'
};

export default function Requests() {
    const { requests = [], auth } = usePage().props as unknown as { requests: Request[]; auth: { user: User } };
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const filteredRequests = useMemo(() => {
        let filtered = [...requests];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(request => 
                request.subject.toLowerCase().includes(query) ||
                request.description.toLowerCase().includes(query) ||
                (request.partner?.name || '').toLowerCase().includes(query) 
            );
        }

        // Status filter
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(request => 
                request.status === selectedStatus
            );
        }

        return filtered;
    }, [requests, searchQuery, selectedStatus]);

    const handleAccept = (requestId: number) => {
        router.post(route('requests.accept', requestId), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Optionally show a success message
            },
        });
    };

    const handleReject = (requestId: number) => {
        router.post(route('requests.reject', requestId), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Optionally show a success message
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-300">
                    Session Requests
                </h2>
            }
        >
            <Head title="Session Requests" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Search and Filters */}
                    <div className="bg-gray-800/50 backdrop-blur-md p-6 shadow-2xl sm:rounded-lg border border-gray-700 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <Input
                                        placeholder="Search requests..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                    <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-700">
                                        <SelectItem value="all" className="text-gray-300 hover:bg-gray-700">
                                            All Statuses
                                        </SelectItem>
                                        {Object.entries(requestStatuses).map(([key, value]) => (
                                            <SelectItem key={key} value={key} className="text-gray-300 hover:bg-gray-700">
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Requests Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((request) => (
                                <Card key={request.id} className="bg-gray-800/50 backdrop-blur-md border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <Badge variant="secondary" className={`${
                                                request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                                request.status === 'accepted' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                                request.status === 'rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                                request.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                                'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                            }`}>
                                                {requestStatuses[request.status as keyof typeof requestStatuses]}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-white mt-4">{request.subject}</CardTitle>
                                        <CardDescription className="text-gray-400">
                                            {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <p className="text-gray-300 text-sm">{request.description}</p>
                                            
                                            <div className="flex items-center space-x-2">
                                                <Clock className="text-blue-400" size={16} />
                                                <span className="text-gray-300">
                                                    {new Date(request.time).toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="flex items-center space-x-4 pt-4">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarImage src={request.partner?.profile_image || undefined} />
                                                    <AvatarFallback className="bg-gray-700 text-gray-300">
                                                        {(request.partner?.name || 'Unknown').charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm text-gray-300">From: {request.partner?.name || 'Unknown User'}</p>
                                                    <p className="text-xs text-gray-400">{request.partner?.speciality || 'No speciality'}</p>
                                                </div>
                                            </div>

                                          

                                            <div className="flex justify-end space-x-2 pt-4">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-700">
                                                            View Details
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="bg-gray-800 border-gray-700">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-white">{request.subject}</DialogTitle>
                                                            <DialogDescription className="text-gray-400">
                                                                {request.description}
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4">
                                                            <div className="flex items-center space-x-2">
                                                                <Users className="text-blue-400" size={16} />
                                                                <span className="text-gray-300">Status: {requestStatuses[request.status as keyof typeof requestStatuses]}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <Calendar className="text-green-400" size={16} />
                                                                <span className="text-gray-300">Created: {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <Clock className="text-yellow-400" size={16} />
                                                                <span className="text-gray-300">Scheduled: {new Date(request.time).toLocaleString()}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <BookOpen className="text-purple-400" size={16} />
                                                                <span className="text-gray-300">Subject: {request.subject || 'No subject'}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <FileText className="text-indigo-400" size={16} />
                                                                <span className="text-gray-300">Description: {request.description || 'No description'}</span>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                                {request.status === 'pending' && request.user?.id === auth.user.id && (
                                                    <>
                                                        <Button 
                                                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                                            onClick={() => handleAccept(request.id)}
                                                        >
                                                            Accept
                                                        </Button>
                                                        <Button 
                                                            className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                                            onClick={() => handleReject(request.id)}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <Users className="w-12 h-12 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-white mb-2">No Requests Found</h3>
                                    <p className="text-gray-400">You don't have any session requests at the moment.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
