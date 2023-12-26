import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { showSuccessAlert } from '../../master/SweetAlertUtil'

// Definisi field untuk formulir supplier
const formFields = [
    { name: 'nama', label: 'Nama', type: 'text' },
    { name: 'alamat', label: 'Alamat', type: 'text' },
    { name: 'telepon', label: 'Telepon', type: 'number' } // Ganti type menjadi 'text'
]

// Komponen untuk menambahkan supplier baru
function AddSupplier() {
    // Menggunakan hook useNavigate untuk navigasi
    const navigate = useNavigate()

    // State untuk menyimpan data formulir supplier
    const [formData, setFormData] = useState({
        nama: '',
        alamat: '',
        telepon: ''
    })

    // State untuk menandakan apakah formulir sedang dikirimkan
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Menggunakan custom hook useAuth untuk mendapatkan axios instance dan konfigurasi
    const { axiosJWT, Config } = useAuth()

    // Fungsi untuk menangani perubahan nilai di formulir
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // Fungsi untuk menangani pengiriman formulir
    const handleSubmit = (e) => {
        e.preventDefault()

        // Set state isSubmitting menjadi true
        setIsSubmitting(true)

        // Kirim permintaan POST untuk membuat supplier baru
        axiosJWT
            .post('http://localhost:5000/suppliers', formData, Config)
            .then((response) => {
                // Navigasi ke halaman supplier setelah berhasil menambahkan
                navigate('/suppliers')

                // Menampilkan pesan sukses
                showSuccessAlert('Supplier Berhasil Ditambahkan!')

                // Reset nilai formData setelah pengiriman formulir
                setFormData({
                    nama: '',
                    telepon: '',
                    alamat: ''
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

    // Render tampilan komponen AddSupplier
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="flex justify-between items-center mb-3">
                {/* Judul halaman */}
                <strong className="text-gray-700 font-medium">Tambah Supplier</strong>
            </div>
            {/* Formulir untuk menambahkan supplier baru */}
            <form onSubmit={handleSubmit}>
                {/* Mapped formFields untuk membuat elemen formulir */}
                {formFields.map((field) => (
                    <div className="w-full md:w-1/2 mb-4" key={field.name}>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold">{field.label}</label>
                        </div>
                        <div className="flex items-center">
                            {/* Input elemen sesuai dengan definisi di formFields */}
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type={field.type} // Ganti type sesuai dengan definisi di formFields
                                name={field.name}
                                value={formData[field.name]} // Gunakan formData[field.name] untuk mengambil nilai yang sesuai
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                ))}

                {/* Tombol untuk mengirim formulir */}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Save
                </button>

                {/* Tombol untuk kembali ke halaman supplier */}
                <Link
                    to="/suppliers"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                >
                    Kembali
                </Link>
            </form>
        </div>
    )
}

// Mengekspor komponen AddSupplier sebagai default
export default AddSupplier
