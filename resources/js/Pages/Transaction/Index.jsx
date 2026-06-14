import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Index({ transactions, filters = {}, auth }) {
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    const applyFilter = () => {
        router.get('/transactions', { start_date: startDate, end_date: endDate }, { preserveState: true });
    };

    const downloadPDF = () => {
        const query = new URLSearchParams();
        if (startDate) query.append('start_date', startDate);
        if (endDate) query.append('end_date', endDate);
        window.open(`/transactions/pdf?${query.toString()}`, '_blank');
    };

    return (
        <AdminLayout title="Transaction History" auth={auth}>
            <div className="flex flex-col gap-10 max-w-7xl mx-auto w-full">
                
                <div className="flex justify-between items-end border-b border-zinc-900 pb-6">
                    <div>
                        <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                            Ledger
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-100">Transaction History</h1>
                    </div>
                    
                    <div className="flex gap-4 items-end">
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Start Date</label>
                            <input 
                                type="date" 
                                value={startDate} 
                                onChange={e => setStartDate(e.target.value)}
                                className="bg-zinc-900/50 border border-zinc-800 rounded-none px-4 py-2 font-mono text-sm text-zinc-300 outline-none focus:border-orange-500 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">End Date</label>
                            <input 
                                type="date" 
                                value={endDate} 
                                onChange={e => setEndDate(e.target.value)}
                                className="bg-zinc-900/50 border border-zinc-800 rounded-none px-4 py-2 font-mono text-sm text-zinc-300 outline-none focus:border-orange-500 transition-colors"
                            />
                        </div>
                        <button onClick={applyFilter} className="bg-zinc-800 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700 border border-zinc-700 px-6 py-2 rounded-none font-mono text-sm font-bold uppercase tracking-widest transition-colors h-[38px]">
                            Filter
                        </button>
                        <button onClick={downloadPDF} className="bg-orange-500 text-zinc-950 hover:bg-orange-400 px-6 py-2 rounded-none font-mono text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2 h-[38px]">
                            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                            Export
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-900/30 border border-zinc-800 relative mb-12">
                    <div className="overflow-x-auto p-6 md:p-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                                    <th className="pb-4 font-normal">TX_ID</th>
                                    <th className="pb-4 font-normal">Timestamp</th>
                                    <th className="pb-4 font-normal">Entity / Buyer</th>
                                    <th className="pb-4 font-normal">Operator</th>
                                    <th className="pb-4 font-normal">Gateway</th>
                                    <th className="pb-4 font-normal text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx.id_transaksi} className="border-b border-zinc-800/50 hover:bg-zinc-900 transition-colors">
                                        <td className="py-4 font-mono text-orange-500 font-bold text-xs">TRX-{String(tx.id_transaksi).padStart(4, '0')}</td>
                                        <td className="py-4 text-xs text-zinc-300 font-mono">{new Date(tx.waktu_pemesanan).toLocaleString()}</td>
                                        <td className="py-4 text-sm font-bold text-zinc-100">{tx.pembeli?.nama_lengkap || '-'}</td>
                                        <td className="py-4 text-xs text-zinc-400 font-mono">{tx.staff_finance?.nama_lengkap || '-'}</td>
                                        <td className="py-4">
                                            <span className="px-2 py-1 bg-zinc-800 text-zinc-300 text-[10px] font-mono uppercase tracking-widest border border-zinc-700">
                                                {tx.metode_pembayaran?.metode_pembayaran || '-'}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <Link href={`/transactions/${tx.id_transaksi}`} className="text-zinc-500 hover:text-orange-500 font-mono text-[10px] uppercase tracking-widest font-bold flex items-center justify-end gap-1 transition-colors">
                                                Inspect
                                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {transactions.length === 0 && (
                            <div className="py-12 text-center text-zinc-500 font-mono text-sm uppercase tracking-widest">
                                No records found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
