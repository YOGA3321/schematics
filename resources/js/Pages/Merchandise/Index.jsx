import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ merchandises, auth }) {
    return (
        <AdminLayout title="Merchandise Catalog" auth={auth}>
            <div className="flex flex-col gap-10 max-w-7xl mx-auto w-full">
                
                <div className="flex justify-between items-end border-b border-zinc-900 pb-6">
                    <div>
                        <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                            Inventory
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-100">Merchandise</h1>
                    </div>
                    <Link 
                        href="/merchandise/create" 
                        className="bg-orange-500 hover:bg-orange-400 text-zinc-950 px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Create Item
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
                    {merchandises.map((item) => (
                        <div key={item.id_merchandise} className="bg-zinc-900/30 border border-zinc-800 flex flex-col group hover:border-orange-500/50 transition-colors relative">
                            {/* Decorative Corners */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 group-hover:border-orange-500 transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700 group-hover:border-orange-500 transition-colors"></div>
                            
                            <div className="h-48 bg-zinc-950 relative flex items-center justify-center p-4">
                                {item.foto ? (
                                    <img 
                                        src={`/storage/${item.foto}`} 
                                        alt={item.tipe_merchandise}
                                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-800">
                                        <span className="material-symbols-outlined text-[48px]">image</span>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-mono tracking-widest uppercase px-2 py-1">
                                    {item.event?.nama_subevent}
                                </div>
                            </div>
                            
                            <div className="p-6 flex flex-col flex-1 border-t border-zinc-800">
                                <h3 className="text-lg font-bold text-zinc-100 mb-2 leading-tight line-clamp-2 min-h-[56px]">{item.tipe_merchandise}</h3>
                                <p className="text-2xl font-black text-orange-500 mb-6 tracking-tighter">
                                    Rp {Number(item.harga_merchandise).toLocaleString('id-ID')}
                                </p>
                                
                                <div className="flex justify-between items-center text-sm font-mono border-t border-zinc-800 pt-4 mt-auto">
                                    <span className="text-zinc-500 uppercase tracking-widest text-[10px]">Stock</span>
                                    <span className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase border ${item.stok > 10 ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-red-500/10 text-red-500 border-red-500/50'}`}>
                                        {item.stok} units
                                    </span>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-zinc-800">
                                    <Link 
                                        href={`/merchandise/${item.id_merchandise}/edit`} 
                                        className="w-full bg-zinc-800 hover:bg-zinc-700 hover:text-orange-500 text-zinc-300 font-mono text-[10px] font-bold uppercase tracking-widest px-4 py-3 transition-colors flex justify-center items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">edit</span>
                                        Configure
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
