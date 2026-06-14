import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        nrp: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/staff/login');
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col md:flex-row font-sans selection:bg-orange-500/30 selection:text-orange-500 overflow-x-hidden">
            <Head title="Staff Login - Schematics 2027" />
            
            {/* Left Content Area (Form) */}
            <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col min-h-screen relative z-10 p-8 md:p-12 lg:p-20 bg-zinc-950 border-r border-zinc-900 shadow-2xl">
                {/* Grid Background Pattern */}
                <div className="fixed inset-0 w-full md:w-1/2 lg:w-5/12 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
                
                <Link href="/" className="inline-flex items-center gap-3 text-zinc-400 hover:text-orange-500 transition-colors w-fit font-mono text-[10px] uppercase tracking-[0.2em] relative z-10 group bg-zinc-900 border border-zinc-800 px-4 py-2">
                    <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
                </Link>

                <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto relative z-10 py-12">
                    <div className="mb-10">
                        <div className="w-16 h-16 bg-orange-500 mb-8 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                            <span className="material-symbols-outlined text-[32px] text-zinc-950 -rotate-3 hover:rotate-0 transition-transform">lock_open</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 leading-none text-white">Staff <br/> Portal</h2>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                            <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest border border-zinc-800 px-2 py-1 bg-zinc-900/50">Authentication Required</p>
                        </div>
                    </div>
                    
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        <div className="bg-zinc-900/40 border border-zinc-800 p-6 relative">
                            <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-zinc-700"></div>
                            <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3">NRP / Identifier</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none text-zinc-100 placeholder-zinc-700 font-mono text-sm"
                                placeholder="e.g. 5025251056"
                                value={data.nrp}
                                onChange={e => setData('nrp', e.target.value)}
                            />
                            {errors.nrp && <p className="text-red-500 font-mono text-xs mt-2">{errors.nrp}</p>}
                        </div>
                        
                        <div className="bg-zinc-900/40 border border-zinc-800 p-6 relative">
                            <div className="absolute top-0 right-0 w-3 h-3 border-l border-b border-zinc-700"></div>
                            <div className="flex justify-between items-end mb-3">
                                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">Passcode</label>
                                <a href="#" className="text-[10px] font-mono text-zinc-500 hover:text-orange-500 transition-colors uppercase tracking-widest">Forgot?</a>
                            </div>
                            <input 
                                type="password" 
                                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none text-zinc-100 placeholder-zinc-700 font-mono text-sm tracking-widest"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 font-mono text-xs mt-2">{errors.password}</p>}
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full mt-4 bg-orange-500 text-zinc-950 py-5 font-black uppercase tracking-[0.2em] text-xs text-center hover:bg-orange-400 hover:text-zinc-900 transition-all hover:-translate-y-1 active:translate-y-0 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] rounded-none disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {processing ? 'Authenticating...' : 'Sign In'}
                                {!processing && <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">&rarr;</span>}
                            </span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Image Area */}
            <div className="hidden md:flex md:w-1/2 lg:w-7/12 relative bg-zinc-950 items-center justify-center overflow-hidden p-12">
                <div className="absolute inset-0 bg-zinc-950 z-0">
                    {/* Blurred background ambient glow */}
                    <img 
                        src="/logo.jpg" 
                        alt="" 
                        className="w-full h-full object-cover opacity-10 blur-3xl scale-110"
                    />
                </div>
                
                {/* Image fully visible */}
                <div className="relative z-10 w-full h-full max-w-2xl flex items-center justify-center">
                    <img 
                        src="/logo.jpg" 
                        alt="Schematics Auth Visual" 
                        className="w-full h-auto max-h-full object-contain rounded-md shadow-2xl border border-zinc-800"
                    />
                </div>
                
                {/* Decorative Overlay */}
                <div className="absolute bottom-12 right-12 z-20 text-right bg-zinc-950/80 backdrop-blur border border-zinc-800 p-4">
                    <div className="flex justify-end gap-2 mb-3">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping"></div>
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></div>
                    </div>
                    <div className="text-orange-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-1">Secure Gateway</div>
                    <div className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">Restricted Access Only</div>
                </div>
            </div>
        </div>
    );
}
