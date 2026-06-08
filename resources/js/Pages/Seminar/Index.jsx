import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Index({ peserta, auth }) {
    return (
        <AdminLayout title="Peserta Seminar" auth={auth}>
            <div className="p-8 flex flex-col gap-8 h-full overflow-y-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-[32px] font-bold text-on-surface tracking-tight">Peserta Seminar</h1>
                        <p className="text-on-surface-variant mt-2 font-label-md text-[14px]">Daftar peserta seminar yang terdaftar.</p>
                    </div>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col min-h-0 flex-1 mb-8">
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-outline-variant text-on-surface-variant font-label-md text-[14px]">
                                    <th className="pb-3 font-medium">ID Peserta</th>
                                    <th className="pb-3 font-medium">Nama Pembeli</th>
                                    <th className="pb-3 font-medium">Email</th>
                                    <th className="pb-3 font-medium">Nomor Telepon</th>
                                </tr>
                            </thead>
                            <tbody>
                                {peserta.map((p) => (
                                    <tr key={p.id_peserta || p.ID_Peserta} className="border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors text-on-surface">
                                        <td className="py-4 font-data-mono text-[14px] font-bold text-primary">{p.id_peserta || p.ID_Peserta}</td>
                                        <td className="py-4 text-[14px]">{p.pembeli?.nama_lengkap || p.pembeli?.Nama_Lengkap || '-'}</td>
                                        <td className="py-4 text-[14px]">{p.email || p.Email}</td>
                                        <td className="py-4 text-[14px]">{p.nomor_telepon || p.Nomor_Telepon}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {peserta.length === 0 && (
                            <div className="py-8 text-center text-on-surface-variant text-[14px]">
                                Belum ada peserta seminar terdaftar.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
