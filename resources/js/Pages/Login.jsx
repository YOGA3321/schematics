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
        <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans text-zinc-200 selection:bg-orange-500/30 selection:text-orange-500">
            <Head title="Staff Login - Schematics 2027" />
            
            {/* Grid Background Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>

            <Link href="/" className="absolute top-8 left-8 text-zinc-400 hover:text-orange-500 flex items-center gap-2 transition-colors z-10 font-mono text-xs uppercase tracking-widest font-bold">
                &larr; Back to Home
            </Link>
            
            <div className="w-full max-w-[400px] border border-zinc-800 bg-zinc-950 p-8 md:p-10 z-10 relative shadow-2xl">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center rotate-45 hover:border-orange-500 transition-colors">
                            <div className="w-6 h-6 bg-orange-500 -rotate-45 flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-zinc-950" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Staff Area</h2>
                    <p className="text-zinc-500 font-mono text-[11px] tracking-widest uppercase">Schematics 2027 Portal</p>
                </div>
                
                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">NRP</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500 transition-all outline-none text-zinc-100 placeholder-zinc-700 font-mono text-sm"
                            placeholder="e.g. 5025251056"
                            value={data.nrp}
                            onChange={e => setData('nrp', e.target.value)}
                        />
                        {errors.nrp && <p className="text-red-500 font-mono text-xs mt-2">{errors.nrp}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500 transition-all outline-none text-zinc-100 placeholder-zinc-700 font-mono text-sm"
                            placeholder="••••••••"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 font-mono text-xs mt-2">{errors.password}</p>}
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full mt-4 bg-orange-500 text-zinc-950 py-4 font-black uppercase tracking-[0.2em] text-sm text-center hover:bg-orange-600 hover:text-zinc-50 transition-all hover:translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
