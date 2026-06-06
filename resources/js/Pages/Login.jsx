import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        nrp: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Assuming we route to /login for POST
        // For simplicity, we just simulate login or post to the standard Laravel login route
        post('/staff/login');
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col justify-center items-center px-4">
            <Head title="Staff Login - Schematics 2027" />
            
            <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden border border-outline-variant">
                <div className="p-8 bg-primary text-on-primary">
                    <h2 className="text-3xl font-bold mb-2">Staff Portal</h2>
                    <p className="text-primary-fixed-dim">Schematics ITS 2027 POS & Admin</p>
                </div>
                
                <form onSubmit={submit} className="p-8 flex flex-col gap-6">
                    <div>
                        <label className="block font-label-md text-on-surface mb-2">NRP</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                            placeholder="Contoh: 5025251187"
                            value={data.nrp}
                            onChange={e => setData('nrp', e.target.value)}
                        />
                        {errors.nrp && <p className="text-error text-sm mt-1">{errors.nrp}</p>}
                    </div>
                    
                    <div>
                        <label className="block font-label-md text-on-surface mb-2">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                            placeholder="••••••••"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                        {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full mt-4 bg-primary text-on-primary py-3 rounded-lg font-bold hover:bg-primary/90 active:scale-95 transition-all"
                    >
                        {processing ? 'Logging in...' : 'Login to Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}
