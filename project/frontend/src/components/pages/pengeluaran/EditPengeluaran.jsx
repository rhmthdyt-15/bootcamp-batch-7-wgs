import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { showSuccessAlert } from '../../master/SweetAlertUtil'

// Definisi field untuk formulir supplier
const formFields = [
    { name: 'deskripsi', label: 'Deskripsi', type: 'text' },
    { name: 'nominal', label: 'Nominal', type: 'number' }
]

// Komponen untuk mengedit supplier
function EditPengeluaran() {
    // Menggunakan hook useParams untuk mendapatkan nilai dari parameter URL
    const { id } = useParams()

    // Menggunakan hook useNavigate untuk navigasi
    const navigate = useNavigate()

    // State untuk menyimpan data formulir supplier
    const [formData, setFormData] = useState({
        deskripsi: '',
        nominal: ''
    })

    // State untuk menandakan apakah formulir sedang dikirimkan
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Menggunakan custom hook useAuth untuk mendapatkan axios instance dan konfigurasi
    const { axiosJWT, Config } = useAuth()

    // Menggunakan useEffect untuk mengambil data supplier yang akan diedit
    useEffect(() => {
        axiosJWT
            .get(`http://localhost:5000/pengeluaran/${id}`, Config)
            .then((response) => {
                // Mengisi state formData dengan data supplier yang diambil
                setFormData(response.data)
            })
            .catch((error) => console.error('Error fetching supplier data:', error))
    }, [id])

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

        // Kirim permintaan PATCH untuk memperbarui supplier
        axiosJWT
            .put(`http://localhost:5000/pengeluaran/${id}`, formData, Config)
            .then(() => {
                // Navigasi ke halaman supplier setelah berhasil memperbarui
                navigate('/pengeluaran')

                // Menampilkan pesan sukses
                showSuccessAlert('Pengeluaran Berhasil Diperbarui!')

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

    // Render tampilan komponen EditPengeluaran
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="flex justify-between items-center mb-3">
                {/* Judul halaman */}
                <strong className="text-gray-700 font-medium">Edit Pengeluaran</strong>
            </div>
            {/* Formulir untuk mengedit supplier */}
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
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
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
                    to="/pengeluaran"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                >
                    Kembali
                </Link>
            </form>
        </div>
    )
}

// Mengekspor komponen EditPengeluaran sebagai default
export default EditPengeluaran
