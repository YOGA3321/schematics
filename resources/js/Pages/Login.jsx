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
        <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30 selection:text-orange-500 relative flex items-center justify-center p-6 md:p-12 overflow-x-hidden">
            <Head title="Staff Login - Schematics 2027" />
            
            {/* Ambient Background Glows */}
            <div className="fixed top-0 right-0 w-[60%] h-[60%] bg-orange-600/10 blur-[150px] pointer-events-none z-0"></div>
            
            {/* Grid Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
            
            <Link href="/" className="absolute top-8 left-8 md:top-12 md:left-12 inline-flex items-center gap-3 text-zinc-400 hover:text-orange-500 transition-colors z-20 font-mono text-[10px] uppercase tracking-[0.2em] group">
                <span className="w-8 h-[1px] bg-zinc-600 group-hover:bg-orange-500 group-hover:w-12 transition-all"></span>
                Back
            </Link>

            {/* Main Content Area */}
            <div className="w-full max-w-6xl relative z-10 flex flex-col lg:flex-row shadow-2xl">
                
                {/* Decorative border frame */}
                <div className="absolute -inset-2 border border-zinc-800/50 z-0 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500 z-20"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500 z-20"></div>

                {/* Left Side: Image Showcase */}
                <div className="w-full lg:w-3/5 bg-zinc-900 border border-zinc-800 p-4 md:p-8 relative">
                    <div className="absolute top-8 right-8 z-20 flex gap-2">
                        <div className="w-2 h-2 bg-orange-500 animate-pulse"></div>
                        <div className="w-2 h-2 bg-zinc-700"></div>
                        <div className="w-2 h-2 bg-zinc-700"></div>
                    </div>
                    
                    <div className="w-full h-full min-h-[300px] lg:min-h-[500px] flex items-center justify-center bg-zinc-950 border border-zinc-800/50 overflow-hidden relative">
                        {/* Blurred background behind the contain image */}
                        <img 
                            src="/logo.jpg" 
                            alt="" 
                            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 z-0 scale-110"
                        />
                        {/* We use object-contain so the photo is 100% visible and not cropped! */}
                        <img 
                            src="/logo.jpg" 
                            alt="Schematics Logo" 
                            className="w-full h-full object-contain relative z-10"
                        />
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full lg:w-2/5 bg-zinc-950 border border-t-0 lg:border-t lg:border-l-0 border-zinc-800 p-8 md:p-12 flex flex-col justify-center relative">
                    <div className="mb-10">
                        <div className="w-12 h-12 bg-orange-500 mb-6 flex items-center justify-center transform rotate-3 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                            <span className="material-symbols-outlined text-[24px] text-zinc-950 -rotate-3">admin_panel_settings</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none text-white">Staff <br/> Portal</h2>
                        <div className="inline-block border border-zinc-800 px-3 py-1.5 bg-zinc-900/50">
                            <p className="text-zinc-400 text-[10px] font-mono uppercase tracking-[0.2em]">Authentication Required</p>
                        </div>
                    </div>
                    
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        <div className="relative">
                            <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-2">NRP / Identifier</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-4 material-symbols-outlined text-zinc-600 text-[18px]">badge</span>
                                <input 
                                    type="text" 
                                    className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none text-zinc-100 placeholder-zinc-700 font-mono text-sm"
                                    placeholder="5025251056"
                                    value={data.nrp}
                                    onChange={e => setData('nrp', e.target.value)}
                                />
                            </div>
                            {errors.nrp && <p className="text-red-500 font-mono text-[10px] uppercase mt-2">{errors.nrp}</p>}
                        </div>
                        
                        <div className="relative">
                            <div className="flex justify-between items-end mb-2">
                                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">Passcode</label>
                                <a href="#" className="text-[10px] font-mono text-zinc-600 hover:text-orange-500 transition-colors uppercase tracking-widest">Forgot?</a>
                            </div>
                            <div className="relative flex items-center">
                                <span className="absolute left-4 material-symbols-outlined text-zinc-600 text-[18px]">key</span>
                                <input 
                                    type="password" 
                                    className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none text-zinc-100 placeholder-zinc-700 font-mono text-sm tracking-widest"
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                />
                            </div>
                            {errors.password && <p className="text-red-500 font-mono text-[10px] uppercase mt-2">{errors.password}</p>}
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full mt-4 bg-orange-500 text-zinc-950 py-5 font-black uppercase tracking-[0.2em] text-xs text-center hover:bg-orange-400 hover:text-zinc-900 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] rounded-none disabled:opacity-50 group flex items-center justify-center gap-4"
                        >
                            {processing ? 'Authenticating...' : 'Sign In'}
                            {!processing && <span className="material-symbols-outlined text-[16px] group-hover:translate-x-2 transition-transform">arrow_forward</span>}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-zinc-900 text-center">
                        <p className="text-zinc-600 text-[10px] font-mono tracking-widest uppercase">System version 1.24.0</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
