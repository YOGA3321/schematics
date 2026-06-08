import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function LandingPage() {
    // Reveal animation on scroll logic
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
        <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30 selection:text-orange-500 relative">
            <Head title="Schematics ITS 2027" />
            
            {/* Grid Background Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>

            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-tighter uppercase flex items-center gap-3">
                        <div className="w-4 h-4 bg-orange-500"></div>
                        <span>Schematics <span className="text-zinc-500 font-data-mono">2027</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-10 text-[13px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                        <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
                        <a href="#events" className="hover:text-orange-500 transition-colors">Events</a>
                        <a href="#timeline" className="hover:text-orange-500 transition-colors">Timeline</a>
                    </div>
                    <Link href="/staff/login" className="px-6 py-2.5 bg-zinc-50 text-zinc-950 hover:bg-orange-500 hover:text-zinc-50 transition-colors text-[13px] font-bold uppercase tracking-wider">
                        Staff Area
                    </Link>
                </div>
            </nav>

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="pt-40 pb-24 px-6 border-b border-zinc-800 min-h-screen flex flex-col justify-center">
                    <div className="max-w-7xl mx-auto w-full reveal opacity-0 translate-y-8 transition-all duration-1000">
                        <div className="inline-block px-4 py-2 mb-8 border border-zinc-800 text-orange-500 text-xs font-data-mono tracking-widest uppercase">
                            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-2"></span>
                            System Online / Registration Open
                        </div>
                        <h1 className="text-[5rem] md:text-[9rem] lg:text-[11rem] leading-[0.85] font-black tracking-tighter uppercase mb-12">
                            Beyond <br />
                            <span className="text-transparent" style={{ WebkitTextStroke: '2px #f4f4f5' }}>The</span> Edge
                        </h1>
                        <div className="grid md:grid-cols-2 gap-16 items-end">
                            <p className="text-xl md:text-2xl text-zinc-400 max-w-xl leading-relaxed font-medium">
                                One of the largest National IT events hosted by Informatics Engineering ITS. We push the boundaries of youth technology and logic.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                                <a href="#events" className="px-10 py-5 bg-orange-500 text-zinc-50 font-bold uppercase tracking-[0.2em] text-sm text-center hover:bg-orange-600 transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                                    Explore Events
                                </a>
                                <a href="#about" className="px-10 py-5 border border-zinc-800 text-zinc-50 font-bold uppercase tracking-[0.2em] text-sm text-center hover:bg-zinc-800 transition-colors">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Marquee */}
                <div className="border-b border-zinc-800 overflow-hidden bg-orange-500 text-zinc-950 flex py-6 select-none relative group">
                    <div className="whitespace-nowrap flex gap-12 font-data-mono text-lg font-bold uppercase tracking-widest animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused]">
                        <span>/// 50,000+ Participants</span>
                        <span>/// 4 Major Events</span>
                        <span>/// National Scale</span>
                        <span>/// Established 2007</span>
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

                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                `}} />

                {/* Events Section */}
                <section id="events" className="py-40 px-6 border-b border-zinc-800">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal opacity-0 translate-y-8 transition-all duration-700">
                            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Core<br/>Events</h2>
                            <div className="text-zinc-500 font-data-mono text-sm tracking-widest uppercase mt-6 md:mt-0 max-w-xs md:text-right">Select your battleground and prove your skills</div>
                        </div>
                        
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Card 1 */}
                            <div className="group border border-zinc-800 p-10 hover:border-orange-500 transition-all duration-300 bg-zinc-950 flex flex-col justify-between min-h-[480px] hover:-translate-y-2 reveal opacity-0 translate-y-8">
                                <div>
                                    <div className="flex justify-between items-center mb-12">
                                        <div className="text-orange-500 font-data-mono text-xs uppercase tracking-widest">01 / Competition</div>
                                        <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">psychology</span>
                                        </div>
                                    </div>
                                    <h3 className="text-6xl font-black uppercase mb-6 tracking-tight">NLC</h3>
                                    <p className="text-zinc-400 leading-relaxed font-medium">National Logic Competition. Test your absolute limits in solving complex logic puzzles and algorithmic challenges against the brightest minds.</p>
                                </div>
                                <div className="mt-12 flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-50 transition-colors">
                                    <span>Register Now</span>
                                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="group border border-zinc-800 p-10 hover:border-orange-500 transition-all duration-300 bg-zinc-950 flex flex-col justify-between min-h-[480px] hover:-translate-y-2 reveal opacity-0 translate-y-8 delay-100">
                                <div>
                                    <div className="flex justify-between items-center mb-12">
                                        <div className="text-orange-500 font-data-mono text-xs uppercase tracking-widest">02 / Competition</div>
                                        <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">terminal</span>
                                        </div>
                                    </div>
                                    <h3 className="text-6xl font-black uppercase mb-6 tracking-tight">NPC</h3>
                                    <p className="text-zinc-400 leading-relaxed font-medium">National Programming Contest. Competitive programming at its finest for high school students. Write optimal code, beat the clock.</p>
                                </div>
                                <div className="mt-12 flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-50 transition-colors">
                                    <span>Register Now</span>
                                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="group border border-zinc-800 p-10 hover:border-orange-500 transition-all duration-300 bg-zinc-950 flex flex-col justify-between min-h-[480px] hover:-translate-y-2 reveal opacity-0 translate-y-8 delay-200">
                                <div>
                                    <div className="flex justify-between items-center mb-12">
                                        <div className="text-orange-500 font-data-mono text-xs uppercase tracking-widest">03 / Seminar</div>
                                        <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">forum</span>
                                        </div>
                                    </div>
                                    <h3 className="text-6xl font-black uppercase mb-6 tracking-tight">NST</h3>
                                    <p className="text-zinc-400 leading-relaxed font-medium">National Seminar of Technology. Learn directly from industry leaders and visionaries who are shaping the tomorrow of global tech.</p>
                                </div>
                                <div className="mt-12 flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-50 transition-colors">
                                    <span>Buy Ticket</span>
                                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section id="timeline" className="py-40 px-6 border-b border-zinc-800 bg-zinc-900/20">
                    <div className="max-w-4xl mx-auto reveal opacity-0 translate-y-8 transition-all duration-700">
                        <div className="text-center mb-24">
                            <div className="text-orange-500 font-data-mono text-xs uppercase tracking-widest mb-4">Milestones</div>
                            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Timeline</h2>
                        </div>
                        
                        <div className="relative border-l border-zinc-800 ml-4 md:ml-0 md:pl-0">
                            
                            <div className="mb-16 relative pl-10 md:pl-0 md:flex md:items-center md:justify-between group">
                                <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-2.5 h-2.5 bg-zinc-950 border border-orange-500 transform rotate-45 group-hover:bg-orange-500 group-hover:scale-150 transition-all"></div>
                                <div className="md:w-[45%] md:text-right font-data-mono text-orange-500 mb-4 md:mb-0 text-sm tracking-widest">August 2027</div>
                                <div className="md:w-[45%] border border-zinc-800 p-8 bg-zinc-950 group-hover:border-zinc-600 transition-colors">
                                    <h4 className="text-2xl font-bold uppercase mb-3">Early Bird Registration</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">Secure your spot with special pricing for NLC and NPC. Limited slots available for early adapters.</p>
                                </div>
                            </div>

                            <div className="mb-16 relative pl-10 md:pl-0 md:flex md:items-center md:justify-between flex-row-reverse group">
                                <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-2.5 h-2.5 bg-zinc-950 border border-zinc-600 transform rotate-45 group-hover:bg-zinc-50 group-hover:scale-150 transition-all"></div>
                                <div className="md:w-[45%] font-data-mono text-zinc-500 mb-4 md:mb-0 text-sm tracking-widest">September 2027</div>
                                <div className="md:w-[45%] border border-zinc-800 p-8 md:text-right bg-zinc-950 group-hover:border-zinc-600 transition-colors">
                                    <h4 className="text-2xl font-bold uppercase mb-3">Preliminary Rounds</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">Online qualifications for all competitive events. Battle remotely and earn your place in the finals.</p>
                                </div>
                            </div>

                            <div className="relative pl-10 md:pl-0 md:flex md:items-center md:justify-between group">
                                <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-2.5 h-2.5 bg-zinc-950 border border-zinc-600 transform rotate-45 group-hover:bg-zinc-50 group-hover:scale-150 transition-all"></div>
                                <div className="md:w-[45%] md:text-right font-data-mono text-zinc-500 mb-4 md:mb-0 text-sm tracking-widest">October 2027</div>
                                <div className="md:w-[45%] border border-zinc-800 p-8 bg-zinc-950 group-hover:border-zinc-600 transition-colors">
                                    <h4 className="text-2xl font-bold uppercase mb-3">Main Event & NST</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">The grand finals held offline in Surabaya, followed by the National Technology Seminar.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-24 px-6 bg-zinc-950 border-t border-zinc-900 flex flex-col items-center">
                    <div className="w-16 h-16 border-2 border-zinc-800 flex items-center justify-center mb-10 transform rotate-45">
                        <div className="w-6 h-6 bg-orange-500 transform -rotate-45"></div>
                    </div>
                    <div className="text-6xl font-black uppercase tracking-tighter mb-6">Schematics 2027</div>
                    <p className="text-zinc-500 font-data-mono text-sm uppercase tracking-widest mb-16 text-center max-w-sm leading-relaxed">
                        Organized by Informatics Engineering Students<br/>Institut Teknologi Sepuluh Nopember
                    </p>
                    <div className="flex gap-8 mb-16">
                        <a href="#" className="text-zinc-500 hover:text-zinc-50 transition-colors uppercase font-bold text-sm tracking-widest">Instagram</a>
                        <a href="#" className="text-zinc-500 hover:text-zinc-50 transition-colors uppercase font-bold text-sm tracking-widest">Twitter</a>
                        <a href="#" className="text-zinc-500 hover:text-zinc-50 transition-colors uppercase font-bold text-sm tracking-widest">LinkedIn</a>
                    </div>
                    <div className="text-zinc-700 text-xs uppercase tracking-widest">
                        &copy; 2027 Schematics ITS. Engineered for the future.
                    </div>
                </footer>
            </main>
        </div>
    );
}
