import React, { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import axios from 'axios';

export default function POSIndex({ merchandise }) {
    const [products, setProducts] = useState(merchandise);
    const [cart, setCart] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [showSeminar, setShowSeminar] = useState(false);
    const [seminarData, setSeminarData] = useState({ email: '', nomor_telepon: '' });
    const [paymentMethod, setPaymentMethod] = useState(1);
    const [processing, setProcessing] = useState(false);

    // Initialize Echo if configured
    useEffect(() => {
        if (window.Echo) {
            window.Echo.channel('pos-channel')
                .listen('.stock.updated', (e) => {
                    setProducts(prevProducts => prevProducts.map(p => 
                        p.id_merchandise === e.id_merchandise 
                            ? { ...p, stok: e.stok } 
                            : p
                    ));
                });
        }
    }, []);

    const addToCart = (product) => {
        if (product.stok <= 0) return;
        
        setCart(prev => {
            const existing = prev.find(item => item.id_merchandise === product.id_merchandise);
            if (existing) {
                if (existing.jumlah >= product.stok) return prev;
                return prev.map(item => 
                    item.id_merchandise === product.id_merchandise 
                        ? { ...item, jumlah: item.jumlah + 1 } 
                        : item
                );
            }
            return [...prev, { ...product, jumlah: 1 }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.id_merchandise === id) {
                    const product = products.find(p => p.id_merchandise === id);
                    const newQty = Math.max(1, Math.min(item.jumlah + delta, product.stok));
                    return { ...item, jumlah: newQty };
                }
                return item;
            });
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id_merchandise !== id));
    };

    const totalItems = cart.reduce((acc, item) => acc + item.jumlah, 0);
    const grandTotal = cart.reduce((acc, item) => acc + (item.harga_merchandise * item.jumlah), 0);

    const handleCheckout = async () => {
        if (!customerName || cart.length === 0) return;
        setProcessing(true);
        
        try {
            await axios.post('/api/checkout', {
                pembeli: { nama_lengkap: customerName },
                seminar: showSeminar ? seminarData : null,
                id_metode: paymentMethod,
                cart: cart.map(item => ({
                    id_merchandise: item.id_merchandise,
                    jumlah: item.jumlah
                }))
            });
            
            // Success
            alert('Transaksi Berhasil!');
            setCart([]);
            setCustomerName('');
            setShowSeminar(false);
            setSeminarData({ email: '', nomor_telepon: '' });
        } catch (error) {
            alert('Gagal checkout: ' + (error.response?.data?.message || error.message));
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="bg-surface text-on-surface h-screen overflow-hidden flex flex-col font-body-md text-body-md">
            <Head title="Schematics POS Dashboard" />
            
            {/* TopNavBar */}
            <header className="bg-surface border-b border-outline-variant shadow-sm flex justify-between items-center h-16 px-8 w-full flex-shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <span className="font-headline-md font-bold text-primary">Schematics POS</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">KS</div>
                        <span className="font-medium">Kasir Terminal</span>
                    </div>
                </div>
            </header>

            {/* Main */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Nav */}
                <nav className="bg-surface-container-low border-r border-outline-variant flex flex-col py-6 w-64 flex-shrink-0">
                    <div className="px-4 pb-4 border-b border-outline-variant mb-2">
                        <h2 className="text-xl font-bold">Management</h2>
                    </div>
                    <div className="flex-1 flex flex-col gap-1 px-2">
                        <a href="#" className="bg-secondary-container text-on-secondary-container font-bold rounded-lg flex items-center gap-4 px-4 py-3">
                            <span>Cashier Dashboard</span>
                        </a>
                    </div>
                </nav>

                {/* Product Panel */}
                <main className="flex-1 flex flex-col min-w-0 bg-background">
                    <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 content-start">
                        {products.map(product => (
                            <button 
                                key={product.id_merchandise}
                                onClick={() => addToCart(product)}
                                disabled={product.stok <= 0}
                                className={`bg-surface-container-lowest border ${product.stok <= 0 ? 'border-red-300 opacity-50' : 'border-outline-variant hover:shadow-md'} rounded-lg overflow-hidden flex flex-col text-left transition-all active:scale-95`}
                            >
                                <div className="h-32 bg-surface-container w-full flex items-center justify-center p-4">
                                    <div className="text-4xl">🛍️</div>
                                </div>
                                <div className="p-3 flex flex-col flex-1 w-full">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-sm line-clamp-2">{product.tipe_merchandise}</h3>
                                        <span className="bg-surface-container-high px-1 py-0.5 rounded text-[10px] font-bold">{product.event?.nama_subevent || 'ALL'}</span>
                                    </div>
                                    <div className="mt-auto pt-3 flex justify-between items-end w-full">
                                        <span className="font-bold text-primary">Rp {Number(product.harga_merchandise).toLocaleString('id-ID')}</span>
                                        <span className={`text-sm ${product.stok <= 3 ? 'text-error font-bold' : 'text-on-surface-variant'}`}>
                                            Stok: {product.stok}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </main>

                {/* Cart Panel */}
                <aside className="w-[380px] bg-surface-container-lowest border-l border-outline-variant flex flex-col flex-shrink-0 z-20">
                    <div className="p-4 border-b border-outline-variant flex justify-between items-center">
                        <h2 className="font-bold text-lg">Keranjang ({totalItems})</h2>
                        <button onClick={() => setCart([])} className="text-error text-sm hover:bg-error-container p-1 rounded">Kosongkan</button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-background">
                        {cart.map(item => (
                            <div key={item.id_merchandise} className="bg-surface-container-lowest border border-outline-variant p-3 rounded-lg flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <h4 className="font-bold text-sm">{item.tipe_merchandise}</h4>
                                    <button onClick={() => removeFromCart(item.id_merchandise)} className="text-gray-400 hover:text-error">×</button>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center border border-outline-variant rounded">
                                        <button onClick={() => updateQuantity(item.id_merchandise, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-surface-container">-</button>
                                        <input readOnly value={item.jumlah} className="w-10 h-8 text-center border-x border-outline-variant border-y-0 text-sm bg-transparent" />
                                        <button onClick={() => updateQuantity(item.id_merchandise, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-surface-container">+</button>
                                    </div>
                                    <span className="font-bold">Rp {(item.harga_merchandise * item.jumlah).toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-outline-variant bg-surface-container-lowest flex flex-col">
                        <div className="p-4 flex flex-col gap-4 max-h-[400px] overflow-y-auto">
                            <div>
                                <label className="font-bold text-sm mb-1 block">Nama Pembeli *</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border rounded"
                                    value={customerName}
                                    onChange={e => setCustomerName(e.target.value)}
                                />
                            </div>

                            <div className="bg-surface-container-low border rounded-lg p-3">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="font-bold text-sm">Daftar Seminar BST?</span>
                                    <input 
                                        type="checkbox" 
                                        checked={showSeminar}
                                        onChange={e => setShowSeminar(e.target.checked)}
                                    />
                                </label>
                                {showSeminar && (
                                    <div className="mt-3 pt-3 border-t flex flex-col gap-3">
                                        <input type="email" placeholder="Email" className="p-2 border rounded" value={seminarData.email} onChange={e => setSeminarData({...seminarData, email: e.target.value})} />
                                        <input type="tel" placeholder="No. HP" className="p-2 border rounded" value={seminarData.nomor_telepon} onChange={e => setSeminarData({...seminarData, nomor_telepon: e.target.value})} />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="font-bold text-sm block mb-2">Metode Pembayaran</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[1, 2, 3].map(id => (
                                        <button 
                                            key={id}
                                            onClick={() => setPaymentMethod(id)}
                                            className={`p-2 border rounded text-sm ${paymentMethod === id ? 'bg-primary-container text-on-primary-container border-primary' : ''}`}
                                        >
                                            {id === 1 ? 'Transfer' : id === 2 ? 'QRIS' : 'Tunai'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-surface-container-low border-t border-outline-variant">
                            <div className="flex justify-between items-end mb-4">
                                <span className="font-bold text-xl">Grand Total</span>
                                <span className="text-2xl font-bold text-primary">Rp {grandTotal.toLocaleString('id-ID')}</span>
                            </div>
                            <button 
                                onClick={handleCheckout}
                                disabled={processing || cart.length === 0 || !customerName}
                                className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Proses Pembayaran'}
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
