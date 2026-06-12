import React from 'react';
import AdminLayout from '../Layouts/AdminLayout';

export default function Dashboard({ stats, recentTransactions, eventRevenues = [], auth }) {
    return (
        <AdminLayout title="Admin Dashboard" auth={auth}>
            <div className="p-8 flex flex-col gap-8 h-full overflow-y-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-[32px] font-bold text-on-surface tracking-tight">Dashboard Overview</h1>
                        <p className="text-on-surface-variant mt-2 font-label-md text-[14px]">Welcome back! Here's your sales summary.</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-on-surface-variant font-label-md text-[14px] font-medium">Total Revenue</h3>
                        <p className="text-[32px] font-bold mt-2 text-primary tracking-tight">
                            Rp {Number(stats.totalRevenue).toLocaleString('id-ID')}
                        </p>
                    </div>
                    
                    <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-on-surface-variant font-label-md text-[14px] font-medium">Transactions</h3>
                        <p className="text-[32px] font-bold mt-2 text-primary tracking-tight">
                            {stats.totalTransactions}
                        </p>
                    </div>

                    <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-on-surface-variant font-label-md text-[14px] font-medium">Items Sold</h3>
                        <p className="text-[32px] font-bold mt-2 text-primary tracking-tight">
                            {stats.totalMerchSold}
                        </p>
                    </div>
                </div>

                {/* Revenue by Subevent */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
                    <h2 className="text-[20px] font-bold text-on-surface mb-4">Revenue by Subevent</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {eventRevenues.map(event => (
                            <div key={event.id_event} className="bg-surface-container-low border border-outline-variant p-4 rounded-xl flex flex-col gap-2 relative overflow-hidden group hover:shadow-sm transition-all">
                                <div className="absolute top-0 right-0 p-2 opacity-15">
                                    <span className="material-symbols-outlined text-[48px] text-primary">local_activity</span>
                                </div>
                                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[12px] font-bold self-start">{event.nama_subevent}</span>
                                <h4 className="text-[18px] font-bold text-on-surface mt-1">
                                    Rp {Number(event.pendapatan).toLocaleString('id-ID')}
                                </h4>
                                <p className="text-[12px] text-on-surface-variant">Total Event Revenue</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions Table */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col min-h-0 flex-1 mb-8">
                    <h2 className="text-[20px] font-bold text-on-surface mb-4">Recent Transactions</h2>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-outline-variant text-on-surface-variant font-label-md text-[14px]">
                                    <th className="pb-3 font-medium">ID</th>
                                    <th className="pb-3 font-medium">Time</th>
                                    <th className="pb-3 font-medium">Buyer</th>
                                    <th className="pb-3 font-medium">Method</th>
                                    <th className="pb-3 font-medium text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTransactions.map((tx) => (
                                    <tr key={tx.id_transaksi} className="border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors text-on-surface">
                                        <td className="py-4 font-data-mono text-[14px]">{tx.id_transaksi}</td>
                                        <td className="py-4 text-[14px]">{new Date(tx.waktu_pemesanan).toLocaleString()}</td>
                                        <td className="py-4 text-[14px]">{tx.pembeli.nama_lengkap}</td>
                                        <td className="py-4">
                                            <span className="px-3 py-1 bg-surface-container-high rounded-full text-[12px] font-bold text-on-surface-variant">
                                                {tx.metode_pembayaran.metode_pembayaran}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right font-bold text-[14px]">
                                            Rp {Number(tx.total_harga).toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
