import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function LandingPage() {
    return (
        <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container min-h-screen">
            <Head title="Schematics ITS 2027" />
            
            <header className="bg-surface-container/80 backdrop-blur-md fixed top-0 w-full border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-sm md:px-xl h-20 z-50">
                <div className="flex items-center gap-sm">
                    <span className="text-headline-md font-headline-md text-primary tracking-tight font-bold">Schematics ITS 2027</span>
                </div>
                <nav className="hidden md:flex items-center gap-lg font-body-md text-body-md">
                    <a className="text-primary font-bold border-b-2 border-primary pb-1" href="#">Home</a>
                    <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">About</a>
                    <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Events</a>
                    <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Merchandise</a>
                </nav>
                <div className="flex items-center gap-md">
                    <Link href="/staff/login" className="hidden md:flex items-center gap-xs px-md py-xs rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-bright/50 transition-all duration-200 scale-105 active:scale-95">
                        Staff Login
                    </Link>
                </div>
            </header>

            <main>
                <section className="relative min-h-screen flex items-center justify-center pt-20 px-sm md:px-xl overflow-hidden bg-[#081425]">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest/40 to-background z-10"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/80 to-background z-10 pointer-events-none"></div>
                    </div>
                    <div className="relative z-20 max-w-7xl mx-auto text-center flex flex-col items-center gap-lg">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="font-label-md text-sm text-primary tracking-widest uppercase">Registration Open</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-[#d8e3fb] max-w-4xl leading-tight">
                            Discover the Future with <br/>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Schematics ITS 2027</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-6">
                            The biggest National IT Event hosted by Informatics Engineering ITS. Join our prestigious competitions and visionary seminars designed to push the boundaries of technology.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                            <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-500/30">
                                Explore Events
                            </button>
                            <button className="w-full sm:w-auto px-8 py-3 rounded-lg border border-gray-600 text-blue-400 font-semibold hover:bg-gray-800/50 hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-md">
                                View Merchandise
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
