import React from 'react';
import Layout from '../../Components/Layout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ merchandises }) {
    return (
        <Layout>
            <Head title="Merchandise" />
            
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Merchandise Catalog</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your products and inventory.</p>
                </div>
                <Link 
                    href="/merchandise/create" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition transform hover:-translate-y-1"
                >
                    + Add Merchandise
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {merchandises.map((item) => (
                    <div key={item.id_merchandise} className="glass dark:glass-dark rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                        <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                            {item.foto ? (
                                <img 
                                    src={`/storage/${item.foto}`} 
                                    alt={item.tipe_merchandise}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </div>
                            )}
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                                {item.event?.nama_subevent}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-1">{item.tipe_merchandise}</h3>
                            <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-4">
                                Rp {Number(item.harga_merchandise).toLocaleString('id-ID')}
                            </p>
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className="text-slate-500 dark:text-slate-400">Stock</span>
                                <span className={`px-2 py-1 rounded-md ${item.stok > 10 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                                    {item.stok} items
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
