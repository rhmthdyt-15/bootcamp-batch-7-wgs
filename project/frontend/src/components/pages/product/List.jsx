import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { showErrorAlert, showSuccessAlert, showConfirmationAlert } from '../../master/SweetAlertUtil'
import { HiOutlineSearch } from 'react-icons/hi'
import { formatRupiah } from '../../features/utils'
import { useAuth } from '../../auth/useAuth'

// Komponen untuk menampilkan daftar produk
function ListProduct() {
    // State untuk menyimpan data produk
    const [products, setProducts] = useState([])

    // Menggunakan custom hook useAuth untuk mendapatkan axios instance dan konfigurasi
    const { axiosJWT, Config } = useAuth()

    // Menggunakan useEffect untuk memuat data produk saat komponen dimount
    useEffect(() => {
        getProducts()
    }, [])

    // Fungsi untuk mendapatkan data produk dari backend
    const getProducts = async () => {
        try {
            // Menggunakan axios instance untuk mengambil data produk
            const response = await axiosJWT.get('http://localhost:5000/product', Config)

            // Mengupdate state products dengan data produk dan menambahkan properti selected
            setProducts(response.data.map((item) => ({ ...item, selected: false })))
        } catch (error) {
            console.error('Error fetching products:', error)
            // Menampilkan pesan kesalahan jika gagal mendapatkan produk
            showErrorAlert('Gagal mengambil produk.')
        }
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
                            pathname: '/products/barcode',
                            state: { products: products.filter((item) => item.selected) }
                        }}
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
                <div className="relative">
                    <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="text-sm focus:outline-none active:outline-none h-10 w-[20rem] border border-gray-300 rounded-sm pl-11 pr-4"
                    />
                </div>
            </div>

            {/* Tabel Daftar Produk */}
            <div className="border-x border-gray-200 rounded-sm">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            {/* Kolom Pilihan Produk */}
                            <th>
                                <input
                                    type="checkbox"
                                    checked={products.every((item) => item.selected)}
                                    onChange={toggleAllSelection}
                                />
                            </th>
                            {/* Kolom Nomor */}
                            <th>No</th>
                            {/* Kolom Nama Produk */}
                            <th>Nama Produk</th>
                            {/* Kolom Stok */}
                            <th>Stok</th>
                            {/* Kolom Harga Jual */}
                            <th>Harga Jual</th>
                            {/* Kolom Aksi */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                {/* Pilihan Produk */}
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={product.selected || false}
                                        onChange={() => toggleSelection(product.id)}
                                    />
                                </td>
                                {/* Nomor Urut */}
                                <td>{index + 1}</td>
                                {/* Nama Produk */}
                                <td>{product.nama_produk}</td>
                                {/* Stok Produk */}
                                <td>{product.stok}</td>
                                {/* Harga Jual Produk */}
                                <td className="font-bold">Rp. {formatRupiah(product.harga_jual)}</td>
                                {/* Aksi */}
                                <td className="flex space-x-2">
                                    {/* Tombol Edit */}
                                    <Link
                                        to={`/products/edit/${product.id}`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                    {/* Tombol Detail */}
                                    <Link
                                        to={`/products/detail/${product.id}`}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Detail
                                    </Link>
                                    {/* Tombol Hapus */}
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
        </div>
    )
}

// Mengekspor komponen ListProduct sebagai default
export default ListProduct
