import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import AddSkillForm from './Partials/AddSkillForm';
import { usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Upload } from 'lucide-react';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-300">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Profile Overview Card */}
                    <div className="bg-gray-800/50 backdrop-blur-md p-4 shadow-2xl sm:rounded-lg sm:p-8 border border-gray-700">
                        <Card className="bg-transparent border-0">
                            <CardHeader className="border-b border-gray-700">
                                <div className="flex items-center space-x-4">
                                    <div className="relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                                        <Avatar className="relative w-24 h-24 border-2 border-gray-700 bg-gray-800">
                                            <AvatarImage src={user.profile_image} />
                                            <AvatarFallback className="bg-gray-700 text-gray-300 text-xl">
                                                {user.name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <label 
                                            htmlFor="profile_image" 
                                            className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-300"
                                        >
                                            <Upload size={16} />
                                            <input 
                                                type="file" 
                                                id="profile_image" 
                                                className="hidden" 
                                                accept="image/*" 
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-bold text-white">{user.name}</CardTitle>
                                        <CardDescription className="text-gray-400">{user.email}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="university" className="text-gray-300">University</Label>
                                        <Input 
                                            id="university" 
                                            defaultValue={user.university}
                                            className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="speciality" className="text-gray-300">Speciality</Label>
                                        <Input 
                                            id="speciality" 
                                            defaultValue={user.speciality}
                                            className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="level" className="text-gray-300">Level</Label>
                                        <Select defaultValue={user.level}>
                                            <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500">
                                                <SelectValue placeholder="Select your level" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                <SelectItem value="Freshman" className="text-gray-300 hover:bg-gray-700">Freshman</SelectItem>
                                                <SelectItem value="Sophomore" className="text-gray-300 hover:bg-gray-700">Sophomore</SelectItem>
                                                <SelectItem value="Junior" className="text-gray-300 hover:bg-gray-700">Junior</SelectItem>
                                                <SelectItem value="Senior" className="text-gray-300 hover:bg-gray-700">Senior</SelectItem>
                                                <SelectItem value="Graduate" className="text-gray-300 hover:bg-gray-700">Graduate</SelectItem>
                                                <SelectItem value="PhD" className="text-gray-300 hover:bg-gray-700">PhD</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                                        <Textarea 
                                            id="bio" 
                                            defaultValue={user.bio}
                                            className="min-h-24 bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <Button 
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Skills Section */}
                    <div className="bg-gray-800/50 backdrop-blur-md p-4 shadow-2xl sm:rounded-lg sm:p-8 border border-gray-700">
                        <AddSkillForm skills={user.skills || []} />
                    </div>

                    {/* Password Update Section */}
                    <div className="bg-gray-800/50 backdrop-blur-md p-4 shadow-2xl sm:rounded-lg sm:p-8 border border-gray-700">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Account Deletion Section */}
                    <div className="bg-gray-800/50 backdrop-blur-md p-4 shadow-2xl sm:rounded-lg sm:p-8 border border-gray-700">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
