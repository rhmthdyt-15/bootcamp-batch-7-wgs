import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

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

function AddProduct() {
    const navigate = useNavigate()
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
    const [categories, setCategories] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const addProduct = () => {
        setFormData([
            ...formData,
            {
                merk: '',
                nama_produk: '',
                harga_beli: '',
                harga_jual: '',
                stok: '',
                foto_produk_path: '',
                diskon: '',
                kategoriId: ''
            }
        ])
    }

    useEffect(() => {
        // Ambil kategori dari backend
        axios
            .get('http://localhost:5000/category')
            .then((response) => setCategories(response.data))
            .catch((error) => console.error('Error fetching categories:', error))
    }, [])

    const handleChange = (e, index) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Set state isSubmitting menjadi true
        setIsSubmitting(true)

        // Kirim permintaan POST untuk membuat produk baru
        axios
            .post('http://localhost:5000/product', formData)
            .then((response) => {
                navigate('/products')
                // Tangani kesuksesan, misalnya, tampilkan pesan sukses atau redirect

                // Reset nilai formData setelah pengiriman formulir
                setFormData({
                    merk: '',
                    nama_produk: '',
                    harga_beli: '',
                    harga_jual: '',
                    stok: '',
                    foto_produk_path: '',
                    diskon: '',
                    kategoriId: ''
                })

                // Set state isSubmitting menjadi false setelah pengiriman formulir
                setIsSubmitting(false)
            })
            .catch((error) => {
                // Tangani kesalahan, misalnya, tampilkan pesan kesalahan
                console.error('Error submitting form:', error)

                // Set state isSubmitting menjadi false jika terjadi kesalahan
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
                        disabled={isSubmitting} // Tambahkan atribut disabled selama proses pengiriman
                    >
                        {isSubmitting ? 'Sedang Mengirim...' : 'Save'}
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