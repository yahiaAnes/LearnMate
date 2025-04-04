import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Search, Clock, DollarSign, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
}

interface Props {
    courses: Course[];
}

export default function Courses({ courses }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [levelFilter, setLevelFilter] = useState('all');
    const [specialityFilter, setSpecialityFilter] = useState('all');

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
        const matchesSpeciality = specialityFilter === 'all' || course.speciality === specialityFilter;
        return matchesSearch && matchesLevel && matchesSpeciality;
    });

    const levels = [...new Set(courses.map(course => course.level))];
    const specialities = [...new Set(courses.map(course => course.speciality))];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-300">
                    Courses
                </h2>
            }
        >
            <Head title="Courses" />
            
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Available Courses</h1>
                        <p className="text-gray-300 mt-2">
                            Explore our collection of courses to enhance your knowledge
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-full bg-gray-800 text-white border-gray-700"
                            />
                        </div>
                        
                        <Select value={levelFilter} onValueChange={setLevelFilter}>
                            <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700">
                                <SelectValue placeholder="Filter by Level" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                                <SelectItem value="all">All Levels</SelectItem>
                                {levels.map(level => (
                                    <SelectItem key={level} value={level}>{level}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                        <Select value={specialityFilter} onValueChange={setSpecialityFilter}>
                            <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700">
                                <SelectValue placeholder="Filter by Speciality" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                                <SelectItem value="all">All Specialities</SelectItem>
                                {specialities.map(speciality => (
                                    <SelectItem key={speciality} value={speciality}>{speciality}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gray-800 border-gray-700">
                            <Link href={`/courses/${course.id}`}>
                                <div className="relative h-48">
                                    <img
                                        src={`/storage/${course.image}`}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <Badge className="absolute top-2 right-2 bg-black/70">
                                        {course.level}
                                    </Badge>
                                </div>
                                
                                <CardHeader>
                                    <CardTitle className="text-xl text-white">{course.title}</CardTitle>
                                    <CardDescription className="line-clamp-2 text-gray-300">
                                        {course.description}
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <Badge variant="secondary" className="flex items-center gap-1 bg-gray-700 text-gray-300">
                                            <Clock className="w-4 h-4" />
                                            {course.duration} hours
                                        </Badge>
                                        <Badge variant="secondary" className="flex items-center gap-1 bg-gray-700 text-gray-300">
                                            <DollarSign className="w-4 h-4" />
                                            {course.price == 0 ? 'Free' : `${course.price}`}

                                        </Badge>
                                        <Badge variant="secondary" className="flex items-center gap-1 bg-gray-700 text-gray-300">
                                            <GraduationCap className="w-4 h-4" />
                                            {course.speciality}
                                        </Badge>
                                    </div>
                                </CardContent>
                                
                                <CardFooter className="flex justify-between items-center">
                                    <div className="text-sm text-gray-400">
                                        Starts: {new Date(course.date).toLocaleDateString()}
                                    </div>
                                    <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                                        View Details
                                    </Button>
                                </CardFooter>
                            </Link>
                        </Card>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-white">
                            No courses found
                        </h3>
                        <p className="text-gray-400 mt-2">
                            Try adjusting your search or filters
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
