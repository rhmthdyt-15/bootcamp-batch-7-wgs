import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { showErrorAlert, showSuccessAlert, showConfirmationAlert } from '../../master/SweetAlertUtil'
import { HiOutlineSearch } from 'react-icons/hi'
import { useAuth } from '../../auth/useAuth'

// Komponen List untuk menampilkan daftar member
function List() {
    // State untuk menyimpan data member
    const [member, setMember] = useState([])

    // Menggunakan custom hook useAuth untuk mendapatkan axios instance dan konfigurasi
    const { axiosJWT, Config } = useAuth()

    // Menggunakan useEffect untuk memuat data member ketika komponen dimount
    useEffect(() => {
        getMember()
    }, [])

    // Fungsi untuk mengambil data member dari server
    const getMember = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5000/member', Config)
            // Menyimpan data member ke dalam state dengan menambahkan properti selected
            setMember(response.data.map((item) => ({ ...item, selected: false })))
        } catch (error) {
            console.error('Error fetching member:', error)
            showErrorAlert('Gagal mengambil member.')
        }
    }

    // Fungsi untuk menghapus member berdasarkan ID
    const deleteMember = async (memberId) => {
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Member ini akan dihapus!')

        if (result.isConfirmed) {
            try {
                await axiosJWT.delete(`http://localhost:5000/member/${memberId}`, Config)
                await getMember()
                showSuccessAlert('Member telah dihapus.')
            } catch (error) {
                console.error('Error deleting member:', error)
                showErrorAlert('Gagal menghapus member.')
            }
        }
    }

    // Fungsi untuk menghapus member terpilih
    const deleteSelectedMember = async () => {
        const selectedIds = member.filter((item) => item.selected).map((item) => item.id)

        if (selectedIds.length === 0) {
            showErrorAlert('Pilih setidaknya satu member untuk dihapus.')
            return
        }

        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Member terpilih akan dihapus!')

        if (result.isConfirmed) {
            try {
                await axiosJWT.delete('http://localhost:5000/member', { ...Config, data: { ids: selectedIds } })
                await getMember()
                showSuccessAlert('Member terpilih telah dihapus.')
            } catch (error) {
                console.error('Error deleting selected categories:', error)
                showErrorAlert('Gagal menghapus member terpilih.')
            }
        }
    }

    // Fungsi untuk membalikkan status selected pada suatu member
    const toggleSelection = (memberId) => {
        setMember((prevMember) =>
            prevMember.map((item) => {
                if (item.id === memberId) {
                    return { ...item, selected: !item.selected }
                }
                return item
            })
        )
    }

    // Fungsi untuk membalikkan status selected pada semua member
    const toggleAllSelection = () => {
        setMember((prevMember) =>
            prevMember.map((item) => ({ ...item, selected: !prevMember.every((item) => item.selected) }))
        )
    }

    // Mengembalikan tampilan komponen List
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium text-xl">Daftar member</strong>
            <div className="flex justify-between items-center mb-3 mt-3">
                <div className="relative space-x-2">
                    {/* Tombol untuk menambahkan member baru */}
                    <Link
                        to="/members/add"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah
                    </Link>
                    {/* Tombol untuk menghapus member terpilih */}
                    <button
                        onClick={deleteSelectedMember}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
                <div className="relative">
                    {/* Icon pencarian dan input untuk mencari member */}
                    <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="text-sm focus:outline-none active:outline-none h-10 w-[20rem] border border-gray-300 rounded-sm pl-11 pr-4"
                    />
                </div>
            </div>

            {/* Tabel untuk menampilkan data member */}
            <div className="border-x border-gray-200 rounded-sm">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            {/* Checkbox untuk memilih semua member */}
                            <th>
                                <input
                                    type="checkbox"
                                    checked={member.every((item) => item.selected)}
                                    onChange={toggleAllSelection}
                                />
                            </th>
                            <th>No</th>
                            <th>Kode Member</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Telepon</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Menggunakan map untuk membuat baris data untuk setiap member */}
                        {member.map((members, index) => (
                            <tr key={members.id}>
                                {/* Checkbox untuk memilih member individual */}
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={members.selected || false}
                                        onChange={() => toggleSelection(members.id)}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>{members.kode_member}</td>
                                <td>{members.nama}</td>
                                <td>{members.alamat}</td>
                                <td>{members.telepon}</td>
                                {/* Tombol Edit dan Hapus untuk setiap member */}
                                <td className="flex space-x-2">
                                    <Link
                                        to={`/members/edit/${members.id}`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteMember(members.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// Mengekspor komponen List sebagai default
export default List
