import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Show({ transaction, auth }) {
    return (
        <AdminLayout title={`Detail Transaksi TRX-${String(transaction.id_transaksi).padStart(4, '0')}`} auth={auth}>
            <div className="p-8 flex flex-col gap-8 h-full overflow-y-auto">
                <div className="max-w-4xl w-full mx-auto">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <Link href="/transactions" className="text-primary hover:underline font-label-md text-[14px] flex items-center gap-2 mb-4 w-fit">
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                Back to History
                            </Link>
                            <h1 className="text-[32px] font-bold text-on-surface tracking-tight">
                                Detail Transaksi <span className="text-primary font-data-mono">TRX-{String(transaction.id_transaksi).padStart(4, '0')}</span>
                            </h1>
                            <p className="text-on-surface-variant mt-2 font-label-md text-[14px]">
                                {new Date(transaction.waktu_pemesanan).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
                            <h3 className="text-[16px] font-bold text-on-surface mb-4 border-b border-outline-variant pb-2">Informasi Pembeli</h3>
                            <div className="flex flex-col gap-3 text-[14px]">
                                <div className="flex justify-between">
                                    <span className="text-on-surface-variant">Nama Pembeli</span>
                                    <span className="font-bold text-on-surface">{transaction.pembeli?.nama_lengkap || '-'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-on-surface-variant">Staff/Kasir</span>
                                    <span className="font-bold text-on-surface">{transaction.staff_finance?.nama_lengkap || '-'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-on-surface-variant">Metode Pembayaran</span>
                                    <span className="font-bold bg-surface-container px-2 py-1 rounded text-on-surface">{transaction.metode_pembayaran?.metode_pembayaran || '-'}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
                            <h3 className="text-[16px] font-bold text-on-surface mb-4 border-b border-outline-variant pb-2">Ringkasan Pembayaran</h3>
                            <div className="flex flex-col gap-3 text-[14px]">
                                <div className="flex justify-between">
                                    <span className="text-on-surface-variant">Total Item</span>
                                    <span className="font-bold text-on-surface">{transaction.total_merchandise}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-on-surface-variant">Grand Total</span>
                                    <span className="font-bold text-on-surface">Rp {Number(transaction.total_harga).toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-on-surface-variant">Uang Diberikan</span>
                                    <span className="font-bold text-primary">Rp {Number(transaction.uang_diberikan).toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between border-t border-outline-variant pt-2 mt-1">
                                    <span className="text-on-surface-variant font-bold">Kembalian</span>
                                    <span className="font-bold text-on-surface text-[16px]">Rp {Number(transaction.kembalian).toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
                        <h3 className="text-[16px] font-bold text-on-surface mb-4 border-b border-outline-variant pb-2">Detail Item</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-outline-variant text-on-surface-variant font-label-md text-[14px]">
                                        <th className="pb-3 font-medium">Barang</th>
                                        <th className="pb-3 font-medium text-center">Harga Satuan</th>
                                        <th className="pb-3 font-medium text-center">Jumlah</th>
                                        <th className="pb-3 font-medium text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transaction.detail_transaksi?.map((dt) => (
                                        <tr key={dt.id_detail_transaksi} className="border-b border-outline-variant last:border-0 text-on-surface">
                                            <td className="py-4 text-[14px] font-bold">{dt.merchandise?.tipe_merchandise || 'Item Unknown'}</td>
                                            <td className="py-4 text-[14px] text-center">Rp {Number(dt.harga_satuan).toLocaleString('id-ID')}</td>
                                            <td className="py-4 text-[14px] text-center font-bold bg-surface-container-lowest rounded">{dt.jumlah_barang}x</td>
                                            <td className="py-4 text-[14px] text-right font-bold text-primary">Rp {Number(dt.total).toLocaleString('id-ID')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
