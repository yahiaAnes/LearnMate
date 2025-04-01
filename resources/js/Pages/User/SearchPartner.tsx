import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Star, Clock, BookOpen, MessageSquare, Filter, Search, Users, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

interface User {
    id: number;
    name: string;
    email: string;
    profile_image: string | null;
    speciality: string;
    level: string;
    bio: string;
}

interface Collab {
    id: number;
    type: string;
    subject: string;
    description: string;
    status: string;
    created_at: string;
    creator: User;
    partner: User;
}

interface Request {
    id: number;
    subject: string;
    description: string;
    time: string;
    user_id: number;
}
const subjects = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Engineering',
];

const experienceLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert',
];

const sortOptions = [
    'Relevance',
    'Name',
    'Level',
];

const collabTypes = {
    study_group: 'Study Group',
    project: 'Project',
    mentorship: 'Mentorship',
    research: 'Research',
    learn: 'Learn',
    teach: 'Teach',
};

export default function SearchPartner() {
    const { users = [], collabs = [], auth } = usePage().props as unknown as { users: User[]; collabs: Collab[]; auth: { user: any } };
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [sortBy, setSortBy] = useState('Relevance');
    const [activeTab, setActiveTab] = useState<'partners' | 'collabs'>('partners');
    const [collabSearchQuery, setCollabSearchQuery] = useState('');
    const [selectedCollabType, setSelectedCollabType] = useState('all');
    const [selectedCollabStatus, setSelectedCollabStatus] = useState('all');
    const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
   

    

    const filteredUsers = useMemo(() => {
        let filtered = [...users];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(user => 
                user.name.toLowerCase().includes(query) ||
                user.speciality.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
            );
        }

        // Subject filter
        if (selectedSubject) {
            filtered = filtered.filter(user => 
                user.speciality === selectedSubject
            );
        }

        // Level filter
        if (selectedLevel) {
            filtered = filtered.filter(user => 
                user.level === selectedLevel
            );
        }

        // Sorting
        switch (sortBy) {
            case 'Name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Level':
                filtered.sort((a, b) => a.level.localeCompare(b.level));
                break;
            default:
                // Relevance sorting (default)
                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    filtered.sort((a, b) => {
                        const aMatch = a.name.toLowerCase().includes(query) ? 0 : 1;
                        const bMatch = b.name.toLowerCase().includes(query) ? 0 : 1;
                        return aMatch - bMatch;
                    });
                }
        }

        return filtered;
    }, [users, searchQuery, selectedSubject, selectedLevel, sortBy]);

    const filteredCollabs = useMemo(() => {
        let filtered = [...collabs];

        // Search filter
        if (collabSearchQuery) {
            const query = collabSearchQuery.toLowerCase();
            filtered = filtered.filter(collab => 
                collab.subject.toLowerCase().includes(query) ||
                collab.description.toLowerCase().includes(query) ||
                collab.creator.name.toLowerCase().includes(query) 
            );
        }

        // Type filter
        if (selectedCollabType !== 'all') {
            filtered = filtered.filter(collab => 
                collab.type === selectedCollabType
            );
        }

        // Status filter
        if (selectedCollabStatus !== 'all') {
            filtered = filtered.filter(collab => 
                collab.status === selectedCollabStatus
            );
        }

        return filtered;
    }, [collabs, collabSearchQuery, selectedCollabType, selectedCollabStatus]);

    // Handle request session
    const handleRequestSession = (userId: number) => {
        setSelectedUserId(userId);
        setIsRequestDialogOpen(true);
    };
   
    const { data, setData, post, processing, errors, reset } = useForm({
        subject: '',
        description: '',
        time: '',
        user_id: selectedUserId,
    });
    useEffect(() => {
        setData('user_id', selectedUserId);
    }, [selectedUserId]);

    const handleSubmitRequest = (e: React.FormEvent) => {
        e.preventDefault();
        
        post(route('requests.store'), {
            onSuccess: () => {
                reset();
                setIsRequestDialogOpen(false);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-300">
                    Find Study Partners
                </h2>
            }
        >
            <Head title="Search Partner" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Tabs */}
                    <div className="flex space-x-4 mb-6">
                        <Button
                            variant={activeTab === 'partners' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('partners')}
                            className={`${
                                activeTab === 'partners'
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                    : 'bg-gray-800/50 text-gray-300 border-gray-700'
                            }`}
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Find Partners
                        </Button>
                        <Button
                            variant={activeTab === 'collabs' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('collabs')}
                            className={`${
                                activeTab === 'collabs'
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                    : 'bg-gray-800/50 text-gray-300 border-gray-700'
                            }`}
                        >
                            <Calendar className="w-4 h-4 mr-2" />
                            Collaboration Requests
                        </Button>
                    </div>

                    {activeTab === 'partners' ? (
                        <>
                            {/* Search and Filters Section */}
                            <div className="bg-gray-800/50 backdrop-blur-md p-6 shadow-2xl sm:rounded-lg border border-gray-700 mb-6">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <Input
                                                placeholder="Search by name, subject, or email..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="pl-10 bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500">
                                                <SelectValue placeholder="Subject" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                {subjects.map((subject) => (
                                                    <SelectItem key={subject} value={subject} className="text-gray-300 hover:bg-gray-700">
                                                        {subject}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                                            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500">
                                                <SelectValue placeholder="Experience Level" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                {experienceLevels.map((level) => (
                                                    <SelectItem key={level} value={level} className="text-gray-300 hover:bg-gray-700">
                                                        {level}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select value={sortBy} onValueChange={setSortBy}>
                                            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500">
                                                <SelectValue placeholder="Sort by" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                {sortOptions.map((option) => (
                                                    <SelectItem key={option} value={option} className="text-gray-300 hover:bg-gray-700">
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Partners Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredUsers.map((user) => (
                                    <Card key={user.id} className="bg-gray-800/50 backdrop-blur-md border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
                                        <CardHeader>
                                            <div className="flex items-center space-x-4">
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage src={user.profile_image || undefined} />
                                                    <AvatarFallback className="bg-gray-700 text-gray-300">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-white">{user.name}</CardTitle>
                                                    <CardDescription className="text-gray-400">{user.speciality}</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-2">
                                                    <BookOpen className="text-blue-400" size={16} />
                                                    <span className="text-gray-300">{user.level}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <MessageSquare className="text-green-400" size={16} />
                                                    <span className="text-gray-300">{user.email}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge variant="secondary" className="bg-gray-700 text-gray-300 hover:bg-gray-600">
                                                        {user.speciality}
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between items-center pt-4">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-700">
                                                                View Profile
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="bg-gray-800 border-gray-700">
                                                            <DialogHeader>
                                                                <DialogTitle className="text-white">{user.name}'s Profile</DialogTitle>
                                                                <DialogDescription className="text-gray-400">
                                                                    {user.bio || 'No bio available'}
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="space-y-4">
                                                                <div className="flex items-center space-x-2">
                                                                    <BookOpen className="text-blue-400" size={16} />
                                                                    <span className="text-gray-300">{user.speciality}</span>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <MessageSquare className="text-green-400" size={16} />
                                                                    <span className="text-gray-300">{user.email}</span>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <Filter className="text-purple-400" size={16} />
                                                                    <span className="text-gray-300">Level: {user.level}</span>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button onClick={() => handleRequestSession(user.id)} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                                                        Request Session
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Collaborations Search and Filters */}
                            <div className="bg-gray-800/50 backdrop-blur-md p-6 shadow-2xl sm:rounded-lg border border-gray-700 mb-6">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <Input
                                                placeholder="Search collaborations..."
                                                value={collabSearchQuery}
                                                onChange={(e) => setCollabSearchQuery(e.target.value)}
                                                className="pl-10 bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Select value={selectedCollabType} onValueChange={setSelectedCollabType}>
                                            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500">
                                                <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                <SelectItem value="all" className="text-gray-300 hover:bg-gray-700">
                                                    All Types
                                                </SelectItem>
                                                {Object.entries(collabTypes).map(([key, value]) => (
                                                    <SelectItem key={key} value={key} className="text-gray-300 hover:bg-gray-700">
                                                        {value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select value={selectedCollabStatus} onValueChange={setSelectedCollabStatus}>
                                            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                <SelectItem value="all" className="text-gray-300 hover:bg-gray-700">
                                                    All Statuses
                                                </SelectItem>
                                                <SelectItem value="pending" className="text-gray-300 hover:bg-gray-700">Pending</SelectItem>
                                                <SelectItem value="accepted" className="text-gray-300 hover:bg-gray-700">Accepted</SelectItem>
                                                <SelectItem value="rejected" className="text-gray-300 hover:bg-gray-700">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Collaborations Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCollabs.length > 0 ? (
                                    filteredCollabs.map((collab) => (
                                        <Card key={collab.id} className="bg-gray-800/50 backdrop-blur-md border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                                        {collabTypes[collab.type as keyof typeof collabTypes]}
                                                    </Badge>
                                                    <Badge variant="secondary" className={`${
                                                        collab.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                                        collab.status === 'accepted' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                                        'bg-red-500/20 text-red-400 border-red-500/30'
                                                    }`}>
                                                        {collab.status.charAt(0).toUpperCase() + collab.status.slice(1)}
                                                    </Badge>
                                                </div>
                                                <CardTitle className="text-white mt-4">{collab.subject}</CardTitle>
                                                <CardDescription className="text-gray-400">
                                                    {formatDistanceToNow(new Date(collab.created_at), { addSuffix: true })}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <p className="text-gray-300 text-sm">{collab.description}</p>
                                                    
                                                    <div className="flex items-center space-x-4 pt-4">
                                                        <Avatar className="w-8 h-8">
                                                            <AvatarImage src={collab.creator.profile_image || undefined} />
                                                            <AvatarFallback className="bg-gray-700 text-gray-300">
                                                                {collab.creator.name.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-sm text-gray-300">{collab.creator.name}</p>
                                                            <p className="text-xs text-gray-400">{collab.creator.speciality}</p>
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
                                                                    <DialogTitle className="text-white">{collab.subject}</DialogTitle>
                                                                    <DialogDescription className="text-gray-400">
                                                                        {collab.description}
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="space-y-4">
                                                                    <div className="flex items-center space-x-2">
                                                                        <Users className="text-blue-400" size={16} />
                                                                        <span className="text-gray-300">Type: {collabTypes[collab.type as keyof typeof collabTypes]}</span>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <Calendar className="text-green-400" size={16} />
                                                                        <span className="text-gray-300">Created: {formatDistanceToNow(new Date(collab.created_at), { addSuffix: true })}</span>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <Filter className="text-purple-400" size={16} />
                                                                        <span className="text-gray-300">Status: {collab.status.charAt(0).toUpperCase() + collab.status.slice(1)}</span>
                                                                    </div>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                        {collab.status === 'pending' && (
                                                            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                                                                Accept
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-12">
                                        <div className="text-gray-400 mb-4">
                                            <Calendar className="w-12 h-12 mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold text-white mb-2">No Collaborations Found</h3>
                                            <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
                <DialogContent className="bg-gray-800 border-gray-700">
                    <DialogHeader>
                        <DialogTitle className="text-white">Request Study Session</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Fill in the details for your study session request
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitRequest} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                            <Input
                                id="subject"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                                placeholder="Enter the subject for the study session"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-gray-300">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500 min-h-[100px]"
                                placeholder="Describe what you want to study or discuss"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time" className="text-gray-300">Preferred Date</Label>
                            <Input
                                id="time"
                                type="datetime-local"
                                value={data.time}
                                onChange={(e) => setData('time', e.target.value)}
                                className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsRequestDialogOpen(false)}
                                className="text-gray-300 border-gray-600 hover:bg-gray-700"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Send Request
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
