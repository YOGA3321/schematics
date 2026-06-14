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
                    background: '#ffffff',
                    color: '#111827',
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
                    background: '#ffffff',
                    color: '#111827'
                });
            });
    };

    return (
        <AdminLayout title="Schematics POS - Terminal" auth={auth}>
            <div className="flex flex-1 w-full h-full overflow-hidden border border-gray-200 bg-white shadow-sm rounded-2xl">
                {/* Product Panel (2/3) */}
                <main className="flex-1 flex flex-col min-w-0 bg-gray-50/50 relative">
                    
                    {/* Search & Filters */}
                    <div className="p-6 pb-4 border-b border-gray-200 relative z-10 flex flex-col gap-4 bg-white">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-bold">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-sm shadow-orange-500/50"></span>
                                    Point of Sale
                                </div>
                                <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-900">Terminal_01</h1>
                            </div>
                            <button className="bg-gray-50 border border-gray-200 p-3 text-gray-500 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 rounded-xl transition-all">
                                <span className="material-symbols-outlined text-[24px]">barcode_scanner</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                                <input 
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm text-gray-900 focus:border-orange-500 focus:bg-white outline-none transition-all placeholder:text-gray-400" 
                                    placeholder="SEARCH DATABASE..." 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 overflow-x-auto no-scrollbar pt-2">
                            {['Semua', 'BST', 'NPC', 'NLC'].map(filter => (
                                <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest flex-shrink-0 transition-colors border rounded-full shadow-sm ${activeFilter === filter ? 'bg-orange-500 text-white border-orange-500' : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'}`}>{filter}</button>
                            ))}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 lg:grid-cols-3 gap-4 content-start relative z-10 bg-gray-50/50">
                        {displayItems.map(item => (
                            <button 
                                key={item.id} 
                                onClick={() => addToCart(item)}
                                disabled={item.stok === 0}
                                className={`bg-white border rounded-xl overflow-hidden flex flex-col text-left relative transition-all shadow-sm ${item.stok === 0 ? 'opacity-50 border-gray-200 cursor-not-allowed' : 'border-gray-200 hover:border-orange-300 hover:shadow-md active:scale-[0.98] group'}`}
                            >
                                
                                {item.stok === 0 ? (
                                    <div className="absolute top-3 left-3 z-10 bg-gray-100 border border-gray-200 text-gray-500 px-2 py-1 font-mono text-[10px] font-bold tracking-widest uppercase rounded">DEPLETED</div>
                                ) : item.stok < 5 ? (
                                    <div className="absolute top-3 left-3 z-10 bg-red-50 border border-red-200 text-red-600 px-2 py-1 font-mono text-[10px] font-bold tracking-widest uppercase animate-pulse rounded">LOW: {item.stok}</div>
                                ) : null}
                                
                                <div className="h-32 bg-gray-50 w-full relative overflow-hidden flex items-center justify-center border-b border-gray-100 group-hover:bg-orange-50/50 transition-colors">
                                    <span className="material-symbols-outlined text-gray-300 text-[48px] group-hover:text-orange-300 transition-colors">inventory_2</span>
                                </div>
                                <div className="p-4 flex flex-col gap-1 flex-1">
                                    <div className="flex justify-between items-start gap-2 mb-2">
                                        <h3 className="font-bold text-sm text-gray-900 leading-tight">{item.nama_merchandise}</h3>
                                        <span className="bg-gray-100 px-2 py-0.5 text-gray-600 text-[9px] font-mono font-bold uppercase shrink-0 rounded-full">{item.asal_subevent}</span>
                                    </div>
                                    <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-4">{item.sku || `SKU-0${item.id}`}</p>
                                    <div className="mt-auto pt-3 flex justify-between items-end border-t border-gray-100">
                                        <span className="font-black text-orange-600 text-lg tracking-tighter">Rp {item.harga.toLocaleString('id-ID')}</span>
                                        <span className={`font-mono text-[10px] font-bold uppercase ${item.stok < 5 ? 'text-red-500' : 'text-gray-400'}`}>QTY: {item.stok}</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </main>

                {/* Right Panel: Cart & Checkout (1/3) */}
                <aside className="w-[400px] bg-white border-l border-gray-200 flex flex-col flex-shrink-0 relative z-20">
                    {/* Cart Header */}
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/80 backdrop-blur-sm">
                        <h2 className="text-xl font-black uppercase tracking-tight text-gray-900 flex items-center gap-2">
                            <span className="material-symbols-outlined text-orange-600">shopping_cart</span>
                            Cart
                        </h2>
                        <button onClick={() => setCart([])} className="text-gray-500 font-mono text-[10px] uppercase tracking-widest font-bold hover:text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1 border border-gray-200 hover:border-red-200 bg-white px-3 py-1.5 rounded-full shadow-sm">
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                            Clear
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3 bg-white">
                        {cart.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 opacity-80">
                                <span className="material-symbols-outlined text-[48px] mb-2">shopping_basket</span>
                                <span className="font-mono text-xs uppercase tracking-widest font-bold text-gray-400">Cart is empty</span>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="bg-white border border-gray-200 p-4 flex flex-col gap-3 relative group hover:border-orange-300 hover:shadow-md transition-all rounded-xl">
                                    <div className="flex justify-between items-start">
                                        <div className="pr-6">
                                            <h4 className="font-bold text-sm text-gray-900 leading-tight mb-1">{item.nama_merchandise}</h4>
                                            <p className="text-xs font-mono text-gray-500 font-bold">Rp {item.harga.toLocaleString('id-ID')}</p>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">close</span>
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                        <div className="flex items-center border border-gray-200 bg-gray-50 rounded-lg overflow-hidden">
                                            <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                                                <span className="material-symbols-outlined text-[16px]">remove</span>
                                            </button>
                                            <input readOnly className="w-10 h-8 text-center border-x border-gray-200 border-y-0 p-0 font-mono text-xs font-bold bg-white text-gray-900 focus:ring-0" type="text" value={item.qty} />
                                            <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                                                <span className="material-symbols-outlined text-[16px]">add</span>
                                            </button>
                                        </div>
                                        <span className="text-sm font-black text-orange-600 tracking-tighter">Rp {(item.harga * item.qty).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Customer & Payment Form */}
                    <div className="border-t border-gray-200 bg-gray-50 flex flex-col">
                        <div className="p-6 flex flex-col gap-6 max-h-[350px] overflow-y-auto no-scrollbar">
                            
                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">Customer Name <span className="text-orange-500">*</span></label>
                                <input value={namaPembeli} onChange={e => setNamaPembeli(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-mono text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 shadow-sm" placeholder="Enter name..." required type="text" />
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="font-mono text-xs font-bold uppercase text-gray-700">Register Seminar?</span>
                                    <div className="relative">
                                        <input className="sr-only peer" type="checkbox" checked={isSeminar} onChange={(e) => setIsSeminar(e.target.checked)} />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-orange-500 transition-colors shadow-inner"></div>
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                                    </div>
                                </label>
                                {isSeminar && (
                                    <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-gray-100">
                                        <div>
                                            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 block">Email Address</label>
                                            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm focus:border-orange-500 focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-900" placeholder="user@domain.com" type="email" />
                                        </div>
                                        <div>
                                            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 block">Phone Number</label>
                                            <input value={nomorTelepon} onChange={e => setNomorTelepon(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm focus:border-orange-500 focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-900" placeholder="08..." type="tel" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">Payment Gateway</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 3, label: 'CASH' },
                                        { id: 2, label: 'QRIS' },
                                        { id: 1, label: 'TRF' }
                                    ].map(method => (
                                        <label key={method.id} className="cursor-pointer">
                                            <input checked={metodePembayaran === method.id} onChange={() => setMetodePembayaran(method.id)} className="sr-only peer" name="payment" type="radio" value={method.id} />
                                            <div className="border border-gray-200 bg-white rounded-xl py-3 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500 peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-700 transition-all shadow-sm hover:border-gray-300">
                                                {method.label}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Summary & Action */}
                        <div className="p-6 bg-white border-t border-gray-200 flex flex-col gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                            <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                                <span>Items in Cart</span>
                                <span className="text-gray-900 bg-gray-100 px-2 py-0.5 rounded-full">{cart.reduce((s, c) => s + c.qty, 0)}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                                <span className="font-black text-gray-900 uppercase tracking-tighter">Total</span>
                                <span className="text-3xl font-black text-orange-600 tracking-tighter">Rp {total.toLocaleString('id-ID')}</span>
                            </div>
                            <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full bg-orange-500 text-white rounded-xl py-4 font-black uppercase tracking-widest text-sm hover:bg-orange-600 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-2 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-orange-500/30">
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
                        className="fixed inset-0 left-0 top-0 w-full h-full z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in"
                    >
                        <div 
                            onClick={(e) => e.stopPropagation()}
                            className="w-[450px] max-w-[90vw] bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl flex flex-col gap-8 relative"
                        >

                            <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900">Confirm Payment</h3>
                            
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">Payment Gateway</span>
                                    <span className="font-mono font-bold uppercase border border-orange-200 bg-orange-50 rounded-full px-3 py-1 text-xs text-orange-600 tracking-widest">
                                        {metodePembayaran === 3 ? 'CASH' : metodePembayaran === 2 ? 'QRIS' : 'TRANSFER'}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-end pb-4 border-b border-gray-100">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">Grand Total</span>
                                    <span className="text-3xl font-black text-orange-600 tracking-tighter">Rp {total.toLocaleString('id-ID')}</span>
                                </div>

                                {metodePembayaran === 3 ? (
                                    <div className="flex flex-col gap-3 mt-2">
                                        <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">Cash Given</label>
                                        <div className="flex items-center shadow-sm rounded-xl overflow-hidden border border-gray-200">
                                            <span className="bg-gray-50 border-r border-gray-200 px-4 py-3 font-mono font-bold text-gray-500">Rp</span>
                                            <input 
                                                value={uangDiberikanModal} 
                                                onChange={e => setUangDiberikanModal(e.target.value)} 
                                                type="number" 
                                                min="0" 
                                                className="w-full px-4 py-3 bg-white border-0 focus:ring-2 focus:ring-inset focus:ring-orange-500 outline-none transition-all placeholder:text-gray-300 font-mono font-bold text-lg text-gray-900" 
                                                placeholder="0" 
                                                autoFocus
                                            />
                                        </div>
                                        
                                        <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-100">
                                            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">Change</span>
                                            {(() => {
                                                const modalKembalian = Number(uangDiberikanModal) - total;
                                                return (
                                                    <span className={`text-xl font-black tracking-tighter ${modalKembalian < 0 ? 'text-red-500' : 'text-gray-900'}`}>
                                                        {modalKembalian < 0 ? 'Insufficient ' : ''}Rp {Math.abs(modalKembalian).toLocaleString('id-ID')}
                                                    </span>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs font-mono text-gray-500 font-bold uppercase tracking-widest leading-loose">
                                        Processing via {metodePembayaran === 2 ? 'QRIS' : 'Bank Transfer'}. Please verify gateway receipt before confirming.
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-gray-100">
                                <button 
                                    onClick={() => setShowCheckoutModal(false)} 
                                    className="px-6 py-3 border border-gray-200 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={confirmCheckout} 
                                    disabled={metodePembayaran === 3 && Number(uangDiberikanModal) < total}
                                    className="px-6 py-3 bg-orange-500 rounded-xl text-white font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-orange-500/30"
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
