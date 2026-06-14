import React from 'react';
import AdminLayout from '../Layouts/AdminLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Dashboard({ stats, recentTransactions, eventRevenues = [], auth }) {
    
    // Prepare chart data
    const chartData = eventRevenues.map(event => ({
        name: event.nama_subevent,
        revenue: Number(event.pendapatan)
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-900 border border-zinc-800 p-4 shadow-xl">
                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-lg font-black text-orange-500">
                        Rp {payload[0].value.toLocaleString('id-ID')}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <AdminLayout title="Admin Dashboard" auth={auth}>
            <div className="flex flex-col gap-10 max-w-7xl mx-auto w-full">
                
                {/* Header */}
                <div className="flex justify-between items-end border-b border-zinc-900 pb-6">
                    <div>
                        <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                            Live Analytics
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-100">Command Center</h1>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-[64px] text-zinc-50">payments</span>
                        </div>
                        <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-4">Total Revenue</div>
                        <div className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tighter">
                            Rp {Number(stats.totalRevenue).toLocaleString('id-ID')}
                        </div>
                    </div>
                    
                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-[64px] text-zinc-50">receipt_long</span>
                        </div>
                        <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-4">Transactions</div>
                        <div className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tighter">
                            {stats.totalTransactions}
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-[64px] text-zinc-50">inventory_2</span>
                        </div>
                        <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-4">Items Sold</div>
                        <div className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tighter">
                            {stats.totalMerchSold}
                        </div>
                    </div>
                </div>

                {/* Main Chart Area */}
                <div className="bg-zinc-900/30 border border-zinc-800 p-6 md:p-8 relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500"></div>
                    
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-100">Revenue Distribution</h2>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest border border-zinc-800 px-3 py-1 bg-zinc-900">By Subevent</div>
                    </div>
                    
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
                                <XAxis 
                                    dataKey="name" 
                                    stroke="#52525b" 
                                    tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }} 
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis 
                                    stroke="#52525b" 
                                    tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => `Rp ${val / 1000}k`}
                                />
                                <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} content={<CustomTooltip />} />
                                <Bar dataKey="revenue" radius={[2, 2, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#f97316' : '#3f3f46'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Transactions Table */}
                <div className="bg-zinc-900/30 border border-zinc-800 relative mb-12">
                    <div className="p-6 md:p-8 border-b border-zinc-800">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-100">Recent Terminal Activity</h2>
                    </div>
                    <div className="overflow-x-auto p-6 md:p-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                                    <th className="pb-4 font-normal">TX_ID</th>
                                    <th className="pb-4 font-normal">Timestamp</th>
                                    <th className="pb-4 font-normal">Entity / Buyer</th>
                                    <th className="pb-4 font-normal">Gateway</th>
                                    <th className="pb-4 font-normal text-right">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTransactions.map((tx) => (
                                    <tr key={tx.id_transaksi} className="border-b border-zinc-800/50 hover:bg-zinc-900 transition-colors">
                                        <td className="py-4 font-mono text-zinc-400 text-xs">#{tx.id_transaksi}</td>
                                        <td className="py-4 text-xs text-zinc-300 font-mono">{new Date(tx.waktu_pemesanan).toLocaleString()}</td>
                                        <td className="py-4 text-sm font-bold text-zinc-100">{tx.pembeli.nama_lengkap}</td>
                                        <td className="py-4">
                                            <span className="px-2 py-1 bg-zinc-800 text-zinc-300 text-[10px] font-mono uppercase tracking-widest border border-zinc-700">
                                                {tx.metode_pembayaran.metode_pembayaran}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right text-orange-500 font-black tracking-tight text-lg">
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
