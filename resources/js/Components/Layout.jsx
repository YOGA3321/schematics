import React from 'react';
import { useTheme } from './ThemeContext';
import { Link } from '@inertiajs/react';

export default function Layout({ children }) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 glass dark:glass-dark px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-400 bg-clip-text text-transparent">
                        POS System
                    </div>
                    <div className="hidden md:flex gap-6">
                        <Link href="/dashboard" className="hover:text-blue-500 transition font-medium">Dashboard</Link>
                        <Link href="/merchandise" className="hover:text-blue-500 transition font-medium">Merchandise</Link>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDark ? (
                            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        ) : (
                            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                        )}
                    </button>
                    <Link 
                        href="/staff/logout" 
                        method="post" 
                        as="button" 
                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 font-medium hover:bg-red-500/20 dark:hover:bg-red-500/30 transition"
                    >
                        Logout
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 p-6 max-w-7xl mx-auto min-h-screen">
                {children}
            </main>
        </div>
    );
}
