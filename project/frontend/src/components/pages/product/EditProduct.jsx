import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { showSuccessAlert } from '../../master/SweetAlertUtil'

const formFields = [
    { name: 'nama_produk', label: 'Nama Produk', type: 'text' },
    { name: 'merk', label: 'Merk', type: 'text' },
    { name: 'harga_beli', label: 'Harga Beli', type: 'text' },
    { name: 'harga_jual', label: 'Harga Jual', type: 'text' },
    { name: 'kategoriId', label: 'Kategori', type: 'select' },
    { name: 'stok', label: 'Stock', type: 'text' },
    { name: 'diskon', label: 'Diskon', type: 'text' },
    { name: 'foto_produk_path', label: 'Foto Produk', type: 'text' }
]

function EditProduct() {
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
    const { id } = useParams()
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()
    const { axiosJWT, Config } = useAuth()

    useEffect(() => {
        // Ambil kategori dari backend
        axiosJWT
            .get('http://localhost:5000/category', Config)
            .then((response) => setCategories(response.data))
            .catch((error) => console.error('Error fetching categories:', error))

        // Ambil data produk berdasarkan id
        axiosJWT
            .get(`http://localhost:5000/product/${id}`, Config)
            .then((response) => {
                setProduct(response.data)
                setFormData(response.data) // Mengisi formData dengan data produk
            })
            .catch((error) => console.error('Error fetching product:', error))
    }, [id])

    if (!product) {
        return <div>Loading...</div>
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Kirim permintaan PATCH untuk memperbarui produk
        axiosJWT
            .put(`http://localhost:5000/product/${id}`, formData, Config)
            .then(() => {
                navigate('/products')
                // Tangani kesuksesan, misalnya, tampilkan pesan sukses atau redirect
                showSuccessAlert('Product Berhasil Diupdate!')
            })
            .catch((error) => console.error('Error updating product:', error))
    }

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="flex justify-between items-center mb-3">
                <strong className="text-gray-700 font-medium">Edit Produk</strong>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {formFields.map((field) => (
                        <div key={field.name} className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold">{field.label}</label>
                            {field.type === 'select' ? (
                                <div className="relative">
                                    <select
                                        name={field.name}
                                        value={formData[field.name]}
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
                            ) : (
                                <input
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type={field.type}
                                />
                            )}
                        </div>
                    ))}
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

export default EditProduct
