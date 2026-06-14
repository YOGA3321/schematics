import React, { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ events, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        tipe_merchandise: '',
        harga_merchandise: '',
        stok: '',
        id_event: '',
        foto: null,
    });

    const [preview, setPreview] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post('/merchandise');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('foto', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    return (
        <AdminLayout title="Add Merchandise" auth={auth}>
            <div className="flex flex-col gap-10 max-w-4xl mx-auto w-full pb-12">
                <div className="flex flex-col gap-4 border-b border-zinc-900 pb-6">
                    <Link href="/merchandise" className="text-zinc-500 hover:text-orange-500 font-mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 mb-4 w-fit transition-colors">
                        <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                        Back to Catalog
                    </Link>
                    <div>
                        <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                            Inventory Control
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-100">Add Merchandise</h1>
                    </div>
                </div>

                <div className="bg-zinc-900/30 border border-zinc-800 relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500"></div>
                    
                    <form onSubmit={submit} className="p-8 space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Merchandise Type <span className="text-orange-500">*</span></label>
                                <input 
                                    type="text" 
                                    value={data.tipe_merchandise}
                                    onChange={e => setData('tipe_merchandise', e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 font-mono text-sm text-zinc-100 focus:border-orange-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="e.g. Tshirt"
                                />
                                {errors.tipe_merchandise && <div className="text-red-500 text-[10px] font-mono uppercase tracking-widest mt-1">{errors.tipe_merchandise}</div>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Price (Rp) <span className="text-orange-500">*</span></label>
                                <input 
                                    type="number" 
                                    value={data.harga_merchandise}
                                    onChange={e => setData('harga_merchandise', e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 font-mono text-sm text-zinc-100 focus:border-orange-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="e.g. 85000"
                                />
                                {errors.harga_merchandise && <div className="text-red-500 text-[10px] font-mono uppercase tracking-widest mt-1">{errors.harga_merchandise}</div>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Stock Quantity <span className="text-orange-500">*</span></label>
                                <input 
                                    type="number" 
                                    value={data.stok}
                                    onChange={e => setData('stok', e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 font-mono text-sm text-zinc-100 focus:border-orange-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="e.g. 100"
                                />
                                {errors.stok && <div className="text-red-500 text-[10px] font-mono uppercase tracking-widest mt-1">{errors.stok}</div>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Event Category <span className="text-orange-500">*</span></label>
                                <select 
                                    value={data.id_event}
                                    onChange={e => setData('id_event', e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 font-mono text-sm text-zinc-100 focus:border-orange-500 outline-none transition-all"
                                >
                                    <option value="">Select an Event</option>
                                    {events.map(ev => (
                                        <option key={ev.id_event} value={ev.id_event}>{ev.nama_subevent}</option>
                                    ))}
                                </select>
                                {errors.id_event && <div className="text-red-500 text-[10px] font-mono uppercase tracking-widest mt-1">{errors.id_event}</div>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Product Image <span className="text-orange-500">*</span></label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-800 border-dashed hover:border-orange-500 transition-colors cursor-pointer relative bg-zinc-950">
                                <input 
                                    type="file" 
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    accept="image/*"
                                />
                                <div className="space-y-2 text-center">
                                    {preview ? (
                                        <div className="relative w-full max-w-xs mx-auto h-48">
                                            <img src={preview} alt="Preview" className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-[48px] text-zinc-700">image</span>
                                            <div className="flex font-mono text-[10px] uppercase tracking-widest text-zinc-500 justify-center">
                                                <span className="font-bold text-orange-500 hover:text-orange-400">Upload a file</span>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="font-mono text-[10px] text-zinc-600 mt-2">PNG, JPG, GIF up to 2MB</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            {errors.foto && <div className="text-red-500 text-[10px] font-mono uppercase tracking-widest mt-1">{errors.foto}</div>}
                        </div>

                        <div className="flex justify-end gap-4 border-t border-zinc-900 pt-6">
                            <Link 
                                href="/merchandise"
                                className="px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-widest border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-orange-500 text-zinc-950 px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {processing ? 'Processing...' : 'Save Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
