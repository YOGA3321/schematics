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
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans text-slate-200">
            <Head title="Staff Login - Schematics 2027" />
            
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-10 w-80 h-80 bg-violet-600/20 rounded-full blur-[100px]"></div>
            </div>

            <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-cyan-400 flex items-center gap-2 transition-colors z-10 font-medium">
                &larr; Back to Home
            </Link>
            
            <div className="w-full max-w-[420px] glass-dark rounded-3xl p-8 z-10 relative">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-violet-600 mb-6 shadow-lg shadow-cyan-500/30">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Staff Portal</h2>
                    <p className="text-slate-400 text-sm">Secure access for Schematics 2027 committee</p>
                </div>
                
                <form onSubmit={submit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">NRP</label>
                        <input 
                            type="text" 
                            className="w-full px-5 py-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all outline-none text-white placeholder-slate-600"
                            placeholder="e.g. 5025251187"
                            value={data.nrp}
                            onChange={e => setData('nrp', e.target.value)}
                        />
                        {errors.nrp && <p className="text-red-400 text-sm mt-2">{errors.nrp}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-5 py-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all outline-none text-white placeholder-slate-600"
                            placeholder="••••••••"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                        {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password}</p>}
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-violet-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
