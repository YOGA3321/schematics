import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import Pagination from '../../Components/Pagination';

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
                
                <div className="flex justify-between items-end border-b border-gray-200 pb-6">
                    <div>
                        <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-bold">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-sm shadow-orange-500/50"></span>
                            Ledger
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">Transaction History</h1>
                    </div>
                    
                    <div className="flex gap-4 items-end">
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">Start Date</label>
                            <input 
                                type="date" 
                                value={startDate} 
                                onChange={e => setStartDate(e.target.value)}
                                className="bg-white border border-gray-200 rounded-xl px-4 py-2 font-mono text-sm text-gray-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors shadow-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold">End Date</label>
                            <input 
                                type="date" 
                                value={endDate} 
                                onChange={e => setEndDate(e.target.value)}
                                className="bg-white border border-gray-200 rounded-xl px-4 py-2 font-mono text-sm text-gray-900 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors shadow-sm"
                            />
                        </div>
                        <button onClick={applyFilter} className="bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 px-6 py-2 rounded-xl font-mono text-sm font-bold uppercase tracking-widest transition-colors shadow-sm flex items-center h-[38px]">
                            Filter
                        </button>
                        <button onClick={downloadPDF} className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2 rounded-xl font-mono text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 h-[38px] shadow-sm shadow-orange-500/30">
                            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                            Export
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm relative mb-12 overflow-hidden">
                    <div className="overflow-x-auto p-6 md:p-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                                    <th className="pb-4 font-normal">TX_ID</th>
                                    <th className="pb-4 font-normal">Timestamp</th>
                                    <th className="pb-4 font-normal">Entity / Buyer</th>
                                    <th className="pb-4 font-normal">Operator</th>
                                    <th className="pb-4 font-normal">Gateway</th>
                                    <th className="pb-4 font-normal text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.data.map((tx) => (
                                    <tr key={tx.id_transaksi} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 font-mono text-orange-500 font-bold text-xs">TRX-{String(tx.id_transaksi).padStart(4, '0')}</td>
                                        <td className="py-4 text-xs text-gray-500 font-mono">{new Date(tx.waktu_pemesanan).toLocaleString()}</td>
                                        <td className="py-4 text-sm font-bold text-gray-900">{tx.pembeli?.nama_lengkap || '-'}</td>
                                        <td className="py-4 text-xs text-gray-600 font-mono">{tx.staff_finance?.nama_lengkap || '-'}</td>
                                        <td className="py-4">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-mono uppercase tracking-widest rounded-full font-bold border border-gray-200">
                                                {tx.metode_pembayaran?.metode_pembayaran || '-'}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <Link href={`/transactions/${tx.id_transaksi}`} className="text-gray-400 hover:text-orange-500 font-mono text-[10px] uppercase tracking-widest font-bold flex items-center justify-end gap-1 transition-colors">
                                                Inspect
                                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {transactions.data.length === 0 && (
                            <div className="py-12 text-center text-gray-400 font-mono text-sm uppercase tracking-widest font-bold">
                                No records found.
                            </div>
                        )}
                        <Pagination links={transactions.links} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
