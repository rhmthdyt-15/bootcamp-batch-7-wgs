import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { showSuccessAlert } from '../../master/SweetAlertUtil'

// Definisi field-form untuk produk
const formFields = [
    { name: 'nama_produk', label: 'Nama Produk', type: 'text' },
    { name: 'merk', label: 'Merk', type: 'text' },
    { name: 'harga_beli', label: 'Harga Beli', type: 'text' },
    { name: 'harga_jual', label: 'Harga Jual', type: 'text' },
    { name: 'kategoriId', label: 'Kategori', type: 'select' },
    { name: 'diskon', label: 'Diskon', type: 'text' }
]

// Komponen untuk mengedit produk berdasarkan ID
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

    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState(null)
    const [preview, setPreview] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()
    const { axiosJWT, Config } = useAuth()

    useEffect(() => {
        axiosJWT
            .get('http://localhost:5000/category', Config)
            .then((response) => setCategories(response.data))
            .catch((error) => console.error('Error fetching categories:', error))

        axiosJWT
            .get(`http://localhost:5000/product/${id}`, Config)
            .then((response) => {
                setProduct(response.data)
                setFormData(response.data)
                // Set nilai awal preview hanya jika foto_produk_path tersedia
                if (response.data.foto_produk_path) {
                    setPreview(response.data.foto_produk_path)
                } else {
                    setPreview('') // Atur preview menjadi string kosong jika foto_produk_path tidak tersedia
                }
            })
            .catch((error) => console.error('Error fetching product:', error))
    }, [id])

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0]
            setPreview(URL.createObjectURL(file))
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosJWT
            .put(`http://localhost:5000/product/${id}`, formData, Config)
            .then(() => {
                navigate('/products')
                showSuccessAlert('Product Berhasil Diupdate!')
            })
            .catch((error) => console.error('Error updating product:', error))
    }

    // Render tampilan komponen EditProduct
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="flex justify-between items-center mb-3">
                {/* Tampilkan judul */}
                <strong className="text-gray-700 font-medium">Edit Produk</strong>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Tampilkan formulir dengan menggunakan grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    {formFields.map((field) => (
                        <div key={field.name} className="mb-4">
                            {/* Tampilkan label formulir */}
                            <label className="block text-gray-700 text-sm font-bold">{field.label}</label>
                            {/* Pilih input atau select berdasarkan tipe field */}
                            {field.type === 'select' ? (
                                <div className="relative">
                                    {/* Tampilkan input select untuk kategori */}
                                    <select
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                                    >
                                        <option value="" disabled>
                                            Pilih Kategori
                                        </option>
                                        {/* Tampilkan opsi kategori */}
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.nama_kategori}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Tampilkan icon dropdown */}
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
                                // Tampilkan input untuk tipe data lainnya
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
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold">Foto Produk</label>
                        <input type="file" accept="image/*" onChange={(e) => handleChange(e)} className="border p-2" />
                        {preview && (
                            <div className="mt-2">
                                <img src={preview} alt="Preview" className="max-w-full h-auto" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Tombol Simpan dan Kembali */}
                <div className="flex justify-end">
                    {/* Tombol Simpan */}
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                        type="submit"
                    >
                        Save
                    </button>
                    {/* Tombol Kembali */}
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

// Mengekspor komponen EditProduct sebagai default
export default EditProduct
