import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { showErrorAlert, showSuccessAlert, showConfirmationAlert } from '../../master/SweetAlertUtil'
import { HiOutlineSearch } from 'react-icons/hi'
import { useAuth } from '../../auth/useAuth'

// Komponen untuk menampilkan daftar kategori
function List() {
    const [category, setCategory] = useState([]) // State untuk menyimpan data kategori
    const { axiosJWT, Config } = useAuth() // Mengambil objek axiosJWT dan Config dari useAuth hook

    // Mengambil data kategori saat komponen dimount
    useEffect(() => {
        getCategory()
    }, [])

    // Fungsi untuk mengambil data kategori dari server
    const getCategory = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5000/category', Config)
            setCategory(response.data.map((item) => ({ ...item, selected: false })))
        } catch (error) {
            console.error('Error fetching categories:', error)
            showErrorAlert('Gagal mengambil kategori.')
        }
    }

    // Fungsi untuk menghapus kategori berdasarkan ID
    const deleteCategory = async (categoryId) => {
        // Menampilkan konfirmasi pengguna sebelum menghapus
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Kategori ini akan dihapus!')

        if (result.isConfirmed) {
            try {
                // Mengirim permintaan ke server untuk menghapus kategori
                await axiosJWT.delete(`http://localhost:5000/category/${categoryId}`, Config)
                // Mengambil data kategori terbaru
                await getCategory()
                // Menampilkan pemberitahuan sukses
                showSuccessAlert('Kategori telah dihapus.')
            } catch (error) {
                console.error('Error deleting category:', error)
                // Menampilkan pemberitahuan kesalahan jika penghapusan kategori gagal
                showErrorAlert('Gagal menghapus kategori.')
            }
        }
    }

    // Fungsi untuk menghapus kategori terpilih
    const deleteSelectedCategories = async () => {
        // Mengambil ID kategori yang dipilih
        const selectedIds = category.filter((item) => item.selected).map((item) => item.id)

        // Menampilkan pesan kesalahan jika tidak ada kategori yang dipilih
        if (selectedIds.length === 0) {
            showErrorAlert('Pilih setidaknya satu kategori untuk dihapus.')
            return
        }

        // Menampilkan konfirmasi pengguna sebelum menghapus kategori terpilih
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Kategori terpilih akan dihapus!')

        if (result.isConfirmed) {
            try {
                // Mengirim permintaan ke server untuk menghapus kategori terpilih
                await axiosJWT.delete('http://localhost:5000/category', { ...Config, data: { ids: selectedIds } })
                // Mengambil data kategori terbaru
                await getCategory()
                // Menampilkan pemberitahuan sukses
                showSuccessAlert('Kategori terpilih telah dihapus.')
            } catch (error) {
                console.error('Error deleting selected categories:', error)
                // Menampilkan pemberitahuan kesalahan jika penghapusan kategori terpilih gagal
                showErrorAlert('Gagal menghapus kategori terpilih.')
            }
        }
    }

    // Fungsi untuk memilih atau tidak memilih suatu kategori
    const toggleSelection = (categoryId) => {
        setCategory((prevCategory) =>
            prevCategory.map((item) => {
                if (item.id === categoryId) {
                    return { ...item, selected: !item.selected }
                }
                return item
            })
        )
    }

    // Fungsi untuk memilih atau tidak memilih semua kategori
    const toggleAllSelection = () => {
        setCategory((prevCategory) =>
            prevCategory.map((item) => ({ ...item, selected: !prevCategory.every((item) => item.selected) }))
        )
    }

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium text-xl">Daftar Category</strong>
            <div className="flex justify-between items-center mb-3 mt-3">
                <div className="relative space-x-2">
                    {/* Tombol untuk menambah kategori baru */}
                    <Link
                        to="/category/add"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah
                    </Link>
                    {/* Tombol untuk menghapus kategori terpilih */}
                    <button
                        onClick={deleteSelectedCategories}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
                {/* Input pencarian kategori */}
                <div className="relative">
                    <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="text-sm focus:outline-none active:outline-none h-10 w-[20rem] border border-gray-300 rounded-sm pl-11 pr-4"
                    />
                </div>
            </div>

            {/* Tabel untuk menampilkan daftar kategori */}
            <div className="border-x border-gray-200 rounded-sm">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th>
                                {/* Checkbox untuk memilih semua kategori */}
                                <input
                                    type="checkbox"
                                    checked={category.every((item) => item.selected)}
                                    onChange={toggleAllSelection}
                                />
                            </th>
                            <th>No</th>
                            <th>Nama Kategori</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((categori, index) => (
                            <tr key={categori.id}>
                                <td>
                                    {/* Checkbox untuk memilih kategori tertentu */}
                                    <input
                                        type="checkbox"
                                        checked={categori.selected || false}
                                        onChange={() => toggleSelection(categori.id)}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>{categori.nama_kategori}</td>
                                <td className="flex space-x-2">
                                    {/* Tombol untuk mengedit kategori */}
                                    <Link
                                        to={`./edit/${categori.id}`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                    {/* Tombol untuk menghapus kategori */}
                                    <button
                                        onClick={() => deleteCategory(categori.id)}
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

export default List
