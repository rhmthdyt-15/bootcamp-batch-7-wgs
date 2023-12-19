import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom' // Pastikan Anda mengimpor Link dari react-router-dom

function AddProduct() {
    const [formData, setFormData] = useState({
        merk: '',
        nama_produk: '',
        harga_beli: '',
        harga_jual: '',
        stok: '',
        foto_produk_path: '',
        diskon: '',
        kategoriId: ''
    })
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])

    useEffect(() => {
        // Ambil kategori dari backend
        axios
            .get('http://localhost:5000/category')
            .then((response) => setCategories(response.data))
            .catch((error) => console.error('Error fetching categories:', error))
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Kirim permintaan POST untuk membuat produk baru
        axios
            .post('http://localhost:5000/product', formData)
            .then((response) => {
                navigate('/products')
                // Tangani kesuksesan, misalnya, tampilkan pesan sukses atau redirect
            })
            .catch((error) => console.error('Error creating product:', error))
    }

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="flex justify-between items-center mb-3">
                <strong className="text-gray-700 font-medium">Tambah Produk</strong>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {/* Group 1: Nama Produk */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold">Nama Produk</label>
                        <input
                            name="nama_produk"
                            value={formData.nama_produk}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                        />
                    </div>

                    {/* Group 2: Merk */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold">Merk</label>
                        <input
                            name="merk"
                            value={formData.merk}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                        />
                    </div>

                    {/* Group 3: Harga Beli */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold">Harga Beli</label>
                        <input
                            name="harga_beli"
                            value={formData.harga_beli}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                        />
                    </div>

                    {/* Group 4: Harga Jual */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold">Harga Jual</label>
                        <input
                            name="harga_jual"
                            value={formData.harga_jual}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                        />
                    </div>
                    {/* Group 6: Kategori */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold">Kategori</label>
                        <div className="relative">
                            <select
                                name="kategoriId"
                                value={formData.kategoriId}
                                onChange={handleChange}
                                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                            >
                                <option value="" disabled>
                                    Pilih Kategori
                                </option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.nama_kategori}
                                    </option>
                                ))}
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Group 6: Stock */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold">Stock</label>
                        <input
                            name="stok"
                            value={formData.stok}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                        />
                    </div>

                    {/* Group 7: Diskon */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold">Diskon</label>
                        <input
                            name="diskon"
                            value={formData.diskon}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                        />
                    </div>

                    {/* Group 8: Foto Produk */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold">Foto Produk</label>
                        <input
                            name="foto_produk_path"
                            value={formData.foto_produk_path}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save
                    </button>
                    <Link
                        to="/products"
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                    >
                        Kembali
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default AddProduct
