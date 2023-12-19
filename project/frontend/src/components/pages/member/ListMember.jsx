import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { showErrorAlert, showSuccessAlert, showConfirmationAlert } from '../../master/SweetAlertUtil'
import { HiOutlineSearch } from 'react-icons/hi'

function ListMember() {
    const [member, setMember] = useState([])

    useEffect(() => {
        getMember()
    }, [])

    const getMember = async () => {
        try {
            const response = await axios.get('http://localhost:5000/member')
            setMember(response.data.map((item) => ({ ...item, selected: false })))
        } catch (error) {
            console.error('Error fetching memberes:', error)
            showErrorAlert('Gagal mengambil kategori.')
        }
    }

    const deleteMember = async (meberId) => {
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Kategori ini akan dihapus!')

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/member/${categoryId}`)
                await getMember()
                showSuccessAlert('Member telah dihapus.')
            } catch (error) {
                console.error('Error deleting category:', error)
                showErrorAlert('Gagal menghapus member.')
            }
        }
    }

    /**
     * Menghapus kategori terpilih berdasarkan ID kategori yang telah dipilih.
     * Jika tidak ada kategori terpilih, menampilkan pesan kesalahan.
     */
    const deleteSelectedMember = async () => {
        // Memfilter kategori yang terpilih dan mengambil array ID-nya.
        const selectedIds = member.filter((item) => item.selected).map((item) => item.id)

        // Menampilkan pesan kesalahan jika tidak ada kategori terpilih.
        if (selectedIds.length === 0) {
            showErrorAlert('Pilih setidaknya satu kategori untuk dihapus.')
            return
        }

        // Menampilkan konfirmasi sebelum menghapus.
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Kategori terpilih akan dihapus!')

        // Melanjutkan menghapus jika pengguna mengonfirmasi.
        if (result.isConfirmed) {
            try {
                // Mengirim permintaan DELETE ke server dengan array ID kategori terpilih.
                await axios.delete('http://localhost:5000/member', { data: { ids: selectedIds } })

                // Memperbarui daftar kategori setelah penghapusan.
                await getMember()

                // Menampilkan pesan sukses.
                showSuccessAlert('Member terpilih telah dihapus.')
            } catch (error) {
                // Menampilkan pesan kesalahan jika terjadi kesalahan selama penghapusan.
                console.error('Error deleting selected memberes:', error)
                showErrorAlert('Gagal menghapus kategori terpilih.')
            }
        }
    }

    /**
     * Mengubah status pemilihan (selected) kategori berdasarkan ID kategori.
     * @param {string} categoryId - ID kategori yang akan diubah status pemilihannya.
     */
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

    /**
     * Mengubah status pemilihan (selected) untuk semua kategori.
     * Jika semua terpilih, membalik status pemilihan untuk tidak memilih semua, dan sebaliknya.
     */
    const toggleAllSelection = () => {
        setMember((prevMember) =>
            prevMember.map((item) => ({ ...item, selected: !prevMember.every((item) => item.selected) }))
        )
    }

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium text-xl">Daftar Member</strong>
            <div className="flex justify-between items-center mb-3 mt-3">
                <div className="relative space-x-2 ">
                    <Link
                        to="/member/add"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah
                    </Link>
                    <button
                        onClick={deleteSelectedMember}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
                <div className="relative">
                    <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="text-sm focus:outline-none active:outline-none h-10 w-[20rem] border border-gray-300 rounded-sm pl-11 pr-4"
                    />
                </div>
            </div>

            <div className="border-x border-gray-200 rounded-sm">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={member.every((item) => item.selected)}
                                    onChange={toggleAllSelection}
                                />
                            </th>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>No Hp</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {member.map((member, index) => (
                            <tr>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={member.selected || false}
                                        onChange={() => toggleSelection(member.uuid)}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>{member.nama}</td>
                                <td>{member.alamat}</td>
                                <td>{member.telepon}</td>
                                <td className="flex space-x-2">
                                    <Link
                                        to={`./edit/${member.id}`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteMember(member.id)}
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

export default ListMember
