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
            return "bg-secondary-container text-on-secondary-container font-bold rounded-lg mx-2 flex items-center gap-4 px-4 py-2 cursor-pointer active:opacity-80";
        }
        return "text-on-surface-variant hover:bg-surface-container-high transition-all mx-2 rounded-lg flex items-center gap-4 px-4 py-2 cursor-pointer active:opacity-80";
    };

    return (
        <div className="bg-surface text-on-surface h-screen overflow-hidden flex flex-col font-body-md text-[16px]">
            <Head>
                <title>{title}</title>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </Head>
            
            {/* TopNavBar */}
            <header className="bg-surface border-b border-outline-variant shadow-sm flex justify-between items-center h-16 px-8 w-full flex-shrink-0 relative z-10">
                <div className="flex items-center gap-3">
                    <img src="/logo.jpeg" alt="Logo" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                    <span className="font-headline-md text-[20px] font-bold text-primary">Schematics</span>
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
                    <div className="flex-1 flex flex-col gap-1 mt-4">
                        <Link href="/dashboard" className={getLinkClass('/dashboard')}>
                            <span className="material-symbols-outlined" style={isActive('/dashboard') ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
                            <span className="font-label-md text-[14px]">Dashboard</span>
                        </Link>
                        <Link href="/pos" className={getLinkClass('/pos')}>
                            <span className="material-symbols-outlined" style={isActive('/pos') ? { fontVariationSettings: "'FILL' 1" } : {}}>point_of_sale</span>
                            <span className="font-label-md text-[14px]">Point of Sale</span>
                        </Link>
                        <Link href="/merchandise" className={getLinkClass('/merchandise')}>
                            <span className="material-symbols-outlined" style={isActive('/merchandise') ? { fontVariationSettings: "'FILL' 1" } : {}}>inventory_2</span>
                            <span className="font-label-md text-[14px]">Merchandise</span>
                        </Link>
                        <Link href="/transactions" className={getLinkClass('/transactions')}>
                            <span className="material-symbols-outlined" style={isActive('/transactions') ? { fontVariationSettings: "'FILL' 1" } : {}}>receipt_long</span>
                            <span className="font-label-md text-[14px]">Transaction History</span>
                        </Link>
                        <Link href="/seminar" className={getLinkClass('/seminar')}>
                            <span className="material-symbols-outlined" style={isActive('/seminar') ? { fontVariationSettings: "'FILL' 1" } : {}}>group</span>
                            <span className="font-label-md text-[14px]">Peserta Seminar</span>
                        </Link>
                    </div>
                    <div className="mt-auto border-t border-outline-variant pt-2 flex flex-col gap-1">
                        <Link href="/staff/logout" method="post" as="button" className="text-error hover:bg-error-container hover:text-on-error-container transition-all mx-2 rounded-lg flex items-center gap-4 px-4 py-2 cursor-pointer active:opacity-80">
                            <span className="material-symbols-outlined">logout</span>
                            <span className="font-label-md text-[14px] font-bold">Logout</span>
                        </Link>
                    </div>
                </nav>

                {/* Main Viewport */}
                <main className="flex-1 flex flex-col min-w-0 bg-surface" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/always-grey.png')" }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
