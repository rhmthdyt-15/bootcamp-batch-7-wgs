import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../auth/useAuth'
import { showSuccessAlert } from '../../master/SweetAlertUtil'

const formFields = [
    { name: 'nama_produk', label: 'Nama Produk', type: 'text' },
    { name: 'merk', label: 'Merk', type: 'text' },
    { name: 'harga_beli', label: 'Harga Beli', type: 'text' },
    { name: 'harga_jual', label: 'Harga Jual', type: 'text' },
    { name: 'kategoriId', label: 'Kategori', type: 'select' },
    { name: 'diskon', label: 'Diskon', type: 'text' }
]

function AddProduct() {
    const navigate = useNavigate()
    const { axiosJWT, Config } = useAuth()
    const [formData, setFormData] = useState({
        merk: '',
        nama_produk: '',
        harga_beli: '',
        harga_jual: '',
        stok: '',
        foto_produk_path: null, // Ubah menjadi null agar URL preview dapat dihasilkan
        diskon: '',
        kategoriId: ''
    })
    const [categories, setCategories] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [preview, setPreview] = useState('')

    useEffect(() => {
        axiosJWT
            .get('http://localhost:5000/category', Config)
            .then((response) => setCategories(response.data))
            .catch((error) => console.error('Error fetching categories:', error))
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        // Buat URL preview dari file yang dipilih
        setPreview(URL.createObjectURL(file))

        setFormData({
            ...formData,
            foto_produk_path: file
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formDataToSend = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key])
        })

        axiosJWT
            .post('http://localhost:5000/product', formDataToSend, Config)
            .then((response) => {
                navigate('/products')
                showSuccessAlert('Product Berhasil Ditambahkan!')
                setFormData({
                    merk: '',
                    nama_produk: '',
                    harga_beli: '',
                    harga_jual: '',
                    stok: '',
                    foto_produk_path: null,
                    diskon: '',
                    kategoriId: ''
                })
                setPreview('') // Reset preview setelah submit
                setIsSubmitting(false)
            })
            .catch((error) => {
                console.error('Error submitting form:', error)
                setIsSubmitting(false)
            })
    }
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="flex justify-between items-center mb-3">
                <strong className="text-gray-700 font-medium">Tambah Product</strong>
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
                                        onChange={(e) => handleChange(e)}
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
                                    onChange={(e) => handleChange(e)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type={field.type}
                                />
                            )}
                        </div>
                    ))}
                    {/* Input file HTML standar */}
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold">Foto Produk</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e)}
                            className="border p-2"
                        />
                        {preview && (
                            <div className="mt-2">
                                <img src={preview} alt="Preview" className="max-w-full h-auto" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sedang Mengirim...' : 'Simpan'}
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
