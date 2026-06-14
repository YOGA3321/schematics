import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function LandingPage() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30 selection:text-orange-500 flex flex-col md:flex-row overflow-x-hidden">
            <Head title="Schematics ITS 2027" />
            
            {/* Left Content Area */}
            <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col justify-between min-h-screen relative z-10 p-8 md:p-12 lg:p-20 overflow-y-auto">
                {/* Grid Background Pattern for left side */}
                <div className="fixed inset-0 w-full md:w-1/2 lg:w-5/12 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
                
                {/* Navbar area */}
                <nav className="flex justify-between items-center mb-16 md:mb-24 relative z-10">
                    <div className="text-xl font-black tracking-tighter uppercase flex items-center gap-3">
                        <div className="w-4 h-4 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
                        <span>Schematics <span className="text-zinc-500 font-mono font-normal">2027</span></span>
                    </div>
                    <Link href="/staff/login" className="hidden sm:inline-block px-5 py-2.5 border border-zinc-800 text-zinc-300 hover:bg-orange-500 hover:text-zinc-950 hover:border-orange-500 transition-all text-[10px] font-bold uppercase tracking-widest rounded-sm">
                        Staff Login
                    </Link>
                </nav>

                {/* Main Hero Content */}
                <main className="relative z-10 flex-1 flex flex-col justify-center py-10">
                    <div className="reveal opacity-0 translate-y-8 transition-all duration-1000">
                        <div className="inline-flex items-center px-4 py-2 mb-8 border border-orange-500/30 bg-orange-500/5 text-orange-500 text-[10px] font-mono tracking-widest uppercase rounded-full">
                            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-3"></span>
                            Registration Open
                        </div>
                        <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.85] font-black tracking-tighter uppercase mb-8">
                            Beyond <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '2px #f4f4f5' }}>The Edge</span>
                        </h1>
                        <p className="text-base sm:text-lg text-zinc-400 max-w-md leading-relaxed font-medium mb-12">
                            One of the largest National IT events hosted by Informatics Engineering ITS. We push the boundaries of youth technology and logic.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <a href="#events" className="px-8 py-4 bg-orange-500 text-zinc-950 font-black uppercase tracking-[0.2em] text-[11px] text-center hover:bg-orange-400 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.4)] rounded-sm">
                                Explore Events
                            </a>
                            <a href="#about" className="px-8 py-4 border border-zinc-800 text-zinc-300 font-bold uppercase tracking-[0.2em] text-[11px] text-center hover:bg-zinc-900 hover:text-white transition-colors rounded-sm">
                                Learn More
                            </a>
                        </div>
                    </div>
                    
                    {/* Events Quick Links */}
                    <div className="mt-20 grid grid-cols-3 gap-6 border-t border-zinc-800/50 pt-10 reveal opacity-0 translate-y-8 transition-all duration-1000 delay-300">
                        <div className="group cursor-pointer">
                            <div className="w-8 h-8 mb-4 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors rounded-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h4 className="font-black text-2xl uppercase group-hover:text-orange-500 transition-colors">NLC</h4>
                            <p className="text-[10px] text-zinc-500 font-mono mt-2 uppercase tracking-widest">Logic Comp</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="w-8 h-8 mb-4 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors rounded-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                            </div>
                            <h4 className="font-black text-2xl uppercase group-hover:text-orange-500 transition-colors">NPC</h4>
                            <p className="text-[10px] text-zinc-500 font-mono mt-2 uppercase tracking-widest">Programming</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="w-8 h-8 mb-4 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors rounded-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                            </div>
                            <h4 className="font-black text-2xl uppercase group-hover:text-orange-500 transition-colors">NST</h4>
                            <p className="text-[10px] text-zinc-500 font-mono mt-2 uppercase tracking-widest">Seminar</p>
                        </div>
                    </div>
                </main>

                <footer className="mt-12 text-[10px] text-zinc-600 font-mono tracking-[0.2em] uppercase flex justify-between relative z-10 border-t border-zinc-800/50 pt-8">
                    <span>&copy; 2027 Schematics</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-orange-500 transition-colors">IG</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">TW</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">LI</a>
                    </div>
                </footer>
            </div>

            {/* Right Image Area */}
            <div className="hidden md:block md:w-1/2 lg:w-7/12 relative bg-zinc-950 border-l border-zinc-900 overflow-hidden">
                <div className="absolute inset-0 bg-zinc-950 z-10 opacity-20"></div>
                <img 
                    src="/logo.jpg" 
                    alt="Schematics Visual" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-[3s] scale-105 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent z-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-20"></div>
                
                {/* Floating Elements */}
                <div className="absolute bottom-12 right-12 z-30 text-right">
                    <div className="flex items-center justify-end gap-3 mb-3">
                        <div className="w-12 h-[1px] bg-orange-500"></div>
                        <span className="text-orange-500 font-mono text-[10px] tracking-[0.3em] uppercase">Status: Active</span>
                    </div>
                    <div className="text-zinc-500 font-mono text-[10px] tracking-[0.2em] uppercase">V 4.2.0.27</div>
                </div>
            </div>
            
            {/* Mobile Staff Login */}
            <Link href="/staff/login" className="md:hidden fixed bottom-8 right-8 w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-zinc-950 shadow-[0_0_20px_rgba(249,115,22,0.4)] z-50">
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
            </Link>
        </div>
    );
}
