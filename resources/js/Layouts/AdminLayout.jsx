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
            return "bg-orange-50 text-orange-600 font-bold px-4 py-3 cursor-pointer transition-all flex items-center gap-4 rounded-xl border border-orange-100 shadow-sm mx-4";
        }
        return "text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all px-4 py-3 cursor-pointer flex items-center gap-4 rounded-xl mx-4";
    };

    return (
        <div className="bg-gray-50 text-gray-900 h-screen overflow-hidden flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-600">
            <Head>
                <title>{title}</title>
            </Head>
            
            {/* TopNavBar */}
            <header className="bg-white border-b border-gray-200 shadow-sm flex justify-between items-center h-16 px-8 w-full flex-shrink-0 relative z-50">
                <div className="flex items-center gap-4">
                    <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full object-cover shadow-sm border border-gray-100" />
                    <span className="text-[20px] font-black uppercase tracking-widest text-gray-900">Schematics<span className="text-orange-500">/</span>POS</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] hidden md:flex font-bold">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-sm shadow-orange-500/50"></span>
                        <span>{currentTime}</span>
                    </div>
                    <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-50 border border-orange-100 text-orange-600 rounded-full flex items-center justify-center font-mono text-[12px] font-bold uppercase shadow-sm">
                            {auth?.user?.nama_lengkap?.[0] || 'A'}
                        </div>
                        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest hidden md:block">
                            Staff_<span className="text-gray-900 font-bold">{auth?.user?.nama_lengkap || 'Admin'}</span>
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* SideNavBar / Left Menu */}
                <nav className="bg-white border-r border-gray-200 flex flex-col py-6 w-64 flex-shrink-0 overflow-y-auto relative z-10">
                    <div className="px-8 mb-6">
                        <div className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em] font-bold">Navigation</div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <Link href="/dashboard" className={getLinkClass('/dashboard')}>
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/dashboard') ? '' : 'text-gray-400 transition-colors'}`}>dashboard</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest">Dashboard</span>
                        </Link>
                        <Link href="/pos" className={getLinkClass('/pos')}>
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/pos') ? '' : 'text-gray-400 transition-colors'}`}>point_of_sale</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest">POS Terminal</span>
                        </Link>
                        <Link href="/merchandise" className={getLinkClass('/merchandise')}>
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/merchandise') ? '' : 'text-gray-400 transition-colors'}`}>inventory_2</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest">Merchandise</span>
                        </Link>
                        <Link href="/transactions" className={getLinkClass('/transactions')}>
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/transactions') ? '' : 'text-gray-400 transition-colors'}`}>receipt_long</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest">Transactions</span>
                        </Link>
                        <Link href="/seminar" className={getLinkClass('/seminar')}>
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/seminar') ? '' : 'text-gray-400 transition-colors'}`}>group</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest">Seminar</span>
                        </Link>
                        <Link href="/staff" className={getLinkClass('/staff')}>
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/staff') ? '' : 'text-gray-400 transition-colors'}`}>manage_accounts</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest">User Mgmt</span>
                        </Link>
                        <Link href="/event" className={getLinkClass('/event')}>
                            <span className={`material-symbols-outlined text-[20px] ${isActive('/event') ? '' : 'text-gray-400 transition-colors'}`}>event</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest">Event</span>
                        </Link>
                    </div>
                    
                    <div className="mt-auto pt-6 px-4">
                        <Link href="/staff/logout" method="post" as="button" className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 transition-all flex items-center justify-center gap-3 px-4 py-3 rounded-xl group shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">logout</span>
                            <span className="font-mono text-[12px] uppercase tracking-widest font-bold">Sign Out</span>
                        </Link>
                    </div>
                </nav>

                {/* Main Viewport */}
                <main className="flex-1 flex flex-col min-w-0 bg-gray-50/50 relative z-10 overflow-y-auto overflow-x-hidden p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
