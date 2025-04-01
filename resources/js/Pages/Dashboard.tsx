import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-300">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-gray-800/50 backdrop-blur-md shadow-2xl sm:rounded-lg border border-gray-700">
                        <div className="p-6">
                            <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700">
                                <CardHeader className="border-b border-gray-700">
                                    <CardTitle className="text-2xl font-bold text-white">Welcome Back!</CardTitle>
                                    <CardDescription className="text-gray-400">
                                        Here's what's happening with your account today.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 hover:border-blue-500/50 transition-colors duration-300">
                                            <h3 className="text-lg font-semibold text-white mb-2">Total Courses</h3>
                                            <p className="text-3xl font-bold text-blue-400">12</p>
                                        </div>
                                        <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 hover:border-purple-500/50 transition-colors duration-300">
                                            <h3 className="text-lg font-semibold text-white mb-2">Active Projects</h3>
                                            <p className="text-3xl font-bold text-purple-400">5</p>
                                        </div>
                                        <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600 hover:border-green-500/50 transition-colors duration-300">
                                            <h3 className="text-lg font-semibold text-white mb-2">Completed Tasks</h3>
                                            <p className="text-3xl font-bold text-green-400">28</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
