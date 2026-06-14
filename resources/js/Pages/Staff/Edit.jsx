import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Edit({ staff, auth }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_lengkap: staff.nama_lengkap || '',
        jenis_kelamin: staff.jenis_kelamin || 'L',
        nomor_telepon: staff.nomor_telepon || '',
        password: '',
        alamat: staff.alamat && staff.alamat.length > 0 ? staff.alamat.map(a => a.alamat) : ['']
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/staff/${staff.nrp}`, {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Staff successfully updated',
                    confirmButtonColor: '#f97316'
                });
            }
        });
    };

    const addAlamat = () => {
        setData('alamat', [...data.alamat, '']);
    };

    const removeAlamat = (index) => {
        const newAlamat = [...data.alamat];
        newAlamat.splice(index, 1);
        setData('alamat', newAlamat);
    };

    const updateAlamat = (index, value) => {
        const newAlamat = [...data.alamat];
        newAlamat[index] = value;
        setData('alamat', newAlamat);
    };

    return (
        <AdminLayout title={`Edit Staff ${staff.nrp}`} auth={auth}>
            <div className="flex flex-col gap-10 max-w-3xl mx-auto w-full">
                <div className="flex justify-between items-end border-b border-gray-200 pb-6">
                    <div>
                        <Link href="/staff" className="text-orange-500 hover:text-orange-600 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 font-bold flex items-center gap-1 transition-colors">
                            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                            Back to Staff
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">Edit Staff</h1>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 border-b border-gray-100 pb-2">Basic Info</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold mb-2">NRP (Read Only)</label>
                                    <input
                                        type="text"
                                        value={staff.nrp}
                                        disabled
                                        className="w-full bg-gray-100 text-gray-500 border border-gray-200 rounded-xl px-4 py-3 text-sm cursor-not-allowed font-mono"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={data.nama_lengkap}
                                        onChange={e => setData('nama_lengkap', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                        placeholder="Staff Name"
                                    />
                                    {errors.nama_lengkap && <div className="text-red-500 text-xs mt-1">{errors.nama_lengkap}</div>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold mb-2">Gender</label>
                                    <select
                                        value={data.jenis_kelamin}
                                        onChange={e => setData('jenis_kelamin', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                    >
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                    {errors.jenis_kelamin && <div className="text-red-500 text-xs mt-1">{errors.jenis_kelamin}</div>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold mb-2">Phone Number</label>
                                    <input
                                        type="text"
                                        value={data.nomor_telepon}
                                        onChange={e => setData('nomor_telepon', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
                                        placeholder="081xxx"
                                    />
                                    {errors.nomor_telepon && <div className="text-red-500 text-xs mt-1">{errors.nomor_telepon}</div>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold mb-2">Password <span className="normal-case text-gray-400 font-normal tracking-normal">(Leave blank to keep current)</span></label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                        placeholder="Enter new password to change"
                                    />
                                    {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                                </div>
                            </div>
                        </div>

                        {/* Addresses */}
                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                <h3 className="text-lg font-black uppercase tracking-tight text-gray-900">Addresses</h3>
                                <button
                                    type="button"
                                    onClick={addAlamat}
                                    className="text-orange-500 hover:text-orange-600 text-xs font-bold flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                    Add Address
                                </button>
                            </div>
                            
                            {data.alamat.map((almt, index) => (
                                <div key={index} className="flex gap-2">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={almt}
                                            onChange={e => updateAlamat(index, e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                            placeholder={`Address ${index + 1}`}
                                        />
                                        {errors[`alamat.${index}`] && <div className="text-red-500 text-xs mt-1">{errors[`alamat.${index}`]}</div>}
                                    </div>
                                    {data.alamat.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeAlamat(index)}
                                            className="w-12 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                            title="Remove Address"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-xl font-mono text-[12px] uppercase tracking-widest font-bold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Updating...' : 'Update Staff Info'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
