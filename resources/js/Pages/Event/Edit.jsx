import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ event, auth }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_subevent: event.nama_subevent || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/event/${event.id_event}`);
    };

    return (
        <AdminLayout title="Edit Event Category" auth={auth}>
            <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full pb-12">
                <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
                    <Link href="/event" className="text-gray-500 hover:text-orange-500 font-mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 mb-4 w-fit transition-colors">
                        <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                        Back to Events
                    </Link>
                    <div>
                        <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-bold">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-sm shadow-orange-500/50"></span>
                            System Settings
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gray-900">Edit Event</h1>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
                    <form onSubmit={submit} className="p-8 space-y-8 relative z-10">
                        <div className="grid grid-cols-1">
                            <div className="flex flex-col gap-3">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[14px] text-orange-500">label</span>
                                    Event Name <span className="text-orange-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">event</span>
                                    <input 
                                        type="text" 
                                        value={data.nama_subevent}
                                        onChange={e => setData('nama_subevent', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 pl-12 pr-4 py-4 font-mono text-base text-gray-900 rounded-xl focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-400 shadow-sm"
                                        placeholder="Enter event name (e.g. BST)"
                                        autoFocus
                                    />
                                </div>
                                {errors.nama_subevent && <div className="text-red-500 text-[10px] font-mono uppercase tracking-widest mt-1 font-bold">{errors.nama_subevent}</div>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
                            <Link 
                                href="/event"
                                className="px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors rounded-xl shadow-sm"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-orange-500 text-white px-8 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 rounded-xl shadow-sm shadow-orange-500/30"
                            >
                                {processing ? 'Processing...' : 'Update Event'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
