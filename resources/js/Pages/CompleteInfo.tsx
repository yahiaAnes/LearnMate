import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Eye, EyeOff, Upload } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface User {
  id: number;
  name: string;
  email: string;
  university: string;
  speciality: string;
  level: string;
  bio: string;
  profile_image: File | null;
}

interface data {
  name: string;
  email: string;
  university: string;
  speciality: string;
  level: string;
  bio: string;
  profile_image: File | null;
}

interface UserProps extends PageProps {
  user : User;
}

export default function CompleteInfo({user}:UserProps) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    university: '',
    speciality: '',
    level: '',
    bio: '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('users.storeInfo', {id : user.id})); 
    console.log('Form submitted:', data);
  };

  const levelOptions: string[] = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'PhD'];

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-full blur-3xl" />
      </div>

      {/* Floating 3D Shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-lg transform rotate-12 animate-float" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/20 rounded-full animate-float animation-delay-1000" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-400/20 rounded-lg transform rotate-45 animate-float animation-delay-2000" />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-md border-gray-700 shadow-2xl">
          <CardHeader className="space-y-1 border-b border-gray-700">
            <CardTitle className="text-2xl font-bold text-center text-white">Complete Your Profile</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Please provide your information to complete your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <Avatar className="relative w-24 h-24 border-2 border-gray-700 bg-gray-800">
                    <AvatarImage src={previewImage || undefined} />
                    <AvatarFallback className="bg-gray-700 text-gray-300 text-xl">
                      {data.name ? data.name.charAt(0).toUpperCase() : 'U'}
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    value={user.name} 
                    onChange={handleChange} 
                    disabled 
                    className="bg-gray-700 border-gray-600 text-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={user.email} 
                    onChange={handleChange} 
                    disabled 
                    className="bg-gray-700 border-gray-600 text-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university" className="text-gray-300">University</Label>
                  <Input 
                    id="university" 
                    name="university" 
                    placeholder="Harvard University" 
                    value={data.university} 
                    onChange={handleChange} 
                    className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="speciality" className="text-gray-300">Speciality</Label>
                  <Input 
                    id="speciality" 
                    name="speciality" 
                    placeholder="Computer Science" 
                    value={data.speciality} 
                    onChange={handleChange} 
                    className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level" className="text-gray-300">Level</Label>
                  <Select 
                    value={data.level || ""} 
                    onValueChange={(value) => handleSelectChange('level', value)}
                  >
                    <SelectTrigger id="level" className="bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500">
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {levelOptions.map(option => (
                        <SelectItem key={option} value={option} className="text-gray-300 hover:bg-gray-700">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  placeholder="Tell us about yourself..." 
                  value={data.bio} 
                  onChange={handleChange} 
                  className="min-h-24 bg-gray-700 border-gray-600 text-gray-300 focus:border-blue-500"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="border-t border-gray-700">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={(e) => handleSubmit(e as unknown as FormEvent<HTMLFormElement>)}
            >
              Save Profile
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}