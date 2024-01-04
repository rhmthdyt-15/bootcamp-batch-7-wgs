import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { showErrorAlert, showSuccessAlert, showConfirmationAlert } from '../../master/SweetAlertUtil'
import { HiOutlineSearch } from 'react-icons/hi'
import { formatRupiah } from '../../features/utils'
import { useAuth } from '../../auth/useAuth'
import Pagination from '../../master/Pagination'
import SearchComponent from '../../master/SearchComponent'
import PaginationInfo from '../../master/PaginationInfo'

// Komponen untuk menampilkan daftar produk
function ListProduct() {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(5)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [query, setQuery] = useState('')
    const [msg, setMsg] = useState('')

    // Menggunakan custom hook useAuth untuk mendapatkan axios instance dan konfigurasi
    const { axiosJWT, Config } = useAuth()

    // Menggunakan useEffect untuk memuat data produk saat komponen dimount atau saat ada perubahan pada 'page' dan 'keyword'
    useEffect(() => {
        getProducts()
    }, [page, keyword])

    // Fungsi untuk mendapatkan data produk dari backend
    const getProducts = async () => {
        try {
            // Menggunakan axios instance untuk mengambil data produk
            const response = await axiosJWT.get(
                `http://localhost:5000/product?search_query=${keyword}&page=${page}&limit=${limit}`,
                Config
            )

            // Pengecekan apakah response.data.result adalah array
            if (Array.isArray(response.data.result)) {
                // Mengupdate state products dengan data produk dan menambahkan properti selected
                setProducts(response.data.result.map((item) => ({ ...item, selected: false })))
                setPage(response.data.page)
                setPages(response.data.totalPage)
                setRows(response.data.totalRows)
            } else {
                console.error('Invalid data format received:', response.data)
                // Menampilkan pesan kesalahan jika format data tidak sesuai
                showErrorAlert('Format data produk tidak valid.')
            }
        } catch (error) {
            console.error('Error fetching products:', error)
            // Menampilkan pesan kesalahan jika gagal mendapatkan produk
            showErrorAlert('Gagal mengambil produk.')
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

    // Fungsi untuk menghapus produk berdasarkan ID
    const deleteProduct = async (productId) => {
        // Menampilkan konfirmasi alert sebelum menghapus
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Produk ini akan dihapus!')

        if (result.isConfirmed) {
            try {
                // Menggunakan axios untuk menghapus produk
                await axiosJWT.delete(`http://localhost:5000/product/${productId}`, Config)

                // Memuat ulang data produk setelah menghapus
                await getProducts()

                // Menampilkan pesan sukses
                showSuccessAlert('Produk telah dihapus.')
            } catch (error) {
                console.error('Error deleting product:', error)
                // Menampilkan pesan kesalahan jika gagal menghapus produk
                showErrorAlert('Gagal menghapus produk.')
            }
        }
    }

    // Fungsi untuk menghapus produk terpilih
    const deleteSelectedProducts = async () => {
        // Mendapatkan ID produk yang dipilih
        const selectedIds = products.filter((item) => item.selected).map((item) => item.id)

        // Menampilkan pesan jika tidak ada produk yang dipilih
        if (selectedIds.length === 0) {
            showErrorAlert('Pilih setidaknya satu produk untuk dihapus.')
            return
        }

        // Menampilkan konfirmasi alert sebelum menghapus produk terpilih
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Produk terpilih akan dihapus!')

        if (result.isConfirmed) {
            try {
                // Menggunakan axios untuk menghapus produk terpilih
                await axiosJWT.delete('http://localhost:5000/product', { ...Config, data: { ids: selectedIds } })

                // Memuat ulang data produk setelah menghapus
                await getProducts()

                // Menampilkan pesan sukses
                showSuccessAlert('Produk terpilih telah dihapus.')
            } catch (error) {
                console.error('Error deleting selected products:', error)
                // Menampilkan pesan kesalahan jika gagal menghapus produk terpilih
                showErrorAlert('Gagal menghapus produk terpilih.')
            }
        }
    }

    // Fungsi untuk menoggle pemilihan produk berdasarkan ID
    const toggleSelection = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) => {
                if (item.id === productId) {
                    return { ...item, selected: !item.selected }
                }
                return item
            })
        )
    }

    // Fungsi untuk menoggle pemilihan semua produk
    const toggleAllSelection = () => {
        setProducts((prevProducts) =>
            prevProducts.map((item) => ({ ...item, selected: !prevProducts.every((item) => item.selected) }))
        )
    }

    // Render tampilan komponen ListProduct
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            {/* Judul halaman */}
            <strong className="text-gray-700 font-medium text-xl">Daftar Produk</strong>
            <div className="flex justify-between items-center mb-3 mt-3">
                <div className="relative space-x-2 ">
                    {/* Tombol Tambah Produk */}
                    <Link
                        to="/products/add"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah
                    </Link>
                    {/* Tombol Cetak Barcode untuk Produk Terpilih */}
                    <Link
                        to={{
                            pathname: '/products/barcode'
                        }}
                        state={{ products: products.filter((item) => item.selected) }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cetak Barcode
                    </Link>
                    {/* Tombol Hapus Produk Terpilih */}
                    <button
                        onClick={deleteSelectedProducts}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
                {/* Pencarian produk */}
                <SearchComponent query={query} handleSearchInputChange={handleSearchInputChange} />
            </div>

            {/* Tabel Daftar Produk */}
            <div className="border-x border-gray-200 rounded-sm">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={products.every((item) => item.selected)}
                                    onChange={toggleAllSelection}
                                />
                            </th>

                            <th>Kode Produk</th>
                            <th>Nama Produk</th>
                            <th>Merk</th>
                            <th>Kategori</th>
                            <th>Stok</th>
                            <th>Harga Jual</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={product.selected || false}
                                        onChange={() => toggleSelection(product.id)}
                                    />
                                </td>
                                <td>{product.kode_produk}</td>
                                <td>{product.nama_produk}</td>
                                <td>{product.merk}</td>
                                <td>{product.kategori?.nama_kategori}</td>
                                <td>{product.stok}</td>
                                <td className="font-bold">Rp. {formatRupiah(product.harga_jual)}</td>
                                <td className="flex space-x-2">
                                    <Link
                                        to={`/products/edit/${product.id}`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        to={`/products/detail/${product.id}`}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Detail
                                    </Link>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
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

export default ListProduct
