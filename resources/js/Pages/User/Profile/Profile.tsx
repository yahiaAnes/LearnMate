import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Badge } from '@/Components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { BookOpen, MessageSquare, Filter, Users, Calendar, Star, FileText, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';

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
    status: string;
    user: User;
    partner: User;
}

const collabTypes = {
    study_group: 'Study Group',
    project: 'Project',
    mentorship: 'Mentorship',
    research: 'Research',
    learn: 'Learn',
    teach: 'Teach',
};

const AnimatedCard = motion(Card);

const ProfileHeader = ({ user }: { user: User }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient" />
                <CardContent className="pt-6 relative">
                    <div className="flex items-center space-x-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Avatar className="w-24 h-24 ring-4 ring-blue-500/20">
                                <AvatarImage src={user.profile_image || undefined} />
                                <AvatarFallback className="bg-gray-700 text-gray-300 text-2xl">
                                    {user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </motion.div>
                        <div>
                            <motion.h1 
                                className="text-2xl font-bold text-white"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {user.name}
                            </motion.h1>
                            <motion.p 
                                className="text-gray-400"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {user.speciality}
                            </motion.p>
                            <motion.div 
                                className="flex items-center space-x-2 mt-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                    {user.level}
                                </Badge>
                            </motion.div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default function Profile() {
    const { user, collabs, requests } = usePage().props as unknown as { 
        user: User; 
        collabs: Collab[]; 
        requests: Request[]; 
    };

    const [activeTab, setActiveTab] = useState('info');

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center space-x-4">
                    <Link href="/search-partner">
                        <motion.div
                            whileHover={{ x: -5 }}
                            className="text-gray-300 hover:text-white cursor-pointer"
                        >
                            <ArrowLeft size={24} />
                        </motion.div>
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-300">
                        Profile
                    </h2>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="relative">
                        {/* Profile Header */}
                        <ProfileHeader user={user} />

                        {/* Profile Content */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                            <TabsList className="bg-gray-800/50 border-gray-700">
                                <TabsTrigger value="info" className="data-[state=active]:bg-gray-700">Profile Info</TabsTrigger>
                                <TabsTrigger value="collabs" className="data-[state=active]:bg-gray-700">Collaborations</TabsTrigger>
                                <TabsTrigger value="requests" className="data-[state=active]:bg-gray-700">Requests</TabsTrigger>
                            </TabsList>

                            <AnimatePresence mode="wait">
                                <TabsContent value="info" className="space-y-4">
                                    <AnimatedCard
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-gray-800/50 backdrop-blur-md border-gray-700"
                                    >
                                        <CardHeader>
                                            <CardTitle className="text-white">About Me</CardTitle>
                                            <CardDescription className="text-gray-400">
                                                {user.bio || 'No bio available'}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <motion.div 
                                                className="flex items-center space-x-2"
                                                whileHover={{ x: 10 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <MessageSquare className="text-green-400" size={16} />
                                                <span className="text-gray-300">{user.email}</span>
                                            </motion.div>
                                            <motion.div 
                                                className="flex items-center space-x-2"
                                                whileHover={{ x: 10 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <BookOpen className="text-blue-400" size={16} />
                                                <span className="text-gray-300">{user.speciality}</span>
                                            </motion.div>
                                            <motion.div 
                                                className="flex items-center space-x-2"
                                                whileHover={{ x: 10 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <Filter className="text-purple-400" size={16} />
                                                <span className="text-gray-300">Level: {user.level}</span>
                                            </motion.div>
                                        </CardContent>
                                    </AnimatedCard>
                                </TabsContent>

                                <TabsContent value="collabs" className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {collabs.map((collab, index) => (
                                            <AnimatedCard
                                                key={collab.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-gray-800/50 backdrop-blur-md border-gray-700 hover:border-blue-500/50 transition-colors duration-300"
                                                whileHover={{ scale: 1.02 }}
                                            >
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
                                                    <p className="text-gray-300 text-sm">{collab.description}</p>
                                                    <div className="flex items-center space-x-2 mt-4">
                                                        <Users className="text-blue-400" size={16} />
                                                        <span className="text-gray-300">
                                                            {collab.creator.id === user.id ? 'Created by you' : `Created by ${collab.creator.name}`}
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </AnimatedCard>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="requests" className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {requests.map((request, index) => (
                                            <AnimatedCard
                                                key={request.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-gray-800/50 backdrop-blur-md border-gray-700 hover:border-blue-500/50 transition-colors duration-300"
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <CardHeader>
                                                    <CardTitle className="text-white">{request.subject}</CardTitle>
                                                    <CardDescription className="text-gray-400">
                                                        {formatDistanceToNow(new Date(request.time), { addSuffix: true })}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-gray-300 text-sm">{request.description}</p>
                                                    <div className="flex items-center space-x-2 mt-4">
                                                        <Users className="text-blue-400" size={16} />
                                                        <span className="text-gray-300">
                                                            {request.user.id === user.id ? 'Your request' : `Request from ${request.user.name}`}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        <Badge variant="secondary" className={`${
                                                            request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                                            request.status === 'accepted' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                                            'bg-red-500/20 text-red-400 border-red-500/30'
                                                        }`}>
                                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                        </Badge>
                                                    </div>
                                                </CardContent>
                                            </AnimatedCard>
                                        ))}
                                    </div>
                                </TabsContent>
                            </AnimatePresence>
                        </Tabs>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
