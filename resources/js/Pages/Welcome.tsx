import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Header from "@/Sections/Header";
import Hero from "@/Sections/Hero";


export default function Welcome({
    auth,
}: PageProps) {
    

    return (
        <>
            <Head title="Welcome" />
            <Header />
            <Hero />
            
        </>
    );
}
