import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Index({ staff, auth }) {
    const { delete: destroy } = useForm();

    const handleDelete = (nrp) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f97316',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(`/staff/${nrp}`, {
                    onSuccess: () => {
                        Swal.fire('Deleted!', 'Staff record has been deleted.', 'success');
                    }
                });
            }
        });
    };

    return (
        <AdminLayout title="Staff Management" auth={auth}>
            <div className="flex flex-col gap-10 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-end border-b border-gray-200 pb-6">
                    <div>
                        <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">
                            User Settings
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">Staff Management</h1>
                    </div>
                    <Link
                        href="/staff/create"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-mono text-[12px] uppercase tracking-widest font-bold transition-colors shadow-sm flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Add Staff
                    </Link>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto p-6 md:p-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                                    <th className="pb-4 font-normal">NRP</th>
                                    <th className="pb-4 font-normal">Name</th>
                                    <th className="pb-4 font-normal">Gender</th>
                                    <th className="pb-4 font-normal">Contact</th>
                                    <th className="pb-4 font-normal text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.map((s) => (
                                    <tr key={s.nrp} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 font-mono text-orange-500 text-xs font-bold">{s.nrp}</td>
                                        <td className="py-4 text-sm font-bold text-gray-900">{s.nama_lengkap}</td>
                                        <td className="py-4 text-xs text-gray-500">{s.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                                        <td className="py-4 text-xs text-gray-500 font-mono">{s.nomor_telepon}</td>
                                        <td className="py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link 
                                                    href={`/staff/${s.nrp}/edit`}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 transition-all"
                                                    title="Edit"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(s.nrp)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
                                                    title="Delete"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {staff.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-gray-400 text-sm">
                                            No staff found
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
