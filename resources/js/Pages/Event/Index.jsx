import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import Swal from 'sweetalert2';

export default function Index({ events, auth }) {
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
                destroy(`/event/${id}`);
            }
        });
    };

    return (
        <AdminLayout title="Schematics POS - Events" auth={auth}>
            <div className="flex flex-col gap-10 max-w-7xl mx-auto w-full pb-12">
                <div className="flex justify-between items-end border-b border-gray-200 pb-6">
                    <div>
                        <div className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2 font-bold">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-sm shadow-orange-500/50"></span>
                            System Settings
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">Event Categories</h1>
                    </div>
                    <Link 
                        href="/event/create" 
                        className="bg-orange-500 text-white px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-all rounded-xl shadow-lg shadow-orange-500/30 active:scale-[0.98] flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        Add Event
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-50 p-4 border-b border-gray-200">Event ID</th>
                                    <th className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-50 p-4 border-b border-gray-200">Event Name</th>
                                    <th className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-50 p-4 border-b border-gray-200 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((ev) => (
                                    <tr key={ev.id_event} className="hover:bg-orange-50/50 transition-colors group border-b border-gray-100 last:border-b-0">
                                        <td className="p-4 font-mono text-sm text-gray-500">
                                            EVT-{String(ev.id_event).padStart(4, '0')}
                                        </td>
                                        <td className="p-4">
                                            <span className="font-bold text-gray-900">{ev.nama_subevent}</span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex gap-2 justify-end transition-opacity">
                                                <Link 
                                                    href={`/event/${ev.id_event}/edit`}
                                                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50 flex items-center justify-center transition-all shadow-sm"
                                                    title="Edit Event"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(ev.id_event)}
                                                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-all shadow-sm"
                                                    title="Delete Event"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {events.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="p-8 text-center text-gray-400 font-mono text-sm">
                                            No events found. Create one to get started!
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
