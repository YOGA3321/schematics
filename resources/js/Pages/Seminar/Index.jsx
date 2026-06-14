import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '../../Components/Pagination';

export default function Index({ peserta = [], auth }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f97316',
            cancelButtonColor: '#d1d5db',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(`/seminar/${id}`);
            }
        });
    };

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
                                    <th className="pb-4 font-normal text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {peserta.data && peserta.data.map((p) => (
                                    <tr key={p.id_peserta} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 font-mono text-orange-500 text-xs font-bold">{p.id_peserta}</td>
                                        <td className="py-4 text-sm font-bold text-gray-900">{p.pembeli?.nama_lengkap || '-'}</td>
                                        <td className="py-4 text-xs text-gray-600 font-mono">{p.email}</td>
                                        <td className="py-4 text-xs text-gray-600 font-mono">{p.nomor_telepon}</td>
                                        <td className="py-4 text-right">
                                            <div className="flex gap-2 justify-end transition-opacity">
                                                <Link 
                                                    href={`/seminar/${p.id_peserta}/edit`}
                                                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 flex items-center justify-center transition-all shadow-sm"
                                                    title="Edit Participant"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(p.id_peserta)}
                                                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-all shadow-sm"
                                                    title="Delete Participant"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(!peserta.data || peserta.data.length === 0) && (
                            <div className="py-12 text-center text-gray-400 font-mono text-sm uppercase tracking-widest font-bold">
                                No participants registered yet.
                            </div>
                        )}
                        {peserta.links && <Pagination links={peserta.links} />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
