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
    const kembalian = Number(uangDiberikan) - total;

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
                    confirmButtonText: 'OK'
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
                Swal.fire('Error', err.response?.data?.message || 'Terjadi kesalahan saat checkout.', 'error');
            });
    };

    return (
        <AdminLayout title="Schematics POS - Point of Sale" auth={auth}>
            <div className="flex flex-1 w-full h-full overflow-hidden">
                {/* Product Panel (2/3) */}
                <main className="flex-1 flex flex-col min-w-0 bg-surface" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/always-grey.png')" }}>
                    {/* Search & Filters */}
                    <div className="p-6 pb-2 bg-surface/90 backdrop-blur-sm border-b border-outline-variant sticky top-0 z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                                <input 
                                    className="w-full pl-12 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-full font-body-md text-[16px] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline" 
                                    placeholder="Cari nama produk atau SKU..." 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="bg-surface-container border border-outline-variant rounded-full p-2 text-on-surface-variant hover:bg-surface-variant transition-colors">
                                <span className="material-symbols-outlined">barcode_scanner</span>
                            </button>
                        </div>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                            <button onClick={() => setActiveFilter('Semua')} className={`px-4 py-1 rounded-full font-label-md text-[14px] font-medium flex-shrink-0 transition-colors ${activeFilter === 'Semua' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}>Semua</button>
                            <button onClick={() => setActiveFilter('BST')} className={`px-4 py-1 rounded-full font-label-md text-[14px] font-medium flex-shrink-0 transition-colors ${activeFilter === 'BST' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}>BST</button>
                            <button onClick={() => setActiveFilter('NPC')} className={`px-4 py-1 rounded-full font-label-md text-[14px] font-medium flex-shrink-0 transition-colors ${activeFilter === 'NPC' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}>NPC</button>
                            <button onClick={() => setActiveFilter('NLC')} className={`px-4 py-1 rounded-full font-label-md text-[14px] font-medium flex-shrink-0 transition-colors ${activeFilter === 'NLC' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}>NLC</button>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 xl:grid-cols-3 gap-4 content-start">
                        {displayItems.map(item => (
                            <button 
                                key={item.id} 
                                onClick={() => addToCart(item)}
                                disabled={item.stok === 0}
                                className={`bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col text-left relative transition-all ${item.stok === 0 ? 'opacity-55 cursor-not-allowed' : 'hover:shadow-md active:scale-[0.98] cursor-pointer group'}`}
                            >
                                {item.stok === 0 ? (
                                    <div className="absolute top-2 left-2 z-10 bg-outline text-surface-container-lowest px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">HABIS</div>
                                ) : item.stok < 5 ? (
                                    <div className="absolute top-2 left-2 z-10 bg-error text-on-error px-1 py-0.5 rounded text-[10px] font-bold shadow-sm">SISA {item.stok}</div>
                                ) : null}
                                <div className="h-40 bg-surface-container w-full relative overflow-hidden flex items-center justify-center">
                                    <div className="w-full h-full bg-surface-variant flex items-center justify-center group-hover:bg-surface-dim transition-colors">
                                        <span className="material-symbols-outlined text-outline text-4xl">inventory_2</span>
                                    </div>
                                </div>
                                <div className="p-2 flex flex-col gap-1 flex-1">
                                    <div className="flex justify-between items-start gap-1">
                                        <h3 className="font-label-md text-[14px] font-bold text-on-surface line-clamp-2 leading-tight">{item.nama_merchandise}</h3>
                                        <span className="bg-surface-container-high px-1 py-0.5 rounded text-on-surface-variant text-[10px] font-bold leading-none shrink-0 mt-1">{item.asal_subevent}</span>
                                    </div>
                                    <p className="font-data-mono text-[12px] text-on-surface-variant">SKU: {item.sku || `SKU-0${item.id}`}</p>
                                    <div className="mt-auto pt-2 flex justify-between items-end">
                                        <span className="font-label-lg text-[16px] font-bold text-primary">Rp {item.harga.toLocaleString('id-ID')}</span>
                                        <span className={`font-label-md text-[14px] font-medium ${item.stok < 5 ? 'text-error font-bold' : 'text-on-surface-variant'}`}>Stok: {item.stok}</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </main>

                {/* Right Panel: Cart & Checkout (1/3) */}
                <aside className="w-[380px] bg-surface-container-lowest border-l border-outline-variant flex flex-col flex-shrink-0 z-20 shadow-[-4px_0_15px_-5px_rgba(0,0,0,0.05)] relative">
                    {/* Cart Header */}
                    <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
                        <h2 className="text-[20px] font-bold text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined">shopping_cart</span>
                            Keranjang
                        </h2>
                        <button onClick={() => setCart([])} className="text-error font-label-md text-[14px] font-medium hover:bg-error-container p-1 rounded transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                            Kosongkan
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-background">
                        {cart.length === 0 ? (
                            <div className="flex-1 flex items-center justify-center text-outline font-medium text-[14px]">Keranjang kosong</div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="bg-surface-container-lowest border border-outline-variant p-2 rounded-lg flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-label-md text-[14px] font-bold text-on-surface leading-tight">{item.nama_merchandise}</h4>
                                            <p className="text-[14px] font-bold text-primary mt-1">Rp {item.harga.toLocaleString('id-ID')}</p>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-on-surface-variant hover:text-error transition-colors p-1">
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <div className="flex items-center border border-outline-variant rounded bg-surface-container-lowest">
                                            <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors rounded-l active:bg-surface-variant">
                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>remove</span>
                                            </button>
                                            <input readOnly className="w-10 h-8 text-center border-x border-outline-variant border-y-0 p-0 font-data-mono text-[14px] font-bold bg-transparent focus:ring-0" type="text" value={item.qty} />
                                            <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors rounded-r active:bg-surface-variant">
                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                                            </button>
                                        </div>
                                        <span className="text-[14px] font-bold text-on-surface">Rp {(item.harga * item.qty).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Customer & Payment Form */}
                    <div className="border-t border-outline-variant bg-surface-container-lowest flex flex-col">
                        <div className="p-4 flex flex-col gap-4 max-h-[400px] overflow-y-auto no-scrollbar">
                            {/* Customer Details */}
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-[14px] font-bold text-on-surface">Nama Pembeli <span className="text-error">*</span></label>
                                <input value={namaPembeli} onChange={e => setNamaPembeli(e.target.value)} className="w-full px-4 py-2 bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline" placeholder="Masukkan nama" required type="text" />
                            </div>

                            {/* Seminar Toggle */}
                            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-2">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="font-label-md text-[14px] font-bold text-on-surface">Daftar Seminar BST?</span>
                                    <div className="relative">
                                        <input className="sr-only peer" type="checkbox" checked={isSeminar} onChange={(e) => setIsSeminar(e.target.checked)} />
                                        <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:bg-primary transition-colors"></div>
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-surface-container-lowest rounded-full transition-transform peer-checked:translate-x-5"></div>
                                    </div>
                                </label>
                                {isSeminar && (
                                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-outline-variant">
                                        <div>
                                            <label className="font-label-md text-[14px] font-medium text-on-surface-variant mb-1 block">Email</label>
                                            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline" placeholder="email@contoh.com" type="email" />
                                        </div>
                                        <div>
                                            <label className="font-label-md text-[14px] font-medium text-on-surface-variant mb-1 block">No. HP</label>
                                            <input value={nomorTelepon} onChange={e => setNomorTelepon(e.target.value)} className="w-full px-4 py-2 bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline" placeholder="08..." type="tel" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Payment Method */}
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-[14px] font-bold text-on-surface">Metode Pembayaran</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <label className="cursor-pointer">
                                        <input checked={metodePembayaran === 3} onChange={() => setMetodePembayaran(3)} className="sr-only peer" name="payment" type="radio" value="3" />
                                        <div className="border border-outline-variant rounded-lg p-2 text-center font-label-md text-[14px] font-medium peer-checked:border-primary peer-checked:bg-primary-container peer-checked:text-on-primary-container hover:bg-surface-container transition-all">
                                            Tunai
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input checked={metodePembayaran === 2} onChange={() => setMetodePembayaran(2)} className="sr-only peer" name="payment" type="radio" value="2" />
                                        <div className="border border-outline-variant rounded-lg p-2 text-center font-label-md text-[14px] font-medium peer-checked:border-primary peer-checked:bg-primary-container peer-checked:text-on-primary-container hover:bg-surface-container transition-all">
                                            QRIS
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input checked={metodePembayaran === 1} onChange={() => setMetodePembayaran(1)} className="sr-only peer" name="payment" type="radio" value="1" />
                                        <div className="border border-outline-variant rounded-lg p-2 text-center font-label-md text-[14px] font-medium peer-checked:border-primary peer-checked:bg-primary-container peer-checked:text-on-primary-container hover:bg-surface-container transition-all">
                                            Transfer
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Summary & Action */}
                        <div className="p-4 bg-surface-container-low border-t border-outline-variant flex flex-col gap-4">
                            <div className="flex justify-between items-center font-label-md text-[14px] text-on-surface-variant">
                                <span>Total Item</span>
                                <span className="font-bold">{cart.reduce((s, c) => s + c.qty, 0)} Item</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-outline-variant pb-2">
                                <span className="font-headline-md text-[16px] font-bold text-on-surface">Grand Total</span>
                                <span className="text-[20px] font-bold text-primary tracking-tight">Rp {total.toLocaleString('id-ID')}</span>
                            </div>
                            <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full bg-primary text-on-primary py-4 rounded-lg font-headline-md text-[20px] font-bold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                Proses Pembayaran
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Checkout Confirmation Modal */}
            {showCheckoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl shadow-xl flex flex-col gap-6 relative">
                        <h3 className="text-xl font-bold text-on-surface">Konfirmasi Pembayaran</h3>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center text-sm text-on-surface-variant pb-2 border-b border-outline-variant">
                                <span>Metode Pembayaran</span>
                                <span className="font-bold uppercase bg-surface-container px-2 py-0.5 rounded text-xs text-primary">
                                    {metodePembayaran === 3 ? 'Tunai' : metodePembayaran === 2 ? 'QRIS' : 'Transfer'}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-on-surface-variant">Grand Total</span>
                                <span className="text-2xl font-black text-primary">Rp {total.toLocaleString('id-ID')}</span>
                            </div>

                            {metodePembayaran === 3 ? (
                                <div className="flex flex-col gap-2 mt-2">
                                    <label className="text-sm font-bold text-on-surface">Uang Diberikan</label>
                                    <div className="flex items-center">
                                        <span className="bg-surface-container border border-outline-variant border-r-0 px-3 py-2 rounded-l font-bold text-on-surface-variant">Rp</span>
                                        <input 
                                            value={uangDiberikanModal} 
                                            onChange={e => setUangDiberikanModal(e.target.value)} 
                                            type="number" 
                                            min="0" 
                                            className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-r focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline font-data-mono font-bold text-[16px]" 
                                            placeholder="0" 
                                            autoFocus
                                        />
                                    </div>
                                    
                                    <div className="flex justify-between items-end mt-2 pt-2 border-t border-outline-variant">
                                        <span className="text-sm text-on-surface-variant">Kembalian</span>
                                        {(() => {
                                            const modalKembalian = Number(uangDiberikanModal) - total;
                                            return (
                                                <span className={`text-xl font-bold ${modalKembalian < 0 ? 'text-error' : 'text-primary'}`}>
                                                    {modalKembalian < 0 ? 'Kurang ' : ''}Rp {Math.abs(modalKembalian).toLocaleString('id-ID')}
                                                </span>
                                            );
                                        })()}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant text-sm text-on-surface-variant">
                                    Pembayaran menggunakan {metodePembayaran === 2 ? 'QRIS' : 'Transfer Bank'}. Pastikan dana sudah diterima sebelum konfirmasi.
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button 
                                onClick={() => setShowCheckoutModal(false)} 
                                className="px-4 py-2 border border-outline-variant rounded-lg font-medium text-sm text-on-surface-variant hover:bg-surface-container transition-colors"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={confirmCheckout} 
                                disabled={metodePembayaran === 3 && Number(uangDiberikanModal) < total}
                                className="px-5 py-2 bg-primary text-on-primary rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Konfirmasi & Bayar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
