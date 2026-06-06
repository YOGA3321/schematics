import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function POSIndex({ auth, merchandises = [] }) {
    const [cart, setCart] = useState([]);
    
    // Fallback if empty
    const displayItems = merchandises.length > 0 ? merchandises : [
        { id: 1, nama_merchandise: 'T-Shirt Schematics 2027', harga: 120000, stok: 50, asal_subevent: 'NST' },
        { id: 2, nama_merchandise: 'Lanyard Exclusive', harga: 25000, stok: 100, asal_subevent: 'NPC' },
        { id: 3, nama_merchandise: 'Sticker Pack', harga: 15000, stok: 200, asal_subevent: 'NLC' },
    ];

    const addToCart = (item) => {
        const existing = cart.find(c => c.id === item.id);
        if (existing) {
            setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(c => c.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            <Head title="POS Dashboard - Schematics" />
            
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Schematics POS</h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">Cashier: <span className="text-cyan-600">{auth?.user?.nama || 'Admin'}</span></p>
                </div>
                <div className="flex gap-4">
                    <button className="px-5 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-semibold transition-colors">
                        Laporan
                    </button>
                    <button className="px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-semibold transition-colors">
                        Logout
                    </button>
                </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Product Grid */}
                <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
                    <div className="mb-6 flex gap-3">
                        <input 
                            type="text" 
                            placeholder="Cari merchandise..." 
                            className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none shadow-sm"
                        />
                        <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold transition-colors shadow-sm">
                            Cari
                        </button>
                    </div>

                    <h2 className="text-lg font-bold mb-4 text-slate-700">Daftar Produk</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {displayItems.map(item => (
                            <div 
                                key={item.id} 
                                onClick={() => addToCart(item)}
                                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-cyan-300 cursor-pointer transition-all active:scale-95 group"
                            >
                                <div className="aspect-square bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400 group-hover:bg-cyan-50 transition-colors">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                </div>
                                <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight">{item.nama_merchandise}</h3>
                                <p className="text-cyan-600 font-bold mt-2">Rp {item.harga.toLocaleString('id-ID')}</p>
                                <p className="text-xs text-slate-500 mt-1">Stok: {item.stok}</p>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Cart Sidebar */}
                <aside className="w-full lg:w-[400px] bg-white border-l border-slate-200 flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] z-10">
                    <div className="p-6 border-b border-slate-200 bg-slate-50/50">
                        <h2 className="text-xl font-bold text-slate-800">Keranjang Belanja</h2>
                    </div>
                    
                    <div className="flex-1 p-6 overflow-y-auto no-scrollbar space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                <p>Keranjang masih kosong</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 text-sm leading-tight">{item.nama_merchandise}</h4>
                                        <p className="text-cyan-600 font-bold text-sm mt-1">Rp {item.harga.toLocaleString('id-ID')}</p>
                                    </div>
                                    <div className="flex items-center gap-3 ml-4">
                                        <div className="px-3 py-1 bg-slate-100 rounded-lg font-bold text-sm">{item.qty}</div>
                                        <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    
                    <div className="p-6 bg-white border-t border-slate-200">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-slate-500 font-medium">Total Tagihan</span>
                            <span className="text-2xl font-black text-slate-800">Rp {total.toLocaleString('id-ID')}</span>
                        </div>
                        <button 
                            disabled={cart.length === 0}
                            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            Proses Pembayaran
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
