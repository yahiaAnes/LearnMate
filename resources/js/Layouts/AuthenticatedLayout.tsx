import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  Settings, 
  MessageSquare,
  HelpCircle,
  LogOut,
  Search,
  PlusCircle,
  Handshake,
  Bell
} from 'lucide-react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard },
        { name: 'Search Partner', href: route('search.partner'), icon: Search },
        { name: 'Create Collaboration', href: route('collabs.create'), icon: PlusCircle },
        { name: 'My Collaborations', href: route('collabs.index'), icon: Handshake },
        { name: 'Requests', href: route('requests.index'), icon: Bell },
        { name: 'Responses', href: route('responses.index'), icon: MessageSquare },
        { name: 'Courses', href: route('courses.index'), icon: BookOpen },
        { name: 'Help', href: route('help'), icon: HelpCircle },
    ];

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

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800/50 backdrop-blur-md border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-gray-700">
                        <Link href="/" className="flex items-center space-x-2">
                            <ApplicationLogo className="h-8 w-auto fill-current text-white" />
                            <span className="text-xl font-bold text-white">LearnMate</span>
                                </Link>
                            </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                        route().current(item.href)
                                            ? 'bg-blue-500/20 text-blue-400'
                                            : 'text-gray-300 hover:bg-gray-700/50 hover:text-blue-400'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-700">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer">
                                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                        <span className="text-white font-medium">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">{user.name}</p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                    <svg
                                        className="h-4 w-4 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Content contentClasses="w-56 bg-gray-800 border-gray-700 absolute bottom-full mb-2">
                                <Dropdown.Link
                                    href={route('profile.edit')}
                                    className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-blue-400 px-4 py-2"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Profile</span>
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-red-400 px-4 py-2 w-full"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Log Out</span>
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <nav className="relative border-b border-gray-700 bg-gray-800/50 backdrop-blur-md">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                        </div>

                            <div className="flex items-center">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm font-medium leading-4 text-gray-300 transition duration-150 ease-in-out hover:text-blue-400 focus:outline-none"
                                            >
                                                {user.name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                    <header className="bg-gray-800/50 backdrop-blur-md shadow border-b border-gray-700">
                        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

                <main className="relative p-6">{children}</main>
            </div>
        </div>
    );
}
