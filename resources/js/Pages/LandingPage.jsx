import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
            <Head title="Schematics ITS 2027" />
            
            {/* Navbar Glass */}
            <nav className="fixed w-full z-50 glass border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500 tracking-tight">
                        Schematics ITS 2027
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="#home" className="text-white hover:text-cyan-400 transition-colors">Home</a>
                        <a href="#about" className="text-slate-400 hover:text-cyan-400 transition-colors">About</a>
                        <a href="#events" className="text-slate-400 hover:text-cyan-400 transition-colors">Events</a>
                        <a href="#merchandise" className="text-slate-400 hover:text-cyan-400 transition-colors">Merchandise</a>
                    </div>
                    <Link href="/staff/login" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-sm font-semibold backdrop-blur-md">
                        Staff Login
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px]"></div>

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-8">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        Registration Open
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-tight">
                        Discover the Future with <br/>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                            Schematics ITS 2027
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        The biggest National IT Event hosted by Informatics Engineering ITS. 
                        Join our prestigious competitions and visionary seminars designed to push the boundaries of technology.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#events" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:-translate-y-1">
                            Explore Events
                        </a>
                        <a href="#merchandise" className="w-full sm:w-auto px-8 py-4 rounded-full glass hover:bg-white/10 transition-all font-bold">
                            View Merchandise
                        </a>
                    </div>
                </div>
            </section>

            {/* About Section Dummy */}
            <section id="about" className="py-32 px-6 relative">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center"><span className="text-cyan-400">About</span> Schematics</h2>
                    <div className="glass-dark p-8 md:p-12 rounded-3xl text-center text-slate-300 leading-relaxed text-lg">
                        Schematics is an annual national event organized by students of Informatics Engineering at Institut Teknologi Sepuluh Nopember (ITS) Surabaya. 
                        It encompasses competitions in programming, logic, and a national seminar focusing on the latest technological advancements.
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-slate-500 border-t border-white/10 glass">
                &copy; 2027 Schematics ITS. All rights reserved.
            </footer>
        </div>
    );
}
