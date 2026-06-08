import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Index({ transactions, auth }) {
    return (
        <AdminLayout title="Transaction History" auth={auth}>
            <div className="p-8 flex flex-col gap-8 h-full overflow-y-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-[32px] font-bold text-on-surface tracking-tight">Transaction History</h1>
                        <p className="text-on-surface-variant mt-2 font-label-md text-[14px]">View all past transactions.</p>
                    </div>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col min-h-0 flex-1 mb-8">
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-outline-variant text-on-surface-variant font-label-md text-[14px]">
                                    <th className="pb-3 font-medium">Transaction ID</th>
                                    <th className="pb-3 font-medium">Time</th>
                                    <th className="pb-3 font-medium">Buyer</th>
                                    <th className="pb-3 font-medium">Method</th>
                                    <th className="pb-3 font-medium">Staff/Cashier</th>
                                    <th className="pb-3 font-medium">Items</th>
                                    <th className="pb-3 font-medium text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx.id_transaksi} className="border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors text-on-surface">
                                        <td className="py-4 font-data-mono text-[14px] font-bold text-primary">{tx.id_transaksi}</td>
                                        <td className="py-4 text-[14px]">{new Date(tx.waktu_pemesanan).toLocaleString()}</td>
                                        <td className="py-4 text-[14px]">{tx.pembeli.nama_lengkap}</td>
                                        <td className="py-4">
                                            <span className="px-3 py-1 bg-surface-container-high rounded-full text-[12px] font-bold text-on-surface-variant">
                                                {tx.metode_pembayaran.metode_pembayaran}
                                            </span>
                                        </td>
                                        <td className="py-4 text-[14px]">{tx.staff_finance?.nama_lengkap || '-'}</td>
                                        <td className="py-4 text-[14px] text-on-surface-variant max-w-[200px] truncate">
                                            {tx.detail_transaksi.map(dt => `${dt.kuantitas}x ${dt.merchandise.tipe_merchandise}`).join(', ')}
                                        </td>
                                        <td className="py-4 text-right font-bold text-[14px] text-primary">
                                            Rp {Number(tx.total_harga).toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {transactions.length === 0 && (
                            <div className="py-8 text-center text-on-surface-variant text-[14px]">
                                No transactions found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
