import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Index({ peserta, auth }) {
    return (
        <AdminLayout title="Peserta Seminar" auth={auth}>
            <div className="flex flex-col gap-10 max-w-7xl mx-auto w-full">
                
                <div className="flex justify-between items-end border-b border-zinc-900 pb-6">
                    <div>
                        <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                            Participants
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-100">Seminar Registry</h1>
                    </div>
                </div>

                <div className="bg-zinc-900/30 border border-zinc-800 relative mb-12">
                    <div className="overflow-x-auto p-6 md:p-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                                    <th className="pb-4 font-normal">Registry ID</th>
                                    <th className="pb-4 font-normal">Entity Name</th>
                                    <th className="pb-4 font-normal">Email Address</th>
                                    <th className="pb-4 font-normal">Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {peserta.map((p) => (
                                    <tr key={p.id_peserta || p.ID_Peserta} className="border-b border-zinc-800/50 hover:bg-zinc-900 transition-colors">
                                        <td className="py-4 font-mono text-orange-500 font-bold text-xs">NST-{String(p.id_peserta || p.ID_Peserta).padStart(4, '0')}</td>
                                        <td className="py-4 text-sm font-bold text-zinc-100">{p.pembeli?.nama_lengkap || p.pembeli?.Nama_Lengkap || '-'}</td>
                                        <td className="py-4 text-xs text-zinc-300 font-mono">{p.email || p.Email}</td>
                                        <td className="py-4 text-xs text-zinc-400 font-mono">{p.nomor_telepon || p.Nomor_Telepon}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {peserta.length === 0 && (
                            <div className="py-12 text-center text-zinc-500 font-mono text-sm uppercase tracking-widest">
                                No records found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
