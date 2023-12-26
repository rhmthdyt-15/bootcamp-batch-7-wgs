import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { showSuccessAlert } from '../../master/SweetAlertUtil'

const formFields = [
    { name: 'nama', label: 'Nama', type: 'text' },
    { name: 'alamat', label: 'Alamat', type: 'text' },
    { name: 'telepon', label: 'Telepon', type: 'number' } // Ganti type menjadi 'text'
]

function EditMember() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [members, setMembers] = useState(null)
    const [formData, setFormData] = useState({
        nama: '',
        alamat: '',
        telepon: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { axiosJWT, Config } = useAuth()

    useEffect(() => {
        axiosJWT
            .get(`http://localhost:5000/member/${id}`, Config)
            .then((response) => {
                setMembers(response.data)
                setFormData(response.data) // Mengisi formData dengan data produk
            })
            .catch((error) => console.error('Error fetching product:', error))
    }, [id])

    if (!members) {
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
        setIsSubmitting(true)

        // Mengirim permintaan PATCH untuk memperbarui member
        axiosJWT
            .put(`http://localhost:5000/member/${id}`, formData, Config)
            .then(() => {
                navigate('/members')
                showSuccessAlert('Member Berhasil Diperbarui!')
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
                <strong className="text-gray-700 font-medium">Edit Member</strong>
            </div>
            <form onSubmit={handleSubmit}>
                {formFields.map((field) => (
                    <div className="w-full md:w-1/2 mb-4" key={field.name}>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold">{field.label}</label>
                        </div>
                        <div className="flex items-center">
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

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Simpan
                </button>

                <Link
                    to="/members"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                >
                    Kembali
                </Link>
            </form>
        </div>
    )
}

export default EditMember
