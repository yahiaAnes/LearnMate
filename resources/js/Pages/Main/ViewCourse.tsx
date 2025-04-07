import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { BookOpen, Clock, Users, Star, ArrowLeft, Play, CheckCircle } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

interface Course {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    level: string;
    rating: number;
    students_count: number;
    instructor: {
        name: string;
        avatar: string;
        bio: string;
    };
    modules: {
        id: number;
        title: string;
        lessons: {
            id: number;
            title: string;
            duration: string;
        }[];
    }[];
}

interface Props {
    course: Course;
    auth: {
        user: {
            name: string;
            email: string;
        } | null;
    };
}

export default function ViewCourse({ course, auth }: Props) {
    return (
        <>
            <Head title={course.title} />

            {/* Navigation */}
            <nav className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <Link
                                    href={route('All-courses')}
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-300 hover:text-white hover:border-gray-300 focus:outline-none focus:text-white focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    Courses
                                </Link>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-300 active:bg-blue-700 transition duration-150 ease-in-out"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-300 active:bg-blue-700 transition duration-150 ease-in-out"
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

            {/* Course Hero Section */}
            <div className="relative bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 mix-blend-multiply" />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <Link
                            href={route('All-courses')}
                            className="inline-flex items-center text-gray-300 hover:text-white"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Courses
                        </Link>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        {course.title}
                    </h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                        {course.description}
                    </p>
                    <div className="mt-8 flex items-center space-x-6">
                        <div className="flex items-center text-gray-300">
                            <Clock className="w-5 h-5 mr-2" />
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                            <Users className="w-5 h-5 mr-2" />
                            <span>{course.students_count} students</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                            <Star className="w-5 h-5 mr-2 text-yellow-400" />
                            <span>{course.rating.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Course Modules */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-white mb-6">Course Content</h2>
                            <div className="space-y-4">
                                {course.modules.map((module) => (
                                    <div key={module.id} className="bg-gray-800/50 rounded-lg p-6">
                                        <h3 className="text-xl font-semibold text-white mb-4">{module.title}</h3>
                                        <div className="space-y-3">
                                            {module.lessons.map((lesson) => (
                                                <div
                                                    key={lesson.id}
                                                    className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors duration-200"
                                                >
                                                    <div className="flex items-center">
                                                        <Play className="w-5 h-5 text-gray-400 mr-3" />
                                                        <span className="text-gray-300">{lesson.title}</span>
                                                    </div>
                                                    <span className="text-sm text-gray-400">{lesson.duration}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Course Info Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-800/50 rounded-lg p-6 sticky top-6">
                                <div className="flex items-center space-x-4 mb-6">
                                    <img
                                        src={course.instructor.avatar}
                                        alt={course.instructor.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{course.instructor.name}</h3>
                                        <p className="text-sm text-gray-400">Instructor</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-6">{course.instructor.bio}</p>
                                <div className="space-y-4">
                                    <div className="flex items-center text-gray-300">
                                        <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                                        <span>Lifetime access</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                                        <span>Certificate of completion</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                                        <span>Downloadable resources</span>
                                    </div>
                                </div>
                                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                                    Enroll Now
                                </Button>
                            </div>
                        </div>
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