import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ peserta, auth }) {
    const { data, setData, put, processing, errors } = useForm({
        email: peserta.email || '',
        nomor_telepon: peserta.nomor_telepon || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/seminar/${peserta.id_peserta}`);
    };

    return (
        <AdminLayout title="Edit Seminar Participant" auth={auth}>
            <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full pb-12">
                <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
                    <Link href="/seminar" className="text-gray-500 hover:text-orange-500 font-mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 mb-4 w-fit transition-colors">
                        <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                        Back to Participants
                    </Link>
                    <div>
                        <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-bold">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-sm shadow-orange-500/50"></span>
                            Registry
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">Edit Participant</h1>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm relative">
                    <form onSubmit={submit} className="p-8 space-y-8 relative z-10">
                        <div className="grid grid-cols-1 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email Address <span className="text-orange-500">*</span></label>
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 font-mono text-sm text-gray-900 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-400 shadow-sm"
                                    placeholder="e.g. participant@example.com"
                                />
                                {errors.email && <div className="text-red-500 text-[10px] font-mono uppercase tracking-widest mt-1 font-bold">{errors.email}</div>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">Phone Number <span className="text-orange-500">*</span></label>
                                <input 
                                    type="text" 
                                    value={data.nomor_telepon}
                                    onChange={e => setData('nomor_telepon', e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 font-mono text-sm text-gray-900 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-400 shadow-sm"
                                    placeholder="e.g. 08123456789"
                                />
                                {errors.nomor_telepon && <div className="text-red-500 text-[10px] font-mono uppercase tracking-widest mt-1 font-bold">{errors.nomor_telepon}</div>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
                            <Link 
                                href="/seminar"
                                className="px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors rounded-xl shadow-sm"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-orange-500 text-white px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 rounded-xl shadow-sm shadow-orange-500/30"
                            >
                                {processing ? 'Processing...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
