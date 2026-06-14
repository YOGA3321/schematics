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
                <div className="bg-white border border-gray-100 p-4 shadow-xl rounded-xl">
                    <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-lg font-black text-orange-600">
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
                <div className="flex justify-between items-end border-b border-gray-200 pb-6">
                    <div>
                        <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-bold">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-sm shadow-orange-500/50"></span>
                            Live Analytics
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">Command Center</h1>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:border-orange-200 transition-colors">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-[80px] text-orange-600">payments</span>
                        </div>
                        <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-4 font-bold">Total Revenue</div>
                        <div className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
                            Rp {Number(stats.totalRevenue).toLocaleString('id-ID')}
                        </div>
                    </div>
                    
                    <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:border-orange-200 transition-colors">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-[80px] text-orange-600">receipt_long</span>
                        </div>
                        <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-4 font-bold">Transactions</div>
                        <div className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
                            {stats.totalTransactions}
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:border-orange-200 transition-colors">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-[80px] text-orange-600">inventory_2</span>
                        </div>
                        <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-4 font-bold">Items Sold</div>
                        <div className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
                            {stats.totalMerchSold}
                        </div>
                    </div>
                </div>

                {/* Main Chart Area */}
                <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm relative">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">Revenue Distribution</h2>
                        <div className="text-[10px] font-mono text-orange-600 uppercase tracking-widest border border-orange-100 px-3 py-1 bg-orange-50 rounded-full font-bold">By Subevent</div>
                    </div>
                    
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
                                <XAxis 
                                    dataKey="name" 
                                    stroke="#9ca3af" 
                                    tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' }} 
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis 
                                    stroke="#9ca3af" 
                                    tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' }}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => `Rp ${val / 1000}k`}
                                />
                                <Tooltip cursor={{ fill: '#f3f4f6' }} content={<CustomTooltip />} />
                                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#f97316' : '#e5e7eb'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Transactions Table */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm relative mb-12 overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">Recent Terminal Activity</h2>
                    </div>
                    <div className="overflow-x-auto p-6 md:p-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                                    <th className="pb-4 font-normal">TX_ID</th>
                                    <th className="pb-4 font-normal">Timestamp</th>
                                    <th className="pb-4 font-normal">Entity / Buyer</th>
                                    <th className="pb-4 font-normal">Gateway</th>
                                    <th className="pb-4 font-normal text-right">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTransactions.map((tx) => (
                                    <tr key={tx.id_transaksi} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 font-mono text-orange-500 text-xs font-bold">#{tx.id_transaksi}</td>
                                        <td className="py-4 text-xs text-gray-500 font-mono">{new Date(tx.waktu_pemesanan).toLocaleString()}</td>
                                        <td className="py-4 text-sm font-bold text-gray-900">{tx.pembeli.nama_lengkap}</td>
                                        <td className="py-4">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-mono uppercase tracking-widest rounded-full font-bold border border-gray-200">
                                                {tx.metode_pembayaran.metode_pembayaran}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right text-orange-600 font-black tracking-tight text-lg">
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
