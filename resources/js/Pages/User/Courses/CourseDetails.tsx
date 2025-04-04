import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Clock, DollarSign, GraduationCap, Calendar, Users, BookOpen, ArrowLeft } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

interface Course {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    duration: number;
    level: string;
    speciality: string;
    date: string;
    image_url: string;
    long_description?: string;
    requirements?: string[];
    objectives?: string[];
    instructor?: {
        name: string;
        bio: string;
        avatar: string;
    };
}

interface Props {
    course: Course;
}

export default function CourseDetails({ course }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href="/courses" className="text-gray-300 hover:text-white">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-300">
                        Course Details
                    </h2>
                </div>
            }
        >
            <Head title={course.title} />
            
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card className="bg-gray-800 border-gray-700">
                            <div className="relative h-64">
                                <img
                                    src={`/storage/${course.image}`}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                                <Badge className="absolute top-4 right-4 bg-black/70">
                                    {course.level}
                                </Badge>
                            </div>
                            
                            <CardHeader>
                                <CardTitle className="text-2xl text-white">{course.title}</CardTitle>
                                <CardDescription className="text-gray-300">
                                    {course.description}
                                </CardDescription>
                            </CardHeader>
                            
                            <CardContent>
                                <div className="space-y-6">
                                    {course.long_description && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-white mb-2">About This Course</h3>
                                            <p className="text-gray-300">{course.long_description}</p>
                                        </div>
                                    )}

                                    {course.objectives && course.objectives.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-white mb-2">What You'll Learn</h3>
                                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                                                {course.objectives.map((objective, index) => (
                                                    <li key={index}>{objective}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {course.requirements && course.requirements.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-white mb-2">Requirements</h3>
                                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                                                {course.requirements.map((requirement, index) => (
                                                    <li key={index}>{requirement}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Course Info Card */}
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-xl text-white">Course Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Clock className="w-5 h-5" />
                                    <span>{course.duration} hours</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <DollarSign className="w-5 h-5" />
                                    <span>{course.price == 0 ? 'Free' : `${course.price}`}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <GraduationCap className="w-5 h-5" />
                                    <span>{course.speciality}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Calendar className="w-5 h-5" />
                                    <span>Starts: {new Date(course.date).toLocaleDateString()}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    Enroll Now
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Instructor Card */}
                        {course.instructor && (
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-xl text-white">Instructor</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={course.instructor.avatar}
                                            alt={course.instructor.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <h4 className="text-white font-medium">{course.instructor.name}</h4>
                                            <p className="text-sm text-gray-300">{course.instructor.bio}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 