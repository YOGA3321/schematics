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
            <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col min-h-screen relative z-10 p-8 md:p-12 lg:p-20 bg-zinc-950">
                {/* Grid Background Pattern */}
                <div className="fixed inset-0 w-full md:w-1/2 lg:w-5/12 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
                
                <Link href="/" className="inline-flex items-center gap-3 text-zinc-400 hover:text-orange-500 transition-colors w-fit font-mono text-[10px] uppercase tracking-[0.2em] relative z-10 group">
                    <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
                </Link>

                <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto relative z-10 py-12">
                    <div className="mb-12">
                        <div className="w-12 h-12 bg-orange-500 mb-8 rounded-sm shadow-[0_0_30px_rgba(249,115,22,0.3)] flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform">
                            <svg className="w-6 h-6 text-zinc-950 -rotate-3 hover:rotate-0 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 leading-none">Staff <br/> Portal</h2>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                            <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest">Authentication Required</p>
                        </div>
                    </div>
                    
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        <div>
                            <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">NRP / Identifier</label>
                            <input 
                                type="text" 
                                className="w-full px-5 py-4 bg-zinc-900/30 border border-zinc-800 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none text-zinc-100 placeholder-zinc-700 font-mono text-sm"
                                placeholder="e.g. 5025251056"
                                value={data.nrp}
                                onChange={e => setData('nrp', e.target.value)}
                            />
                            {errors.nrp && <p className="text-red-500 font-mono text-xs mt-2">{errors.nrp}</p>}
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-end mb-3">
                                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Passcode</label>
                                <a href="#" className="text-[10px] font-mono text-zinc-500 hover:text-orange-500 transition-colors uppercase tracking-widest">Forgot?</a>
                            </div>
                            <input 
                                type="password" 
                                className="w-full px-5 py-4 bg-zinc-900/30 border border-zinc-800 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none text-zinc-100 placeholder-zinc-700 font-mono text-sm tracking-widest"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 font-mono text-xs mt-2">{errors.password}</p>}
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full mt-6 bg-zinc-50 text-zinc-950 py-4 font-black uppercase tracking-[0.2em] text-xs text-center hover:bg-orange-500 hover:text-zinc-50 transition-all hover:-translate-y-1 active:translate-y-0 hover:shadow-[0_10px_30px_-10px_rgba(249,115,22,0.4)] rounded-sm disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {processing ? 'Authenticating...' : 'Sign In'}
                                {!processing && <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">&rarr;</span>}
                            </span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Image Area */}
            <div className="hidden md:block md:w-1/2 lg:w-7/12 relative bg-zinc-950 border-l border-zinc-900 overflow-hidden">
                <img 
                    src="/logo.jpg" 
                    alt="Schematics Auth Visual" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-[3s] scale-100 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/30 z-10"></div>
                
                {/* Decorative Overlay */}
                <div className="absolute bottom-12 right-12 z-20 text-right">
                    <div className="flex justify-end gap-2 mb-2">
                        <div className="w-1 h-1 bg-orange-500 rounded-full animate-ping"></div>
                        <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
                    </div>
                    <div className="text-orange-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-1">Secure Gateway</div>
                    <div className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">Restricted Access Only</div>
                </div>
            </div>
        </div>
    );
}
