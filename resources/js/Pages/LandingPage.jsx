import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function LandingPage() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('reveal-3d')) {
                        entry.target.classList.add('opacity-100', 'translate-y-0', 'rotate-x-0', 'scale-100');
                        entry.target.classList.remove('opacity-0', 'translate-y-24', 'rotate-x-12', 'scale-90');
                    } else {
                        entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
                        entry.target.classList.remove('opacity-0', 'translate-y-12', 'scale-95');
                    }
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.reveal, .reveal-3d').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30 selection:text-orange-500 overflow-x-hidden relative">
            <Head title="Schematics ITS 2027" />

            {/* Ambient Background Glows */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-800/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
            
            {/* Grid Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>

            {/* Navbar */}
            <nav className="relative z-50 flex justify-between items-center p-6 md:px-12 md:py-8">
                <div className="text-2xl font-black tracking-tighter uppercase flex items-center gap-3">
                    <div className="w-5 h-5 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]"></div>
                    <span>Schematics <span className="text-zinc-500 font-mono font-normal tracking-widest text-sm ml-1">2027</span></span>
                </div>
                <Link href="/staff/login" className="group px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-orange-500 transition-all text-xs font-black uppercase tracking-widest flex items-center gap-3">
                    <span>Staff Login</span>
                    <span className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-orange-500 transition-colors"></span>
                </Link>
            </nav>

            <main className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center pt-12 pb-24">
                
                {/* Massive Typography Hero */}
                <div className="text-center mb-16 reveal opacity-0 translate-y-12 scale-95 transition-all duration-[1.5s] ease-out">
                    <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-zinc-400 text-[10px] font-mono tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                        National IT Event
                    </div>
                    
                    <h1 className="text-[12vw] sm:text-[10vw] md:text-[8rem] lg:text-[11rem] leading-[0.8] font-black tracking-tighter uppercase text-zinc-100 mix-blend-difference mb-4">
                        BEYOND <br/>
                        <span className="text-transparent relative" style={{ WebkitTextStroke: '2px #f4f4f5' }}>
                            THE EDGE
                        </span>
                    </h1>
                    
                    <div className="w-48 h-2 bg-orange-500 mx-auto mb-8 shadow-[0_0_20px_rgba(249,115,22,0.6)]"></div>
                    
                    <p className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        Pushing the boundaries of youth technology and logic. Join the largest IT competition hosted by Informatics Engineering ITS.
                    </p>
                </div>

                {/* The Logo / Visual Showcase */}
                <div className="w-full max-w-5xl mx-auto mb-24 reveal-3d opacity-0 translate-y-24 rotate-x-12 scale-90 transition-all duration-[1.5s] ease-out relative group" style={{ perspective: '1000px' }}>
                    {/* Decorative elements around the image */}
                    <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-orange-500 z-20 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-orange-500 z-20 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                    
                    <div className="absolute top-4 -right-16 z-20 rotate-90 origin-left hidden lg:block">
                        <span className="text-zinc-600 font-mono text-[10px] tracking-[0.3em] uppercase">Visual Data_01</span>
                    </div>

                    <div className="relative w-full bg-zinc-900 p-2 md:p-4 border border-zinc-800 shadow-2xl z-10">
                        <div className="w-full aspect-video flex items-center justify-center overflow-hidden bg-zinc-950 relative">
                            {/* Blurred background behind image */}
                            <img 
                                src="/logo.jpg" 
                                alt="" 
                                className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110"
                            />
                            {/* Fully visible and perfectly scaled logo */}
                            <img 
                                src="/logo.jpg" 
                                alt="Schematics Visual" 
                                className="w-full h-full object-contain relative z-10"
                            />
                        </div>
                    </div>
                </div>

                {/* Event Highlights */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {[
                        { title: 'NLC', sub: 'National Logic Competition', icon: 'psychology' },
                        { title: 'NPC', sub: 'National Programming Contest', icon: 'terminal' },
                        { title: 'NST', sub: 'National Seminar of Technology', icon: 'forum' }
                    ].map((event, i) => (
                        <div key={i} className={`reveal opacity-0 translate-y-12 transition-all duration-1000 bg-zinc-900/50 border border-zinc-800 p-8 hover:bg-zinc-800 hover:border-orange-500 transition-colors group relative overflow-hidden`} style={{ transitionDelay: `${i * 200}ms` }}>
                            {/* Hover effect background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-orange-500/20 transition-colors"></div>
                            
                            <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-8 group-hover:border-orange-500 transition-colors relative z-10">
                                <span className="material-symbols-outlined text-orange-500">{event.icon}</span>
                            </div>
                            <h3 className="text-3xl font-black uppercase mb-2 relative z-10">{event.title}</h3>
                            <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest relative z-10">{event.sub}</p>
                            
                            {/* Decorative corner */}
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-t border-l border-zinc-800 group-hover:border-orange-500 transition-colors"></div>
                        </div>
                    ))}
                </div>

                {/* Timeline Section */}
                <section id="timeline" className="w-full max-w-5xl mx-auto py-24 mb-12">
                    <div className="reveal opacity-0 translate-y-8 transition-all duration-1000">
                        <div className="text-center mb-24">
                            <div className="text-orange-500 font-mono text-[10px] uppercase tracking-widest mb-4">Milestones</div>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-zinc-100">Timeline</h2>
                        </div>

                        <div className="relative border-l border-zinc-800 ml-4 md:ml-0 md:pl-0">

                            <div className="mb-16 relative pl-10 md:pl-0 md:flex md:items-center md:justify-between group">
                                <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-2.5 h-2.5 bg-zinc-950 border border-orange-500 transform rotate-45 group-hover:bg-orange-500 group-hover:scale-150 transition-all z-10"></div>
                                <div className="md:w-[45%] md:text-right font-mono text-orange-500 mb-4 md:mb-0 text-[10px] uppercase tracking-widest">August 2027</div>
                                <div className="md:w-[45%] border border-zinc-800 p-8 bg-zinc-900/50 group-hover:border-orange-500/50 transition-colors">
                                    <h4 className="text-2xl font-bold uppercase mb-3 text-zinc-100">Early Bird Registration</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">Secure your spot with special pricing for NLC and NPC. Limited slots available for early adapters.</p>
                                </div>
                            </div>

                            <div className="mb-16 relative pl-10 md:pl-0 md:flex md:items-center md:justify-between flex-row-reverse group">
                                <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-2.5 h-2.5 bg-zinc-950 border border-zinc-600 transform rotate-45 group-hover:bg-orange-500 group-hover:scale-150 transition-all z-10"></div>
                                <div className="md:w-[45%] font-mono text-zinc-500 mb-4 md:mb-0 text-[10px] uppercase tracking-widest">September 2027</div>
                                <div className="md:w-[45%] border border-zinc-800 p-8 md:text-right bg-zinc-900/50 group-hover:border-orange-500/50 transition-colors">
                                    <h4 className="text-2xl font-bold uppercase mb-3 text-zinc-100">Preliminary Rounds</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">Online qualifications for all competitive events. Battle remotely and earn your place in the finals.</p>
                                </div>
                            </div>

                            <div className="relative pl-10 md:pl-0 md:flex md:items-center md:justify-between group">
                                <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-2.5 h-2.5 bg-zinc-950 border border-zinc-600 transform rotate-45 group-hover:bg-orange-500 group-hover:scale-150 transition-all z-10"></div>
                                <div className="md:w-[45%] md:text-right font-mono text-zinc-500 mb-4 md:mb-0 text-[10px] uppercase tracking-widest">October 2027</div>
                                <div className="md:w-[45%] border border-zinc-800 p-8 bg-zinc-900/50 group-hover:border-orange-500/50 transition-colors">
                                    <h4 className="text-2xl font-bold uppercase mb-3 text-zinc-100">Main Event & NST</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">The grand finals held offline in Surabaya, followed by the National Technology Seminar.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main>

            {/* Marquee Status bar */}
            <div className="w-full border-y border-zinc-800 bg-zinc-900 py-4 overflow-hidden select-none reveal opacity-0 translate-y-8 transition-all duration-1000 flex">
                {/* We use identical blocks to create a seamless infinite marquee */}
                <div className="shrink-0 whitespace-nowrap flex gap-12 px-6 font-mono text-xs font-black uppercase tracking-[0.2em] animate-[marquee_20s_linear_infinite] text-orange-500">
                    <span>/// 50,000+ Participants</span>
                    <span>/// 4 Major Events</span>
                    <span>/// National Scale</span>
                    <span>/// Established 2007</span>
                    <span>/// Push The Boundaries</span>
                </div>
                <div className="shrink-0 whitespace-nowrap flex gap-12 px-6 font-mono text-xs font-black uppercase tracking-[0.2em] animate-[marquee_20s_linear_infinite] text-orange-500">
                    <span>/// 50,000+ Participants</span>
                    <span>/// 4 Major Events</span>
                    <span>/// National Scale</span>
                    <span>/// Established 2007</span>
                    <span>/// Push The Boundaries</span>
                </div>
                <div className="shrink-0 whitespace-nowrap flex gap-12 px-6 font-mono text-xs font-black uppercase tracking-[0.2em] animate-[marquee_20s_linear_infinite] text-orange-500">
                    <span>/// 50,000+ Participants</span>
                    <span>/// 4 Major Events</span>
                    <span>/// National Scale</span>
                    <span>/// Established 2007</span>
                    <span>/// Push The Boundaries</span>
                </div>
            </div>

            <footer className="relative z-50 border-t border-zinc-900 bg-zinc-950 flex flex-col md:flex-row justify-between items-center p-6 md:px-12">
                <span className="text-[10px] text-zinc-600 font-mono tracking-[0.2em] uppercase mb-4 md:mb-0">&copy; 2027 Schematics ITS</span>
                <div className="flex gap-6 text-[10px] font-mono tracking-[0.2em] uppercase">
                    <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">Instagram</a>
                    <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">Twitter</a>
                    <a href="#" className="text-zinc-500 hover:text-orange-500 transition-colors">LinkedIn</a>
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
            `}} />
        </div>
    );
}
