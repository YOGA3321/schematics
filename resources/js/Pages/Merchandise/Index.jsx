import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ merchandises, auth }) {
    return (
        <AdminLayout title="Merchandise Catalog" auth={auth}>
            <div className="p-8 flex flex-col gap-8 h-full overflow-y-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-[32px] font-bold text-on-surface tracking-tight">Merchandise Catalog</h1>
                        <p className="text-on-surface-variant mt-2 font-label-md text-[14px]">Manage your products and inventory.</p>
                    </div>
                    <Link 
                        href="/merchandise/create" 
                        className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-3 rounded-xl font-label-md font-bold shadow-lg shadow-primary/30 transition transform hover:-translate-y-1 active:scale-[0.98]"
                    >
                        + Add Merchandise
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8">
                    {merchandises.map((item) => (
                        <div key={item.id_merchandise} className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
                            <div className="h-48 bg-surface-container relative overflow-hidden flex items-center justify-center flex-shrink-0">
                                {item.foto ? (
                                    <img 
                                        src={`/storage/${item.foto}`} 
                                        alt={item.tipe_merchandise}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-outline">
                                        <span className="material-symbols-outlined text-[48px]">image</span>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-surface-container-high/80 backdrop-blur-md text-on-surface-variant text-[10px] font-bold px-3 py-1 rounded-full">
                                    {item.event?.nama_subevent}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-[16px] font-bold text-on-surface mb-1 leading-tight line-clamp-2 min-h-[40px]">{item.tipe_merchandise}</h3>
                                <p className="text-[20px] font-bold text-primary mb-4 tracking-tight">
                                    Rp {Number(item.harga_merchandise).toLocaleString('id-ID')}
                                </p>
                                <div className="flex justify-between items-center text-[14px] font-medium border-t border-outline-variant pt-4 mt-auto">
                                    <span className="text-on-surface-variant font-label-md">Stock</span>
                                    <span className={`px-3 py-1 rounded-full font-bold text-[12px] ${item.stok > 10 ? 'bg-primary-container text-on-primary-container' : 'bg-error-container text-on-error-container'}`}>
                                        {item.stok} items
                                    </span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-outline-variant">
                                    <Link 
                                        href={`/merchandise/${item.id_merchandise}/edit`} 
                                        className="w-full bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md font-bold px-4 py-2 rounded-lg transition-colors flex justify-center items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
