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
                {/* Grid Background Pattern */}
                <div className="fixed inset-0 w-full md:w-1/2 lg:w-5/12 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
                
                {/* Navbar */}
                <nav className="flex justify-between items-center mb-16 relative z-10">
                    <div className="text-xl font-black tracking-tighter uppercase flex items-center gap-3">
                        <div className="w-4 h-4 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
                        <span>Schematics <span className="text-zinc-500 font-mono font-normal">2027</span></span>
                    </div>
                    <Link href="/staff/login" className="hidden sm:inline-block px-5 py-2.5 border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-orange-500 hover:text-zinc-950 hover:border-orange-500 transition-all text-[10px] font-bold uppercase tracking-widest rounded-sm">
                        Staff Login
                    </Link>
                </nav>

                {/* Main Hero */}
                <main className="relative z-10 flex-1 flex flex-col justify-center py-6">
                    <div className="reveal opacity-0 translate-y-8 transition-all duration-1000">
                        <div className="inline-flex items-center px-4 py-2 mb-8 border border-orange-500/30 bg-orange-500/10 text-orange-500 text-[10px] font-mono tracking-widest uppercase rounded-full">
                            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-3"></span>
                            System Online / Reg Open
                        </div>
                        <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.85] font-black tracking-tighter uppercase mb-6">
                            Beyond <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '2px #f4f4f5' }}>The Edge</span>
                        </h1>
                        <p className="text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed font-medium mb-10">
                            One of the largest National IT events hosted by Informatics Engineering ITS. We push the boundaries of youth technology and logic.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 mb-12">
                            <a href="#events" className="px-8 py-4 bg-orange-500 text-zinc-950 font-black uppercase tracking-[0.2em] text-[11px] text-center hover:bg-orange-400 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.4)] rounded-sm">
                                Explore Events
                            </a>
                            <a href="#timeline" className="px-8 py-4 border border-zinc-800 bg-zinc-900 text-zinc-300 font-bold uppercase tracking-[0.2em] text-[11px] text-center hover:bg-zinc-800 hover:text-white transition-colors rounded-sm">
                                Timeline
                            </a>
                        </div>
                    </div>
                    
                    {/* Events Quick Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-800/50 pt-8 reveal opacity-0 translate-y-8 transition-all duration-1000 delay-300">
                        <div className="group border border-zinc-800 bg-zinc-950 p-4 hover:border-orange-500 transition-colors cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-8 h-8 bg-zinc-900 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                                <span className="material-symbols-outlined text-[14px] text-zinc-500 group-hover:text-zinc-950">psychology</span>
                            </div>
                            <h4 className="font-black text-xl uppercase text-zinc-100 group-hover:text-orange-500 transition-colors">NLC</h4>
                            <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase tracking-widest">Logic Comp</p>
                        </div>
                        <div className="group border border-zinc-800 bg-zinc-950 p-4 hover:border-orange-500 transition-colors cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-8 h-8 bg-zinc-900 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                                <span className="material-symbols-outlined text-[14px] text-zinc-500 group-hover:text-zinc-950">terminal</span>
                            </div>
                            <h4 className="font-black text-xl uppercase text-zinc-100 group-hover:text-orange-500 transition-colors">NPC</h4>
                            <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase tracking-widest">Programming</p>
                        </div>
                        <div className="group border border-zinc-800 bg-zinc-950 p-4 hover:border-orange-500 transition-colors cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-8 h-8 bg-zinc-900 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                                <span className="material-symbols-outlined text-[14px] text-zinc-500 group-hover:text-zinc-950">forum</span>
                            </div>
                            <h4 className="font-black text-xl uppercase text-zinc-100 group-hover:text-orange-500 transition-colors">NST</h4>
                            <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase tracking-widest">Tech Seminar</p>
                        </div>
                    </div>

                    {/* Stats Marquee (Rame element) */}
                    <div className="mt-12 -mx-8 md:-mx-12 lg:-mx-20 border-y border-zinc-800 bg-orange-500 text-zinc-950 flex py-3 overflow-hidden select-none reveal opacity-0 translate-y-8 transition-all duration-1000 delay-500">
                        <div className="whitespace-nowrap flex gap-8 font-mono text-[10px] font-black uppercase tracking-widest animate-[marquee_15s_linear_infinite]">
                            <span>/// 50,000+ Participants</span>
                            <span>/// 4 Major Events</span>
                            <span>/// National Scale</span>
                            <span>/// Established 2007</span>
                            <span>/// 50,000+ Participants</span>
                            <span>/// 4 Major Events</span>
                            <span>/// National Scale</span>
                            <span>/// Established 2007</span>
                        </div>
                    </div>
                </main>

                <footer className="mt-12 text-[10px] text-zinc-600 font-mono tracking-[0.2em] uppercase flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between relative z-10 pt-4">
                    <span>&copy; 2027 Schematics</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-orange-500 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Twitter</a>
                    </div>
                </footer>
            </div>

            {/* Right Image Area */}
            <div className="hidden md:flex md:w-1/2 lg:w-7/12 relative bg-zinc-950 border-l border-zinc-900 items-center justify-center overflow-hidden p-12">
                <div className="absolute inset-0 bg-zinc-950 z-0">
                    {/* Blurred background using the same image for a nice ambient glow */}
                    <img 
                        src="/logo.jpg" 
                        alt="" 
                        className="w-full h-full object-cover opacity-20 blur-3xl scale-110"
                    />
                </div>
                
                {/* The actual logo image, fully visible and contained */}
                <div className="relative z-10 w-full h-full max-w-3xl flex items-center justify-center">
                    <img 
                        src="/logo.jpg" 
                        alt="Schematics Visual" 
                        className="w-full h-auto max-h-full object-contain rounded-md shadow-2xl shadow-orange-500/10 border border-zinc-800/50"
                    />
                </div>
                
                {/* Floating Elements (Rame details) */}
                <div className="absolute top-12 left-12 z-20 text-left opacity-60">
                    <div className="w-8 h-8 border border-zinc-700 flex items-center justify-center mb-2">
                        <div className="w-2 h-2 bg-orange-500"></div>
                    </div>
                    <div className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">Target locked</div>
                </div>
                <div className="absolute bottom-12 right-12 z-20 text-right">
                    <div className="flex items-center justify-end gap-3 mb-3">
                        <div className="w-12 h-[1px] bg-orange-500"></div>
                        <span className="text-orange-500 font-mono text-[10px] tracking-[0.3em] uppercase">Status: Active</span>
                    </div>
                    <div className="text-zinc-500 font-mono text-[10px] tracking-[0.2em] uppercase">V 4.2.0.27</div>
                </div>
            </div>
            
            {/* Mobile Staff Login */}
            <Link href="/staff/login" className="md:hidden fixed bottom-8 right-8 w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-zinc-950 shadow-[0_0_20px_rgba(249,115,22,0.4)] z-50">
                <span className="material-symbols-outlined font-bold">login</span>
            </Link>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}} />
        </div>
    );
}
