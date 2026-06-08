import React from 'react';
import Layout from '../Components/Layout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ stats, recentTransactions }) {
    return (
        <Layout>
            <Head title="Dashboard" />
            
            <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Dashboard Overview</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome back! Here's your sales summary.</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass dark:glass-dark p-6 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-slate-500 dark:text-slate-400 font-medium">Total Revenue</h3>
                        <p className="text-4xl font-bold mt-2 text-blue-600 dark:text-blue-400">
                            Rp {Number(stats.totalRevenue).toLocaleString('id-ID')}
                        </p>
                    </div>
                    
                    <div className="glass dark:glass-dark p-6 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-slate-500 dark:text-slate-400 font-medium">Transactions</h3>
                        <p className="text-4xl font-bold mt-2 text-emerald-600 dark:text-emerald-400">
                            {stats.totalTransactions}
                        </p>
                    </div>

                    <div className="glass dark:glass-dark p-6 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="text-slate-500 dark:text-slate-400 font-medium">Items Sold</h3>
                        <p className="text-4xl font-bold mt-2 text-amber-600 dark:text-amber-400">
                            {stats.totalMerchSold}
                        </p>
                    </div>
                </div>

                {/* Recent Transactions Table */}
                <div className="glass dark:glass-dark rounded-3xl p-8 mt-4">
                    <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="py-4 font-semibold text-slate-500 dark:text-slate-400">ID</th>
                                    <th className="py-4 font-semibold text-slate-500 dark:text-slate-400">Time</th>
                                    <th className="py-4 font-semibold text-slate-500 dark:text-slate-400">Buyer</th>
                                    <th className="py-4 font-semibold text-slate-500 dark:text-slate-400">Method</th>
                                    <th className="py-4 font-semibold text-slate-500 dark:text-slate-400 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTransactions.map((tx) => (
                                    <tr key={tx.id_transaksi} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition">
                                        <td className="py-4 font-mono text-sm">{tx.id_transaksi}</td>
                                        <td className="py-4">{new Date(tx.waktu_pemesanan).toLocaleString()}</td>
                                        <td className="py-4">{tx.pembeli.nama_lengkap}</td>
                                        <td className="py-4">
                                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium">
                                                {tx.metode_pembayaran.metode_pembayaran}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right font-semibold">
                                            Rp {Number(tx.total_harga).toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
