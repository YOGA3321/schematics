import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Show({ transaction, auth }) {
    const trxId = `TRX-${String(transaction.id_transaksi).padStart(4, '0')}`;
    
    return (
        <AdminLayout title={`Transaction ${trxId}`} auth={auth}>
            <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
                
                {/* Header */}
                <div className="flex justify-between items-end border-b border-gray-200 pb-6">
                    <div>
                        <Link href="/transactions" className="group flex items-center gap-2 text-gray-400 hover:text-orange-500 font-mono text-[10px] uppercase tracking-widest font-bold mb-4 transition-colors w-fit">
                            <span className="material-symbols-outlined text-[14px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            Back to History
                        </Link>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 flex items-center gap-4">
                            Transaction Detail
                            <span className="text-xl font-mono text-orange-500 bg-orange-50 border border-orange-200 px-4 py-1 rounded-full tracking-widest">
                                {trxId}
                            </span>
                        </h1>
                        <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mt-2 font-bold">
                            {new Date(transaction.waktu_pemesanan).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'medium' })}
                        </div>
                    </div>
                    <button className="bg-white border border-gray-200 p-3 text-gray-500 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 rounded-xl transition-all shadow-sm">
                        <span className="material-symbols-outlined text-[24px]">print</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Buyer Information */}
                    <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:border-orange-200 transition-colors">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-[80px] text-orange-600">person</span>
                        </div>
                        <h3 className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-6 font-bold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            Buyer Information
                        </h3>
                        
                        <div className="flex flex-col gap-4 relative z-10">
                            <div>
                                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-1">Customer Name</div>
                                <div className="text-lg font-bold text-gray-900">{transaction.pembeli?.nama_lengkap || '-'}</div>
                            </div>
                            <div className="flex gap-8">
                                <div>
                                    <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-1">Processed By</div>
                                    <div className="text-sm font-bold text-gray-900">{transaction.staff_finance?.nama_lengkap || '-'}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-1">Payment Method</div>
                                    <div className="bg-gray-100 border border-gray-200 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-widest text-gray-600 inline-block">
                                        {transaction.metode_pembayaran?.metode_pembayaran || '-'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Payment Summary */}
                    <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm relative overflow-hidden group hover:border-orange-200 transition-colors">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-[80px] text-orange-600">receipt_long</span>
                        </div>
                        <h3 className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-6 font-bold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                            Payment Summary
                        </h3>
                        
                        <div className="flex flex-col gap-4 relative z-10">
                            <div className="flex justify-between items-end border-b border-gray-50 pb-3">
                                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Total Items</span>
                                <span className="text-lg font-bold text-gray-900">{transaction.total_merchandise} pcs</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-gray-50 pb-3">
                                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Grand Total</span>
                                <span className="text-2xl font-black text-gray-900 tracking-tighter">Rp {Number(transaction.total_harga).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-gray-50 pb-3">
                                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Cash Given</span>
                                <span className="text-lg font-black text-orange-600 tracking-tighter">Rp {Number(transaction.uang_diberikan).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between items-end pt-2">
                                <span className="text-xs text-gray-900 font-mono uppercase tracking-widest font-bold">Change</span>
                                <span className="text-xl font-black text-gray-900 tracking-tighter">Rp {Number(transaction.kembalian).toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Item Details Table */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm relative overflow-hidden mt-2">
                    <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">Purchased Items</h2>
                    </div>
                    <div className="overflow-x-auto p-6 md:p-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                                    <th className="pb-4 font-normal">Item Name</th>
                                    <th className="pb-4 font-normal text-right">Unit Price</th>
                                    <th className="pb-4 font-normal text-center">Qty</th>
                                    <th className="pb-4 font-normal text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction.detail_transaksi?.map((dt) => (
                                    <tr key={dt.id_detail_transaksi} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                                                    {dt.merchandise?.foto ? (
                                                        <img src={`/storage/${dt.merchandise.foto}`} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="material-symbols-outlined text-gray-300 text-[20px]">inventory_2</span>
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{dt.merchandise?.tipe_merchandise || 'Unknown Item'}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-right text-xs text-gray-500 font-mono font-bold">
                                            Rp {Number(dt.harga_satuan).toLocaleString('id-ID')}
                                        </td>
                                        <td className="py-4 text-center">
                                            <span className="bg-gray-100 border border-gray-200 text-gray-600 px-3 py-1 rounded-md text-[10px] font-mono font-bold">
                                                {dt.jumlah_barang}x
                                            </span>
                                        </td>
                                        <td className="py-4 text-right text-orange-600 font-black tracking-tight text-lg">
                                            Rp {Number(dt.total).toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                                {(!transaction.detail_transaksi || transaction.detail_transaksi.length === 0) && (
                                    <tr>
                                        <td colSpan="4" className="py-8 text-center text-gray-400 font-mono text-xs uppercase tracking-widest">
                                            No items found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </AdminLayout>
    );
}
