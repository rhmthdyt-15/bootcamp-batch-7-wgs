import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { showErrorAlert, showSuccessAlert, showConfirmationAlert } from '../../master/SweetAlertUtil'
import { HiOutlineSearch } from 'react-icons/hi'

function ListCategory() {
    const [category, setCategory] = useState([])

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = async () => {
        try {
            const response = await axios.get('http://localhost:5000/category')
            setCategory(response.data.map((item) => ({ ...item, selected: false })))
        } catch (error) {
            console.error('Error fetching categories:', error)
            showErrorAlert('Gagal mengambil kategori.')
        }
    }

    const deleteCategory = async (categoryId) => {
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Kategori ini akan dihapus!')

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/category/${categoryId}`)
                await getCategory()
                showSuccessAlert('Kategori telah dihapus.')
            } catch (error) {
                console.error('Error deleting category:', error)
                showErrorAlert('Gagal menghapus kategori.')
            }
        }
    }

    /**
     * Menghapus kategori terpilih berdasarkan ID kategori yang telah dipilih.
     * Jika tidak ada kategori terpilih, menampilkan pesan kesalahan.
     */
    const deleteSelectedCategories = async () => {
        // Memfilter kategori yang terpilih dan mengambil array ID-nya.
        const selectedIds = category.filter((item) => item.selected).map((item) => item.uuid)

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
                await axios.delete('http://localhost:5000/category', { data: { ids: selectedIds } })

                // Memperbarui daftar kategori setelah penghapusan.
                await getCategory()

                // Menampilkan pesan sukses.
                showSuccessAlert('Kategori terpilih telah dihapus.')
            } catch (error) {
                // Menampilkan pesan kesalahan jika terjadi kesalahan selama penghapusan.
                console.error('Error deleting selected categories:', error)
                showErrorAlert('Gagal menghapus kategori terpilih.')
            }
        }
    }

    /**
     * Mengubah status pemilihan (selected) kategori berdasarkan ID kategori.
     * @param {string} categoryId - ID kategori yang akan diubah status pemilihannya.
     */
    const toggleSelection = (categoryId) => {
        setCategory((prevCategory) =>
            prevCategory.map((item) => {
                // Jika ID kategori cocok, membalikkan status pemilihan.
                if (item.uuid === categoryId) {
                    return { ...item, selected: !item.selected }
                }
                // Menjaga status pemilihan yang tidak berubah untuk kategori lainnya.
                return item
            })
        )
    }

    /**
     * Mengubah status pemilihan (selected) untuk semua kategori.
     * Jika semua terpilih, membalik status pemilihan untuk tidak memilih semua, dan sebaliknya.
     */
    const toggleAllSelection = () => {
        setCategory((prevCategory) =>
            prevCategory.map((item) => ({ ...item, selected: !prevCategory.every((item) => item.selected) }))
        )
    }

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium text-xl">Daftar Category</strong>
            <div className="flex justify-between items-center mb-3 mt-3">
                <div className="relative space-x-2 ">
                    <Link
                        to="/category/add"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah
                    </Link>
                    <button
                        onClick={deleteSelectedCategories}
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
                            <tr key={categori.uuid}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={categori.selected || false}
                                        onChange={() => toggleSelection(categori.uuid)}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>{categori.nama_kategori}</td>
                                <td className="flex space-x-2">
                                    <Link
                                        to={`./edit/${categori.uuid}`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteCategory(categori.uuid)}
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

export default ListCategory
