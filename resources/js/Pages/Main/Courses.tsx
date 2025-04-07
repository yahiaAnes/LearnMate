import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { BookOpen, Clock, Users, Star, Zap, Sparkles, Rocket, GraduationCap } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

interface Course {
    id: number;
    title: string;
    description: string;
    image: string;
    duration: string;
    level: string;
    rating: number;
    students_count: number;
    instructor: {
        name: string;
        avatar: string;
    };
}

interface Props {
    courses: Course[];
    auth: {
        user: {
            name: string;
            email: string;
        } | null;
    };
}

export default function Courses({ courses, auth }: Props) {
    return (
        <>
            <Head title="All Courses" />

            {/* Navigation */}
            <nav className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="flex items-center space-x-2">
                                    <GraduationCap className="w-8 h-8 text-blue-500" />
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                                        LearnMate
                                    </span>
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <Link
                                    href={route('welcome')}
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-300 hover:text-white hover:border-gray-300 focus:outline-none focus:text-white focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    Home
                                </Link>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-300 active:bg-blue-700 transition duration-150 ease-in-out"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-300 active:bg-blue-700 transition duration-150 ease-in-out"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-300 active:bg-gray-700 transition duration-150 ease-in-out"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 mix-blend-multiply" />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Explore Our Courses
                        </h1>
                        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                            Discover a wide range of courses designed to help you achieve your learning goals.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-colors duration-300">
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 mb-4">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Interactive Learning</h3>
                            <p className="text-gray-400">Engage with interactive content and hands-on exercises.</p>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-colors duration-300">
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 mb-4">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Expert Instructors</h3>
                            <p className="text-gray-400">Learn from industry experts with real-world experience.</p>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700 hover:border-pink-500 transition-colors duration-300">
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-pink-500/20 text-pink-400 mb-4">
                                <Rocket className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Career Growth</h3>
                            <p className="text-gray-400">Advance your career with in-demand skills and knowledge.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <Card key={course.id} className="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-colors duration-300 backdrop-blur-sm rounded-xl overflow-hidden">
                                <CardHeader className="p-0">
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <img
                                            src={`/storage/${course.image}`}
                                            alt={course.title}
                                            className="object-cover w-full h-full"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <CardTitle className="text-xl text-white">{course.title || 'Untitled Course'}</CardTitle>
                                        <CardDescription className="text-gray-400 line-clamp-2 mt-2">
                                            {course.description || 'No description available'}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-6">
                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1 text-blue-400" />
                                            <span>{course.duration || 'Not specified'}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 mr-1 text-purple-400" />
                                            <span>{course.students_count || 0} students</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 mr-1 text-yellow-400" />
                                            <span>{(course.rating || 0).toFixed(1)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <img
                                            src={course.instructor?.avatar || '/images/default-avatar.png'}
                                            alt={course.instructor?.name || 'Instructor'}
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        <span className="text-sm text-gray-400">{course.instructor?.name || 'Unknown Instructor'}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="px-6 pb-6">
                                    <Button 
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg"
                                        onClick={() => window.location.href = `/courses/${course.id}`}
                                    >
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        View Course
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-400">
                        © 2024 LearnMate. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}
