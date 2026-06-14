import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminLayout from '../../Layouts/AdminLayout';

export default function POSIndex({ auth, merchandises = [] }) {
    const [cart, setCart] = useState([]);
    const [isSeminar, setIsSeminar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("Semua");
    
    const [namaPembeli, setNamaPembeli] = useState("");
    const [email, setEmail] = useState("");
    const [nomorTelepon, setNomorTelepon] = useState("");
    const [metodePembayaran, setMetodePembayaran] = useState(3);
    const [uangDiberikan, setUangDiberikan] = useState("");
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [uangDiberikanModal, setUangDiberikanModal] = useState("");

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowCheckoutModal(false);
            }
        };
        if (showCheckoutModal) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showCheckoutModal]);
    
    // Normalization
    const normalizedItems = merchandises.length > 0 ? merchandises.map(m => ({
        id: m.id_merchandise,
        nama_merchandise: m.tipe_merchandise,
        harga: Number(m.harga_merchandise),
        stok: m.stok,
        asal_subevent: m.event?.nama_subevent || 'Umum',
        sku: `SKU-0${m.id_merchandise}`
    })) : [
        { id: 1, nama_merchandise: 'Kaos Schematics 2023 - L', harga: 150000, stok: 15, asal_subevent: 'BST', sku: 'BST-TS-L' },
        { id: 2, nama_merchandise: 'Tote Bag Kanvas Premium', harga: 85000, stok: 42, asal_subevent: 'NPC', sku: 'NPC-TB-01' },
        { id: 3, nama_merchandise: 'Mug Keramik NLC', harga: 45000, stok: 3, asal_subevent: 'NLC', sku: 'NLC-MG-01' },
    ];

    const displayItems = normalizedItems.filter(item => {
        const matchSearch = item.nama_merchandise.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchFilter = activeFilter === 'Semua' || item.asal_subevent === activeFilter;
        return matchSearch && matchFilter;
    });

    const addToCart = (item) => {
        if (item.stok < 1) {
            Swal.fire('Stok Habis', `Stok untuk ${item.nama_merchandise} sudah habis.`, 'warning');
            return;
        }
        const existing = cart.find(c => c.id === item.id);
        if (existing) {
            if (existing.qty + 1 > item.stok) {
                Swal.fire('Stok Tidak Mencukupi', `Anda tidak dapat menambahkan lebih dari ${item.stok} unit untuk ${item.nama_merchandise}.`, 'warning');
                return;
            }
            setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
    };

    const updateQty = (id, delta) => {
        setCart(cart.map(c => {
            if (c.id === id) {
                const newQty = c.qty + delta;
                if (newQty > c.stok) {
                    Swal.fire('Stok Tidak Mencukupi', `Stok maksimal untuk ${c.nama_merchandise} adalah ${c.stok}.`, 'warning');
                    return c;
                }
                return newQty > 0 ? { ...c, qty: newQty } : c;
            }
            return c;
        }));
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(c => c.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);

    const handleCheckout = () => {
        if (!namaPembeli) {
            Swal.fire('Error', 'Nama pembeli harus diisi.', 'error');
            return;
        }
        if (isSeminar && (!email || !nomorTelepon)) {
            Swal.fire('Error', 'Email dan Nomor Telepon wajib diisi untuk pendaftaran seminar.', 'error');
            return;
        }

        if (metodePembayaran !== 3) {
            setUangDiberikanModal(total.toString());
        } else {
            setUangDiberikanModal('');
        }
        setShowCheckoutModal(true);
    };

    const confirmCheckout = () => {
        const payCash = metodePembayaran === 3 ? Number(uangDiberikanModal) : total;
        if (metodePembayaran === 3 && payCash < total) {
            Swal.fire('Error', 'Uang diberikan tidak mencukupi.', 'error');
            return;
        }

        const payload = {
            pembeli: { nama_lengkap: namaPembeli },
            id_metode: metodePembayaran,
            uang_diberikan: payCash,
            cart: cart.map(c => ({ id_merchandise: c.id, jumlah: c.qty }))
        };

        if (isSeminar) {
            payload.seminar = { email, nomor_telepon: nomorTelepon };
        }

        axios.post('/api/checkout', payload)
            .then(res => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Transaksi berhasil diproses.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    background: '#09090b',
                    color: '#fafafa',
                    confirmButtonColor: '#f97316'
                }).then(() => {
                    setCart([]);
                    setNamaPembeli('');
                    setEmail('');
                    setNomorTelepon('');
                    setUangDiberikan('');
                    setUangDiberikanModal('');
                    setIsSeminar(false);
                    setShowCheckoutModal(false);
                    router.reload({ only: ['merchandises'] });
                });
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error',
                    text: err.response?.data?.message || 'Terjadi kesalahan saat checkout.',
                    icon: 'error',
                    background: '#09090b',
                    color: '#fafafa'
                });
            });
    };

    return (
        <AdminLayout title="Schematics POS - Terminal" auth={auth}>
            <div className="flex flex-1 w-full h-full overflow-hidden border border-zinc-900 bg-zinc-950">
                {/* Product Panel (2/3) */}
                <main className="flex-1 flex flex-col min-w-0 bg-zinc-950/50 relative">
                    {/* Background Grid */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
                    
                    {/* Search & Filters */}
                    <div className="p-6 pb-4 border-b border-zinc-900 relative z-10 flex flex-col gap-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                                    Point of Sale
                                </div>
                                <h1 className="text-2xl font-black uppercase tracking-tighter text-zinc-100">Terminal_01</h1>
                            </div>
                            <button className="bg-zinc-900 border border-zinc-800 p-3 text-zinc-400 hover:text-orange-500 hover:border-orange-500 transition-colors">
                                <span className="material-symbols-outlined text-[24px]">barcode_scanner</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">search</span>
                                <input 
                                    className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-none font-mono text-sm text-zinc-100 focus:border-orange-500 outline-none transition-all placeholder:text-zinc-700" 
                                    placeholder="SEARCH DATABASE..." 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-zinc-900">
                            {['Semua', 'BST', 'NPC', 'NLC'].map(filter => (
                                <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest flex-shrink-0 transition-colors border ${activeFilter === filter ? 'bg-orange-500 text-zinc-950 border-orange-500' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-100 hover:border-zinc-700'}`}>{filter}</button>
                            ))}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 lg:grid-cols-3 gap-4 content-start relative z-10">
                        {displayItems.map(item => (
                            <button 
                                key={item.id} 
                                onClick={() => addToCart(item)}
                                disabled={item.stok === 0}
                                className={`bg-zinc-900/30 border rounded-none overflow-hidden flex flex-col text-left relative transition-all ${item.stok === 0 ? 'opacity-40 border-zinc-900 cursor-not-allowed' : 'border-zinc-800 hover:border-orange-500 hover:bg-zinc-900/80 active:scale-[0.98] group'}`}
                            >
                                {/* Decals */}
                                <div className="absolute top-0 right-0 w-2 h-2 border-b border-l border-zinc-700 group-hover:border-orange-500 z-10 transition-colors"></div>
                                
                                {item.stok === 0 ? (
                                    <div className="absolute top-3 left-3 z-10 bg-zinc-950 border border-zinc-800 text-zinc-500 px-2 py-1 font-mono text-[10px] font-bold tracking-widest uppercase">DEPLETED</div>
                                ) : item.stok < 5 ? (
                                    <div className="absolute top-3 left-3 z-10 bg-red-500/10 border border-red-500 text-red-500 px-2 py-1 font-mono text-[10px] font-bold tracking-widest uppercase animate-pulse">LOW: {item.stok}</div>
                                ) : null}
                                
                                <div className="h-32 bg-zinc-950 w-full relative overflow-hidden flex items-center justify-center border-b border-zinc-800">
                                    <span className="material-symbols-outlined text-zinc-800 text-[48px] group-hover:text-zinc-700 transition-colors">inventory_2</span>
                                </div>
                                <div className="p-4 flex flex-col gap-1 flex-1">
                                    <div className="flex justify-between items-start gap-2 mb-2">
                                        <h3 className="font-bold text-sm text-zinc-100 leading-tight">{item.nama_merchandise}</h3>
                                        <span className="bg-zinc-800 px-1.5 py-0.5 text-zinc-400 text-[9px] font-mono font-bold uppercase shrink-0">{item.asal_subevent}</span>
                                    </div>
                                    <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-4">{item.sku || `SKU-0${item.id}`}</p>
                                    <div className="mt-auto pt-3 flex justify-between items-end border-t border-zinc-800/50">
                                        <span className="font-black text-orange-500 text-lg tracking-tighter">Rp {item.harga.toLocaleString('id-ID')}</span>
                                        <span className={`font-mono text-[10px] font-bold uppercase ${item.stok < 5 ? 'text-red-500' : 'text-zinc-500'}`}>QTY: {item.stok}</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </main>

                {/* Right Panel: Cart & Checkout (1/3) */}
                <aside className="w-[400px] bg-zinc-950 border-l border-zinc-900 flex flex-col flex-shrink-0 relative z-20">
                    {/* Cart Header */}
                    <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
                        <h2 className="text-xl font-black uppercase tracking-tight text-zinc-100 flex items-center gap-2">
                            <span className="material-symbols-outlined text-orange-500">shopping_cart</span>
                            Cart
                        </h2>
                        <button onClick={() => setCart([])} className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold hover:text-red-500 transition-colors flex items-center gap-1 border border-zinc-800 hover:border-red-500/50 bg-zinc-900 px-2 py-1">
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                            Clear
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3 bg-zinc-950/50">
                        {cart.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 opacity-50">
                                <span className="material-symbols-outlined text-[48px] mb-2">shopping_basket</span>
                                <span className="font-mono text-xs uppercase tracking-widest">Cart is empty</span>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="bg-zinc-900/50 border border-zinc-800 p-4 flex flex-col gap-3 relative group hover:border-orange-500/50 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div className="pr-6">
                                            <h4 className="font-bold text-sm text-zinc-100 leading-tight mb-1">{item.nama_merchandise}</h4>
                                            <p className="text-xs font-mono text-zinc-500">Rp {item.harga.toLocaleString('id-ID')}</p>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">close</span>
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-zinc-800">
                                        <div className="flex items-center border border-zinc-700 bg-zinc-950">
                                            <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
                                                <span className="material-symbols-outlined text-[16px]">remove</span>
                                            </button>
                                            <input readOnly className="w-8 h-8 text-center border-x border-zinc-700 border-y-0 p-0 font-mono text-xs font-bold bg-transparent text-zinc-100 focus:ring-0" type="text" value={item.qty} />
                                            <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
                                                <span className="material-symbols-outlined text-[16px]">add</span>
                                            </button>
                                        </div>
                                        <span className="text-sm font-black text-orange-500 tracking-tighter">Rp {(item.harga * item.qty).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Customer & Payment Form */}
                    <div className="border-t border-zinc-900 bg-zinc-950 flex flex-col">
                        <div className="p-6 flex flex-col gap-6 max-h-[350px] overflow-y-auto no-scrollbar">
                            
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Customer Name <span className="text-orange-500">*</span></label>
                                <input value={namaPembeli} onChange={e => setNamaPembeli(e.target.value)} className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 font-mono text-sm focus:border-orange-500 outline-none transition-all placeholder:text-zinc-700 text-zinc-100" placeholder="Enter name..." required type="text" />
                            </div>

                            <div className="bg-zinc-900/50 border border-zinc-800 p-4">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="font-mono text-xs font-bold uppercase text-zinc-300">Register Seminar?</span>
                                    <div className="relative">
                                        <input className="sr-only peer" type="checkbox" checked={isSeminar} onChange={(e) => setIsSeminar(e.target.checked)} />
                                        <div className="w-10 h-5 bg-zinc-800 border border-zinc-700 peer-checked:bg-orange-500 transition-colors"></div>
                                        <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-500 peer-checked:bg-zinc-950 transition-transform peer-checked:translate-x-5"></div>
                                    </div>
                                </label>
                                {isSeminar && (
                                    <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-zinc-800">
                                        <div>
                                            <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">Email Address</label>
                                            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 font-mono text-sm focus:border-orange-500 outline-none transition-all placeholder:text-zinc-700 text-zinc-100" placeholder="user@domain.com" type="email" />
                                        </div>
                                        <div>
                                            <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">Phone Number</label>
                                            <input value={nomorTelepon} onChange={e => setNomorTelepon(e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 font-mono text-sm focus:border-orange-500 outline-none transition-all placeholder:text-zinc-700 text-zinc-100" placeholder="08..." type="tel" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Payment Gateway</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 3, label: 'CASH' },
                                        { id: 2, label: 'QRIS' },
                                        { id: 1, label: 'TRF' }
                                    ].map(method => (
                                        <label key={method.id} className="cursor-pointer">
                                            <input checked={metodePembayaran === method.id} onChange={() => setMetodePembayaran(method.id)} className="sr-only peer" name="payment" type="radio" value={method.id} />
                                            <div className="border border-zinc-800 bg-zinc-900 py-3 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500 peer-checked:border-orange-500 peer-checked:bg-orange-500 peer-checked:text-zinc-950 transition-all hover:bg-zinc-800">
                                                {method.label}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Summary & Action */}
                        <div className="p-6 bg-zinc-950 border-t border-zinc-800 flex flex-col gap-4">
                            <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                                <span>Items in Cart</span>
                                <span className="font-bold text-zinc-300">[{cart.reduce((s, c) => s + c.qty, 0)}]</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
                                <span className="font-bold text-zinc-100 uppercase tracking-tighter">Total</span>
                                <span className="text-3xl font-black text-orange-500 tracking-tighter">Rp {total.toLocaleString('id-ID')}</span>
                            </div>
                            <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full bg-orange-500 text-zinc-950 py-4 font-black uppercase tracking-[0.2em] text-sm hover:bg-orange-400 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-2 disabled:opacity-50 disabled:cursor-not-allowed group">
                                Process Transact
                                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Checkout Confirmation Modal */}
                {showCheckoutModal && (
                    <div 
                        onClick={() => setShowCheckoutModal(false)}
                        className="fixed inset-0 left-0 top-0 w-full h-full z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
                    >
                        <div 
                            onClick={(e) => e.stopPropagation()}
                            className="w-[450px] max-w-[90vw] bg-zinc-950 border border-zinc-800 p-8 shadow-2xl flex flex-col gap-8 relative"
                        >
                            {/* Deco */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500"></div>

                            <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-100">Confirm Payment</h3>
                            
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Payment Gateway</span>
                                    <span className="font-mono font-bold uppercase border border-orange-500 bg-orange-500/10 px-3 py-1 text-xs text-orange-500 tracking-widest">
                                        {metodePembayaran === 3 ? 'CASH' : metodePembayaran === 2 ? 'QRIS' : 'TRANSFER'}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-end pb-4 border-b border-zinc-900">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Grand Total</span>
                                    <span className="text-3xl font-black text-orange-500 tracking-tighter">Rp {total.toLocaleString('id-ID')}</span>
                                </div>

                                {metodePembayaran === 3 ? (
                                    <div className="flex flex-col gap-3 mt-2">
                                        <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Cash Given</label>
                                        <div className="flex items-center">
                                            <span className="bg-zinc-900 border border-zinc-800 border-r-0 px-4 py-3 font-mono font-bold text-zinc-500">Rp</span>
                                            <input 
                                                value={uangDiberikanModal} 
                                                onChange={e => setUangDiberikanModal(e.target.value)} 
                                                type="number" 
                                                min="0" 
                                                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-orange-500 outline-none transition-all placeholder:text-zinc-800 font-mono font-bold text-lg text-zinc-100" 
                                                placeholder="0" 
                                                autoFocus
                                            />
                                        </div>
                                        
                                        <div className="flex justify-between items-end mt-4 pt-4 border-t border-zinc-900">
                                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Change</span>
                                            {(() => {
                                                const modalKembalian = Number(uangDiberikanModal) - total;
                                                return (
                                                    <span className={`text-xl font-black tracking-tighter ${modalKembalian < 0 ? 'text-red-500' : 'text-zinc-100'}`}>
                                                        {modalKembalian < 0 ? 'Insufficient ' : ''}Rp {Math.abs(modalKembalian).toLocaleString('id-ID')}
                                                    </span>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-zinc-900/50 p-4 border border-zinc-800 text-xs font-mono text-zinc-400 uppercase tracking-widest leading-loose">
                                        Processing via {metodePembayaran === 2 ? 'QRIS' : 'Bank Transfer'}. Please verify gateway receipt before confirming.
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-zinc-900">
                                <button 
                                    onClick={() => setShowCheckoutModal(false)} 
                                    className="px-6 py-3 border border-zinc-800 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={confirmCheckout} 
                                    disabled={metodePembayaran === 3 && Number(uangDiberikanModal) < total}
                                    className="px-6 py-3 bg-orange-500 text-zinc-950 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
