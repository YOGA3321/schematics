import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Index({ peserta = [], auth }) {
    return (
        <AdminLayout title="Seminar Participants" auth={auth}>
            <div className="flex flex-col gap-10 max-w-7xl mx-auto w-full">
                
                <div className="flex justify-between items-end border-b border-gray-200 pb-6">
                    <div>
                        <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-bold">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-sm shadow-orange-500/50"></span>
                            Registry
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">Participants</h1>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm relative mb-12 overflow-hidden">
                    <div className="overflow-x-auto p-6 md:p-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                                    <th className="pb-4 font-normal">REF_ID</th>
                                    <th className="pb-4 font-normal">Full Name</th>
                                    <th className="pb-4 font-normal">Email Address</th>
                                    <th className="pb-4 font-normal">Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {peserta.map((p) => (
                                    <tr key={p.id_seminar} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 font-mono text-orange-500 text-xs font-bold">SEM-{String(p.id_seminar).padStart(4, '0')}</td>
                                        <td className="py-4 text-sm font-bold text-gray-900">{p.pembeli.nama_lengkap}</td>
                                        <td className="py-4 text-xs text-gray-600 font-mono">{p.email}</td>
                                        <td className="py-4 text-xs text-gray-600 font-mono">{p.nomor_telepon}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {peserta.length === 0 && (
                            <div className="py-12 text-center text-gray-400 font-mono text-sm uppercase tracking-widest font-bold">
                                No participants registered yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
