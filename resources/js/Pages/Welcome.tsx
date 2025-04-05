import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Star, Users, Clock, GraduationCap } from 'lucide-react';

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Welcome to LearnMate" />
            
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <GraduationCap className="w-8 h-8 text-blue-500" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                                LearnMate
                            </span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">
                                Courses
                            </Link>
                            {auth.user ? (
                                <Link 
                                    href="/dashboard" 
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                                        Login
                                    </Link>
                                    <Link 
                                        href="/register" 
                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-32">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                                    Upgrade Your Knowledge,
                                </span>
                                <br />
                                <span className="text-white">Master Your Future</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                                Join thousands of learners and unlock your potential with our cutting-edge courses.
                            </p>
                            <Link 
                                href="/courses"
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all group"
                            >
                                Explore Courses
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                            <div className="relative bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700 shadow-2xl">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors">
                                        <BookOpen className="w-8 h-8 text-blue-500 mb-2" />
                                        <h3 className="text-white font-semibold">100+ Courses</h3>
                                        <p className="text-gray-400 text-sm">Expert-led content</p>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-purple-500 transition-colors">
                                        <Users className="w-8 h-8 text-purple-500 mb-2" />
                                        <h3 className="text-white font-semibold">10k+ Students</h3>
                                        <p className="text-gray-400 text-sm">Active community</p>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors">
                                        <Clock className="w-8 h-8 text-blue-500 mb-2" />
                                        <h3 className="text-white font-semibold">Flexible Learning</h3>
                                        <p className="text-gray-400 text-sm">Learn at your pace</p>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-purple-500 transition-colors">
                                        <Star className="w-8 h-8 text-purple-500 mb-2" />
                                        <h3 className="text-white font-semibold">Certified</h3>
                                        <p className="text-gray-400 text-sm">Industry recognized</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Why Choose <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">LearnMate</span>
                        </h2>
                        <p className="text-xl text-gray-400">
                            Experience the future of learning with our innovative platform
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <BookOpen className="w-12 h-12 text-blue-500" />,
                                title: "Interactive Learning",
                                description: "Engage with dynamic content and real-world projects"
                            },
                            {
                                icon: <Users className="w-12 h-12 text-purple-500" />,
                                title: "Community Support",
                                description: "Connect with peers and experts in your field"
                            },
                            {
                                icon: <Star className="w-12 h-12 text-blue-500" />,
                                title: "Expert Instructors",
                                description: "Learn from industry professionals and thought leaders"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <div className="py-20 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
                <div className="container mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">
                            About <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">LearnMate</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            We're revolutionizing education with cutting-edge technology and innovative learning approaches.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors">
                                <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
                                <p className="text-gray-300">
                                    To empower learners worldwide by providing accessible, high-quality education through innovative technology and expert-led courses.
                                </p>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-colors">
                                <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
                                <p className="text-gray-300">
                                    To create a global learning community where anyone can acquire the skills they need to succeed in the digital age.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors">
                                <div className="text-4xl font-bold text-blue-500 mb-2">100+</div>
                                <p className="text-gray-300">Expert Instructors</p>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-colors">
                                <div className="text-4xl font-bold text-purple-500 mb-2">10k+</div>
                                <p className="text-gray-300">Active Students</p>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors">
                                <div className="text-4xl font-bold text-blue-500 mb-2">50+</div>
                                <p className="text-gray-300">Countries Reached</p>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-colors">
                                <div className="text-4xl font-bold text-purple-500 mb-2">24/7</div>
                                <p className="text-gray-300">Support Available</p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <Link 
                            href="/about" 
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all group"
                        >
                            Learn More About Us
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="bg-black py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <GraduationCap className="w-8 h-8 text-blue-500" />
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                                    LearnMate
                                </span>
                            </div>
                            <p className="text-gray-400">
                                Empowering learners with cutting-edge education technology.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link href="/courses" className="text-gray-400 hover:text-white transition-colors">Courses</Link></li>
                                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                                <li><Link href="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Connect</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} LearnMate. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
