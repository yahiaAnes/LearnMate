import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { HelpCircle, BookOpen, Users, MessageSquare, Settings } from 'lucide-react';

export default function Help() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-300">
                    Help Center
                </h2>
            }
        >
            <Head title="Help Center" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700 mb-6">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <HelpCircle className="w-6 h-6 text-blue-400" />
                                <CardTitle className="text-white">Welcome to LearnMate Help Center</CardTitle>
                            </div>
                            <CardDescription className="text-gray-400">
                                Find answers to common questions and learn how to make the most of your learning experience.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    {/* Getting Started Section */}
                    <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700 mb-6">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <BookOpen className="w-5 h-5 text-green-400" />
                                <CardTitle className="text-white">Getting Started</CardTitle>
                            </div>
                            <CardDescription className="text-gray-400">
                                Learn the basics of using LearnMate
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-gray-300">
                                <h3 className="text-lg font-semibold text-blue-400 mb-2">1. Complete Your Profile</h3>
                                <p className="text-gray-400">
                                    Start by completing your profile with your educational background, interests, and learning goals. 
                                    This helps us match you with the right study partners and collaborations.
                                </p>
                            </div>
                            <div className="text-gray-300">
                                <h3 className="text-lg font-semibold text-blue-400 mb-2">2. Find Study Partners</h3>
                                <p className="text-gray-400">
                                    Use our advanced search feature to find study partners based on your subjects, 
                                    learning style, and schedule. Connect with like-minded learners to enhance your study experience.
                                </p>
                            </div>
                            <div className="text-gray-300">
                                <h3 className="text-lg font-semibold text-blue-400 mb-2">3. Create Collaborations</h3>
                                <p className="text-gray-400">
                                    Start study groups, research projects, or mentorship programs. 
                                    Our platform makes it easy to organize and manage your learning collaborations.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Communication Section */}
                    <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700 mb-6">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <MessageSquare className="w-5 h-5 text-purple-400" />
                                <CardTitle className="text-white">Communication</CardTitle>
                            </div>
                            <CardDescription className="text-gray-400">
                                Learn how to effectively communicate with your study partners
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-gray-300">
                                <h3 className="text-lg font-semibold text-blue-400 mb-2">Messaging System</h3>
                                <p className="text-gray-400">
                                    Our built-in messaging system allows you to communicate with your study partners 
                                    in real-time. Share resources, discuss topics, and coordinate study sessions easily.
                                </p>
                            </div>
                            <div className="text-gray-300">
                                <h3 className="text-lg font-semibold text-blue-400 mb-2">Collaboration Tools</h3>
                                <p className="text-gray-400">
                                    Use our collaboration tools to share documents, create study schedules, 
                                    and track progress together with your study partners.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Support Section */}
                    <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Settings className="w-5 h-5 text-yellow-400" />
                                <CardTitle className="text-white">Need More Help?</CardTitle>
                            </div>
                            <CardDescription className="text-gray-400">
                                Get additional support and contact our team
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-gray-300">
                                <h3 className="text-lg font-semibold text-blue-400 mb-2">Contact Support</h3>
                                <p className="text-gray-400">
                                    If you need additional assistance, our support team is here to help. 
                                    You can reach us through email or our support portal.
                                </p>
                            </div>
                            <div className="text-gray-300">
                                <h3 className="text-lg font-semibold text-blue-400 mb-2">FAQ</h3>
                                <p className="text-gray-400">
                                    Check our frequently asked questions for quick answers to common queries 
                                    about using LearnMate.
                                </p>
                            </div>
                            <div className="text-gray-300">
                                <h3 className="text-lg font-semibold text-blue-400 mb-2">Community Forums</h3>
                                <p className="text-gray-400">
                                    Join our community forums to connect with other users, share experiences, 
                                    and get tips for successful learning collaborations.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 