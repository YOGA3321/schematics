import React, { useState } from 'react';
import Layout from '../../Components/Layout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ events }) {
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
        <Layout>
            <Head title="Add Merchandise" />
            
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight">Add New Merchandise</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Enter the details of the new product.</p>
                </div>

                <div className="glass dark:glass-dark rounded-3xl p-8">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Merchandise Type</label>
                                <input 
                                    type="text" 
                                    value={data.tipe_merchandise}
                                    onChange={e => setData('tipe_merchandise', e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition"
                                    placeholder="e.g. Tshirt"
                                />
                                {errors.tipe_merchandise && <div className="text-red-500 text-sm mt-1">{errors.tipe_merchandise}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Price (Rp)</label>
                                <input 
                                    type="number" 
                                    value={data.harga_merchandise}
                                    onChange={e => setData('harga_merchandise', e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition"
                                    placeholder="e.g. 85000"
                                />
                                {errors.harga_merchandise && <div className="text-red-500 text-sm mt-1">{errors.harga_merchandise}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Stock Quantity</label>
                                <input 
                                    type="number" 
                                    value={data.stok}
                                    onChange={e => setData('stok', e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition"
                                    placeholder="e.g. 100"
                                />
                                {errors.stok && <div className="text-red-500 text-sm mt-1">{errors.stok}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Event Category</label>
                                <select 
                                    value={data.id_event}
                                    onChange={e => setData('id_event', e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition"
                                >
                                    <option value="">Select an Event</option>
                                    {events.map(ev => (
                                        <option key={ev.id_event} value={ev.id_event}>{ev.nama_subevent}</option>
                                    ))}
                                </select>
                                {errors.id_event && <div className="text-red-500 text-sm mt-1">{errors.id_event}</div>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Product Photo</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-xl hover:border-blue-500 transition cursor-pointer relative overflow-hidden">
                                <input 
                                    type="file" 
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    accept="image/*"
                                />
                                <div className="space-y-1 text-center">
                                    {preview ? (
                                        <div className="relative w-full max-w-xs mx-auto h-48">
                                            <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex text-sm text-slate-500 dark:text-slate-400 justify-center">
                                                <span className="relative font-medium text-blue-600 hover:text-blue-500">Upload a file</span>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">PNG, JPG, GIF up to 2MB</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            {errors.foto && <div className="text-red-500 text-sm mt-1">{errors.foto}</div>}
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <button 
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Merchandise'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
