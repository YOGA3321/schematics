import React, { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ merchandise, events, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        tipe_merchandise: merchandise.tipe_merchandise || '',
        harga_merchandise: merchandise.harga_merchandise || '',
        stok: merchandise.stok || '',
        id_event: merchandise.id_event || '',
        foto: null,
        _method: 'PUT'
    });

    const [preview, setPreview] = useState(merchandise.foto ? `/storage/${merchandise.foto}` : null);

    const submit = (e) => {
        e.preventDefault();
        post(`/merchandise/${merchandise.id_merchandise}`);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('foto', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(merchandise.foto ? `/storage/${merchandise.foto}` : null);
        }
    };

    return (
        <AdminLayout title="Edit Merchandise" auth={auth}>
            <div className="p-8 flex flex-col gap-8 h-full overflow-y-auto">
                <div className="max-w-3xl w-full mx-auto">
                    <div className="mb-8">
                        <Link href="/merchandise" className="text-primary hover:underline font-label-md text-[14px] flex items-center gap-2 mb-4 w-fit">
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                            Back to Catalog
                        </Link>
                        <h1 className="text-[32px] font-bold text-on-surface tracking-tight">Edit Merchandise</h1>
                        <p className="text-on-surface-variant mt-2 font-label-md text-[14px]">Update the details of the product.</p>
                    </div>

                    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-on-surface font-label-md text-[14px] font-bold mb-2">Merchandise Type</label>
                                    <input 
                                        type="text" 
                                        value={data.tipe_merchandise}
                                        onChange={e => setData('tipe_merchandise', e.target.value)}
                                        className="w-full bg-surface-container border border-outline-variant text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition"
                                        placeholder="e.g. Tshirt"
                                    />
                                    {errors.tipe_merchandise && <div className="text-error text-[12px] mt-1">{errors.tipe_merchandise}</div>}
                                </div>

                                <div>
                                    <label className="block text-on-surface font-label-md text-[14px] font-bold mb-2">Price (Rp)</label>
                                    <input 
                                        type="number" 
                                        value={data.harga_merchandise}
                                        onChange={e => setData('harga_merchandise', e.target.value)}
                                        className="w-full bg-surface-container border border-outline-variant text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition"
                                        placeholder="e.g. 85000"
                                    />
                                    {errors.harga_merchandise && <div className="text-error text-[12px] mt-1">{errors.harga_merchandise}</div>}
                                </div>

                                <div>
                                    <label className="block text-on-surface font-label-md text-[14px] font-bold mb-2">Stock Quantity</label>
                                    <input 
                                        type="number" 
                                        value={data.stok}
                                        onChange={e => setData('stok', e.target.value)}
                                        className="w-full bg-surface-container border border-outline-variant text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition"
                                        placeholder="e.g. 100"
                                    />
                                    {errors.stok && <div className="text-error text-[12px] mt-1">{errors.stok}</div>}
                                </div>

                                <div>
                                    <label className="block text-on-surface font-label-md text-[14px] font-bold mb-2">Event Category</label>
                                    <select 
                                        value={data.id_event}
                                        onChange={e => setData('id_event', e.target.value)}
                                        className="w-full bg-surface-container border border-outline-variant text-on-surface rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition"
                                    >
                                        <option value="">Select an Event</option>
                                        {events.map(ev => (
                                            <option key={ev.id_event} value={ev.id_event}>{ev.nama_subevent}</option>
                                        ))}
                                    </select>
                                    {errors.id_event && <div className="text-error text-[12px] mt-1">{errors.id_event}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-on-surface font-label-md text-[14px] font-bold mb-2">Product Photo</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-outline-variant border-dashed rounded-xl hover:border-primary transition cursor-pointer relative overflow-hidden bg-surface-container">
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
                                                <span className="material-symbols-outlined text-[48px] text-on-surface-variant">image</span>
                                                <div className="flex text-[14px] text-on-surface-variant justify-center mt-2">
                                                    <span className="relative font-bold text-primary hover:text-primary/80">Upload a file</span>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-[12px] text-on-surface-variant mt-2">PNG, JPG, GIF up to 2MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {errors.foto && <div className="text-error text-[12px] mt-1">{errors.foto}</div>}
                            </div>

                            <div className="flex justify-end gap-4 border-t border-outline-variant mt-8 pt-6">
                                <Link 
                                    href="/merchandise"
                                    className="px-6 py-3 font-bold text-on-surface hover:bg-surface-container-high rounded-xl transition"
                                >
                                    Cancel
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-primary hover:bg-primary/90 text-on-primary px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 transition disabled:opacity-50 active:scale-[0.98]"
                                >
                                    {processing ? 'Saving...' : 'Update Merchandise'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
