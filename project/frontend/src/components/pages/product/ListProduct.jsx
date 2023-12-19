import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { showErrorAlert, showSuccessAlert, showConfirmationAlert } from '../../master/SweetAlertUtil'
import { HiOutlineSearch } from 'react-icons/hi'

function ListProduct() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/product')
            setProducts(response.data.map((item) => ({ ...item, selected: false })))
        } catch (error) {
            console.error('Error fetching products:', error)
            showErrorAlert('Gagal mengambil produk.')
        }
    }

    const deleteProduct = async (productId) => {
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Produk ini akan dihapus!')

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/product/${productId}`)
                await getProducts()
                showSuccessAlert('Produk telah dihapus.')
            } catch (error) {
                console.error('Error deleting product:', error)
                showErrorAlert('Gagal menghapus produk.')
            }
        }
    }

    const deleteSelectedProducts = async () => {
        const selectedIds = products.filter((item) => item.selected).map((item) => item.kode_produk)

        if (selectedIds.length === 0) {
            showErrorAlert('Pilih setidaknya satu produk untuk dihapus.')
            return
        }

        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Produk terpilih akan dihapus!')

        if (result.isConfirmed) {
            try {
                await axios.delete('http://localhost:5000/product', { data: { ids: selectedIds } })
                await getProducts()
                showSuccessAlert('Produk terpilih telah dihapus.')
            } catch (error) {
                console.error('Error deleting selected products:', error)
                showErrorAlert('Gagal menghapus produk terpilih.')
            }
        }
    }

    const toggleSelection = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) => {
                if (item.kode_produk === productId) {
                    return { ...item, selected: !item.selected }
                }
                return item
            })
        )
    }

    const toggleAllSelection = () => {
        setProducts((prevProducts) =>
            prevProducts.map((item) => ({ ...item, selected: !prevProducts.every((item) => item.selected) }))
        )
    }

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium text-xl">Daftar Produk</strong>
            <div className="flex justify-between items-center mb-3 mt-3">
                <div className="relative space-x-2 ">
                    <Link
                        to="/products/add"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah
                    </Link>
                    <button
                        onClick={deleteSelectedProducts}
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
                                    checked={products.every((item) => item.selected)}
                                    onChange={toggleAllSelection}
                                />
                            </th>
                            <th>No</th>
                            <th>Nama Produk</th>
                            <th>Stok</th>
                            <th>Harga Jual</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.kode_produk}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={product.selected || false}
                                        onChange={() => toggleSelection(product.kode_produk)}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>{product.nama_produk}</td>
                                <td>{product.stok}</td>
                                <td>{product.harga_jual}</td>
                                <td className="flex space-x-2">
                                    <Link
                                        to={`./edit/${product.kode_produk}`}
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
                                        onClick={() => deleteProduct(product.kode_produk)}
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

export default ListProduct
