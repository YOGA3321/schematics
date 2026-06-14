import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, title = "Schematics POS", auth }) {
    const { url } = usePage();
    const [currentTime, setCurrentTime] = useState("");
    
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            setCurrentTime(now.toLocaleDateString('id-ID', options).replace(/\./g, ':'));
        };
        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    const isActive = (path) => url.startsWith(path);

    const getLinkClass = (path) => {
        if (isActive(path)) {
            return "bg-orange-500 text-zinc-950 font-bold px-4 py-3 cursor-pointer transition-all flex items-center gap-4 group";
        }
        return "text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 transition-all px-4 py-3 cursor-pointer flex items-center gap-4 group";
    };

    return (
        <div className="bg-zinc-950 text-zinc-50 h-screen overflow-hidden flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-500">
            <Head>
                <title>{title}</title>
            </Head>
            
            {/* TopNavBar */}
            <header className="bg-zinc-950 border-b border-zinc-900 shadow-sm flex justify-between items-center h-16 px-8 w-full flex-shrink-0 relative z-50">
                <div className="flex items-center gap-4">
                    <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-none object-cover shadow-sm grayscale opacity-80 border border-zinc-800" />
                    <span className="text-[20px] font-black uppercase tracking-widest text-zinc-100">Schematics<span className="text-orange-500">/</span>POS</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] hidden md:flex">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        <span>{currentTime}</span>
                    </div>
                    <div className="h-6 w-px bg-zinc-800 hidden md:block"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 text-orange-500 flex items-center justify-center font-mono text-[12px] font-bold uppercase">
                            {auth?.user?.nama_lengkap?.[0] || 'A'}
                        </div>
                        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest hidden md:block">
                            Staff_<span className="text-zinc-100">{auth?.user?.nama_lengkap || 'Admin'}</span>
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}></div>
                
                {/* SideNavBar / Left Menu */}
                <nav className="bg-zinc-950 border-r border-zinc-900 flex flex-col py-6 w-64 flex-shrink-0 overflow-y-auto relative z-10">
                    <div className="px-6 mb-6">
                        <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Navigation</div>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <Link href="/dashboard" className={getLinkClass('/dashboard')}>
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/dashboard') ? '' : 'text-zinc-600 group-hover:text-orange-500 transition-colors'}`}>dashboard</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest">Dashboard</span>
                        </Link>
                        <Link href="/pos" className={getLinkClass('/pos')}>
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/pos') ? '' : 'text-zinc-600 group-hover:text-orange-500 transition-colors'}`}>point_of_sale</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest">POS</span>
                        </Link>
                        <Link href="/merchandise" className={getLinkClass('/merchandise')}>
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/merchandise') ? '' : 'text-zinc-600 group-hover:text-orange-500 transition-colors'}`}>inventory_2</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest">Merchandise</span>
                        </Link>
                        <Link href="/transactions" className={getLinkClass('/transactions')}>
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/transactions') ? '' : 'text-zinc-600 group-hover:text-orange-500 transition-colors'}`}>receipt_long</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest">Transactions</span>
                        </Link>
                        <Link href="/seminar" className={getLinkClass('/seminar')}>
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/seminar') ? '' : 'text-zinc-600 group-hover:text-orange-500 transition-colors'}`}>group</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest">Seminar</span>
                        </Link>
                    </div>
                    
                    <div className="mt-auto pt-6 px-4">
                        <Link href="/staff/logout" method="post" as="button" className="w-full border border-zinc-800 hover:border-red-500 hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all flex items-center gap-4 px-4 py-3 group">
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest font-bold">Logout</span>
                        </Link>
                    </div>
                </nav>

                {/* Main Viewport */}
                <main className="flex-1 flex flex-col min-w-0 bg-zinc-950/50 backdrop-blur-3xl relative z-10 overflow-y-auto overflow-x-hidden p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
