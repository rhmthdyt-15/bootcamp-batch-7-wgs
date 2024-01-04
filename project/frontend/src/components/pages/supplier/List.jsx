import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { showErrorAlert, showSuccessAlert, showConfirmationAlert } from '../../master/SweetAlertUtil'
import { HiOutlineSearch } from 'react-icons/hi'
import { formatRupiah } from '../../features/utils'
import { useAuth } from '../../auth/useAuth'
import PaginationInfo from '../../master/PaginationInfo'
import Pagination from '../../master/Pagination'
import SearchComponent from '../../master/SearchComponent'

// Komponen untuk menampilkan daftar supplier
function List() {
    // State untuk menyimpan data supplier
    const [suppliers, setSuppliers] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(5)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [query, setQuery] = useState('')
    const [msg, setMsg] = useState('')

    // Menggunakan custom hook useAuth untuk mendapatkan axios instance dan konfigurasi
    const { axiosJWT, Config } = useAuth()

    // Menggunakan useEffect untuk mendapatkan data supplier saat komponen dimuat
    useEffect(() => {
        getSuppliers()
    }, [page, keyword])

    // Fungsi untuk mendapatkan data supplier dari server
    const getSuppliers = async () => {
        try {
            const response = await axiosJWT.get(
                `http://localhost:5000/suppliers?search_query=${keyword}&page=${page}&limit=${limit}`,
                Config
            )

            // Pengecekan apakah response.data.result adalah array
            if (Array.isArray(response.data.result)) {
                // Mengupdate state suppliers dengan data supplier dari server
                setSuppliers(response.data.result.map((item) => ({ ...item, selected: false })))
                setPage(response.data.page)
                setPages(response.data.totalPage)
                setRows(response.data.totalRows)
            } else {
                console.error('Invalid data format received:', response.data)
                // Menampilkan pesan kesalahan jika format data tidak sesuai
                showErrorAlert('Format data produk tidak valid.')
            }
        } catch (error) {
            // Menampilkan pesan kesalahan jika gagal mendapatkan data supplier
            console.error('Error fetching supplier:', error)
            showErrorAlert('Gagal mengambil supplier.')
        }
    }

    // Fungsi untuk mengubah halaman
    const changePage = (newPage) => {
        setPage(newPage)
    }

    // Fungsi untuk meng-handle perubahan input pencarian
    const handleSearchInputChange = (e) => {
        setQuery(e.target.value)
        setPage(0) // Reset halaman ke 0 ketika pengguna mengetik
        setKeyword(e.target.value) // Menggunakan e.target.value langsung daripada query yang sudah di-update
    }

    // Fungsi untuk menghapus supplier berdasarkan ID
    const deleteSupplier = async (supplierId) => {
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Supplier ini akan dihapus!')

        if (result.isConfirmed) {
            try {
                // Mengirim permintaan DELETE untuk menghapus supplier
                await axiosJWT.delete(`http://localhost:5000/suppliers/${supplierId}`, Config)

                // Mendapatkan ulang data supplier setelah menghapus
                await getSuppliers()

                // Menampilkan pesan sukses
                showSuccessAlert('Supplier telah dihapus.')
            } catch (error) {
                // Menampilkan pesan kesalahan jika gagal menghapus supplier
                console.error('Error deleting supplier:', error)
                showErrorAlert('Gagal menghapus supplier.')
            }
        }
    }

    // Fungsi untuk menghapus supplier terpilih
    const deleteSelectedSuppliers = async () => {
        const selectedIds = suppliers.filter((item) => item.selected).map((item) => item.id)

        if (selectedIds.length === 0) {
            // Menampilkan pesan jika tidak ada supplier terpilih
            showErrorAlert('Pilih setidaknya satu supplier untuk dihapus.')
            return
        }

        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Supplier terpilih akan dihapus!')

        if (result.isConfirmed) {
            try {
                // Mengirim permintaan DELETE untuk menghapus supplier terpilih
                await axiosJWT.delete('http://localhost:5000/suppliers', { ...Config, data: { ids: selectedIds } })

                // Mendapatkan ulang data supplier setelah menghapus
                await getSuppliers()

                // Menampilkan pesan sukses
                showSuccessAlert('Supplier terpilih telah dihapus.')
            } catch (error) {
                // Menampilkan pesan kesalahan jika gagal menghapus supplier terpilih
                console.error('Error deleting selected supplier:', error)
                showErrorAlert('Gagal menghapus supplier terpilih.')
            }
        }
    }

    // Fungsi untuk mengubah status seleksi supplier berdasarkan ID
    const toggleSelection = (supplierId) => {
        setSuppliers((prevSuppliers) =>
            prevSuppliers.map((item) => {
                if (item.id === supplierId) {
                    return { ...item, selected: !item.selected }
                }
                return item
            })
        )
    }

    // Fungsi untuk mengubah status seleksi semua supplier
    const toggleAllSelection = () => {
        setSuppliers((prevSuppliers) =>
            prevSuppliers.map((item) => ({ ...item, selected: !prevSuppliers.every((item) => item.selected) }))
        )
    }

    // Render tampilan komponen List
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            {/* Judul halaman */}
            <strong className="text-gray-700 font-medium text-xl">Daftar Supplier</strong>

            {/* Bagian atas halaman */}
            <div className="flex justify-between items-center mb-3 mt-3">
                {/* Tombol-tombol aksi */}
                <div className="relative space-x-2">
                    {/* Tombol tambah supplier */}
                    <Link
                        to="/suppliers/add"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah
                    </Link>
                    {/* Tombol hapus supplier terpilih */}
                    <button
                        onClick={deleteSelectedSuppliers}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Hapus
                    </button>
                </div>
                {/* Input pencarian */}
                <SearchComponent query={query} handleSearchInputChange={handleSearchInputChange} />
            </div>

            {/* Tabel daftar supplier */}
            <div className="border-x border-gray-200 rounded-sm">
                <table className="w-full text-gray-700">
                    {/* Header tabel */}
                    <thead>
                        <tr>
                            {/* Kolom seleksi semua supplier */}
                            <th>
                                <input
                                    type="checkbox"
                                    checked={suppliers.every((item) => item.selected)}
                                    onChange={toggleAllSelection}
                                />
                            </th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Telepon</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    {/* Isi tabel */}
                    <tbody>
                        {suppliers.map((supplier, index) => (
                            <tr key={supplier.id}>
                                {/* Kolom seleksi supplier */}
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={supplier.selected || false}
                                        onChange={() => toggleSelection(supplier.id)}
                                    />
                                </td>
                                {/* Kolom data supplier */}
                                <td>{supplier.nama}</td>
                                <td>{supplier.alamat}</td>
                                <td>{supplier.telepon}</td>
                                {/* Kolom aksi */}
                                <td className="flex space-x-2">
                                    {/* Tombol edit supplier */}
                                    <Link
                                        to={`/suppliers/edit/${supplier.id}`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                    {/* Tombol hapus supplier */}
                                    <button
                                        onClick={() => deleteSupplier(supplier.id)}
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
            <div className="flex justify-between items-center mb-3 mt-3">
                <PaginationInfo rows={rows} page={page} pages={pages} />
                <Pagination currentPage={page} totalPages={pages} onPageChange={changePage} />
            </div>
        </div>
    )
}

// Mengekspor komponen List sebagai default
export default List
