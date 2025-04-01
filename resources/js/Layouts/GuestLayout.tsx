import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center">
                    <Link href="/" className="mb-8">
                        <ApplicationLogo className="h-20 w-20 fill-current text-white" />
                    </Link>
                    <h1 className="text-3xl font-bold text-white text-center">
                        LearnMate
                    </h1>
                    <p className="mt-2 text-gray-400 text-center">
                        Connect, Learn, and Grow Together
                    </p>
                </div>

                <div className="relative">
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
                    
                    {/* Content */}
                    <div className="relative">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
