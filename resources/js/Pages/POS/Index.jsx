import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function POSIndex({ auth, merchandises = [] }) {
    const [cart, setCart] = useState([]);
    const [currentTime, setCurrentTime] = useState("");
    const [isSeminar, setIsSeminar] = useState(false);
    
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            setCurrentTime(now.toLocaleDateString('id-ID', options).replace(/\./g, ':'));
        };
        updateClock();
        const timer = setInterval(updateClock, 60000);
        return () => clearInterval(timer);
    }, []);

    // Fallback if empty
    const displayItems = merchandises.length > 0 ? merchandises : [
        { id: 1, nama_merchandise: 'Kaos Schematics 2023 - L', harga: 150000, stok: 15, asal_subevent: 'BST', sku: 'BST-TS-L' },
        { id: 2, nama_merchandise: 'Tote Bag Kanvas Premium', harga: 85000, stok: 42, asal_subevent: 'NPC', sku: 'NPC-TB-01' },
        { id: 3, nama_merchandise: 'Mug Keramik NLC', harga: 45000, stok: 3, asal_subevent: 'NLC', sku: 'NLC-MG-01' },
    ];

    const addToCart = (item) => {
        const existing = cart.find(c => c.id === item.id);
        if (existing) {
            setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
    };

    const updateQty = (id, delta) => {
        setCart(cart.map(c => {
            if (c.id === id) {
                const newQty = c.qty + delta;
                return newQty > 0 ? { ...c, qty: newQty } : c;
            }
            return c;
        }));
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(c => c.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);

    return (
        <div className="bg-surface text-on-surface h-screen overflow-hidden flex flex-col font-body-md text-[16px]">
            <Head>
                <title>Schematics POS - Cashier Dashboard</title>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </Head>
            
            {/* TopNavBar */}
            <header className="bg-surface border-b border-outline-variant shadow-sm flex justify-between items-center h-16 px-8 w-full flex-shrink-0 relative z-10">
                <div className="flex items-center gap-4">
                    <span className="font-headline-md text-[20px] font-bold text-primary">Schematics POS</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1 text-on-surface-variant font-label-md text-[14px]">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>calendar_today</span>
                        <span>{currentTime}</span>
                    </div>
                    <div className="h-6 w-px bg-outline-variant"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-lg text-[14px] font-bold">
                            {auth?.user?.nama_lengkap?.[0] || 'A'}
                        </div>
                        <span className="font-label-md text-[14px] text-on-surface font-medium">Staff: {auth?.user?.nama_lengkap || 'Admin'}</span>
                    </div>
                    <button className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-100">
                        <span className="material-symbols-outlined">schedule</span>
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                
                {/* SideNavBar / Left Menu */}
                <nav className="bg-surface-container-low border-r border-outline-variant flex flex-col py-6 gap-2 w-64 flex-shrink-0 overflow-y-auto">
                    <div className="px-4 pb-4 border-b border-outline-variant mb-2">
                        <h2 className="text-[24px] font-bold text-on-surface">Management</h2>
                        <p className="font-label-md text-[14px] text-on-surface-variant mt-1">Terminal #01</p>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <a className="bg-secondary-container text-on-secondary-container font-bold rounded-lg mx-2 flex items-center gap-4 px-4 py-2 cursor-pointer active:opacity-80">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>point_of_sale</span>
                            <span className="font-label-md text-[14px]">Cashier Dashboard</span>
                        </a>
                        <a className="text-on-surface-variant hover:bg-surface-container-high transition-all mx-2 rounded-lg flex items-center gap-4 px-4 py-2 cursor-pointer active:opacity-80">
                            <span className="material-symbols-outlined">inventory_2</span>
                            <span className="font-label-md text-[14px]">Merchandise</span>
                        </a>
                        <a className="text-on-surface-variant hover:bg-surface-container-high transition-all mx-2 rounded-lg flex items-center gap-4 px-4 py-2 cursor-pointer active:opacity-80">
                            <span className="material-symbols-outlined">receipt_long</span>
                            <span className="font-label-md text-[14px]">Transaction History</span>
                        </a>
                    </div>
                    <div className="mt-auto border-t border-outline-variant pt-2 flex flex-col gap-1">
                        <Link href="/staff/logout" method="post" as="button" className="text-error hover:bg-error-container hover:text-on-error-container transition-all mx-2 rounded-lg flex items-center gap-4 px-4 py-2 cursor-pointer active:opacity-80">
                            <span className="material-symbols-outlined">logout</span>
                            <span className="font-label-md text-[14px] font-bold">Logout</span>
                        </Link>
                    </div>
                </nav>

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
                                />
                            </div>
                            <button className="bg-surface-container border border-outline-variant rounded-full p-2 text-on-surface-variant hover:bg-surface-variant transition-colors">
                                <span className="material-symbols-outlined">barcode_scanner</span>
                            </button>
                        </div>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                            <button className="px-4 py-1 rounded-full bg-primary text-on-primary font-label-md text-[14px] font-medium flex-shrink-0">Semua</button>
                            <button className="px-4 py-1 rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors font-label-md text-[14px] font-medium flex-shrink-0">BST</button>
                            <button className="px-4 py-1 rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors font-label-md text-[14px] font-medium flex-shrink-0">NPC</button>
                            <button className="px-4 py-1 rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors font-label-md text-[14px] font-medium flex-shrink-0">NLC</button>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 xl:grid-cols-3 gap-4 content-start">
                        {displayItems.map(item => (
                            <button 
                                key={item.id} 
                                onClick={() => addToCart(item)}
                                className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col text-left hover:shadow-md transition-shadow group active:scale-[0.98] cursor-pointer relative"
                            >
                                {item.stok < 5 && (
                                    <div className="absolute top-2 left-2 z-10 bg-error text-on-error px-1 py-0.5 rounded text-[10px] font-bold shadow-sm">SISA {item.stok}</div>
                                )}
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
                                <input className="w-full px-4 py-2 bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline" placeholder="Masukkan nama" required type="text" />
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
                                            <input className="w-full px-4 py-2 bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline" placeholder="email@contoh.com" type="email" />
                                        </div>
                                        <div>
                                            <label className="font-label-md text-[14px] font-medium text-on-surface-variant mb-1 block">No. HP</label>
                                            <input className="w-full px-4 py-2 bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline" placeholder="08..." type="tel" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Payment Method */}
                            <div className="flex flex-col gap-2">
                                <label className="font-label-md text-[14px] font-bold text-on-surface">Metode Pembayaran</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <label className="cursor-pointer">
                                        <input defaultChecked className="sr-only peer" name="payment" type="radio" value="tunai" />
                                        <div className="border border-outline-variant rounded-lg p-2 text-center font-label-md text-[14px] font-medium peer-checked:border-primary peer-checked:bg-primary-container peer-checked:text-on-primary-container hover:bg-surface-container transition-all">
                                            Tunai
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input className="sr-only peer" name="payment" type="radio" value="qris" />
                                        <div className="border border-outline-variant rounded-lg p-2 text-center font-label-md text-[14px] font-medium peer-checked:border-primary peer-checked:bg-primary-container peer-checked:text-on-primary-container hover:bg-surface-container transition-all">
                                            QRIS
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input className="sr-only peer" name="payment" type="radio" value="transfer" />
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
                            <div className="flex justify-between items-end">
                                <span className="font-headline-md text-[20px] font-bold text-on-surface">Grand Total</span>
                                <span className="text-[28px] font-bold text-primary tracking-tight">Rp {total.toLocaleString('id-ID')}</span>
                            </div>
                            <button disabled={cart.length === 0} className="w-full bg-primary text-on-primary py-4 rounded-lg font-headline-md text-[20px] font-bold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                Proses Pembayaran
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
