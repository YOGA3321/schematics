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
            <div className="p-8 flex flex-col gap-8 h-full overflow-y-auto">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-[32px] font-bold text-on-surface tracking-tight">Transaction History</h1>
                        <p className="text-on-surface-variant mt-2 font-label-md text-[14px]">View all past transactions.</p>
                    </div>
                    
                    <div className="flex gap-4 items-end">
                        <div className="flex flex-col gap-1">
                            <label className="text-[12px] font-bold text-on-surface-variant">Tanggal Awal</label>
                            <input 
                                type="date" 
                                value={startDate} 
                                onChange={e => setStartDate(e.target.value)}
                                className="bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-[14px] text-on-surface outline-none focus:border-primary"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[12px] font-bold text-on-surface-variant">Tanggal Akhir</label>
                            <input 
                                type="date" 
                                value={endDate} 
                                onChange={e => setEndDate(e.target.value)}
                                className="bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-[14px] text-on-surface outline-none focus:border-primary"
                            />
                        </div>
                        <button onClick={applyFilter} className="bg-surface-variant text-on-surface hover:bg-surface-container-high px-4 py-2 rounded-lg font-bold text-[14px] transition-colors">
                            Filter
                        </button>
                        <button onClick={downloadPDF} className="bg-primary text-on-primary hover:bg-primary/90 px-4 py-2 rounded-lg font-bold text-[14px] transition-colors flex items-center gap-2 shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col min-h-0 flex-1 mb-8">
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-outline-variant text-on-surface-variant font-label-md text-[14px]">
                                    <th className="pb-3 font-medium">ID</th>
                                    <th className="pb-3 font-medium">Time</th>
                                    <th className="pb-3 font-medium">Buyer</th>
                                    <th className="pb-3 font-medium">Staff/Cashier</th>
                                    <th className="pb-3 font-medium">Method</th>
                                    <th className="pb-3 font-medium">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx.id_transaksi} className="border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors text-on-surface">
                                        <td className="py-4 font-data-mono text-[14px] font-bold text-primary">TRX-{String(tx.id_transaksi).padStart(4, '0')}</td>
                                        <td className="py-4 text-[14px]">{new Date(tx.waktu_pemesanan).toLocaleString()}</td>
                                        <td className="py-4 text-[14px]">{tx.pembeli?.nama_lengkap || '-'}</td>
                                        <td className="py-4 text-[14px]">{tx.staff_finance?.nama_lengkap || '-'}</td>
                                        <td className="py-4">
                                            <span className="px-3 py-1 bg-surface-container-high rounded-full text-[12px] font-bold text-on-surface-variant">
                                                {tx.metode_pembayaran?.metode_pembayaran || '-'}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <Link href={`/transactions/${tx.id_transaksi}`} className="text-primary hover:text-primary/80 font-bold text-[14px] flex items-center gap-1">
                                                Detail
                                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {transactions.length === 0 && (
                            <div className="py-8 text-center text-on-surface-variant text-[14px]">
                                No transactions found in the selected period.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
