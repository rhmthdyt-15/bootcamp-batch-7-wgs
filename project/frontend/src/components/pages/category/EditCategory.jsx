import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'

function EditCategory() {
    const [nama_kategori, setNama_kategori] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getCategoryById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/category/${id}`)
                setNama_kategori(response.data.nama_kategori)
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg)
                }
            }
        }
        getCategoryById()
    }, [id])

    const updateCategory = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(`http://localhost:5000/category/${id}`, {
                nama_kategori: nama_kategori
            })
            navigate('/category')
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg)
            }
        }
    }

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="flex justify-between items-center mb-3">
                <strong className="text-gray-700 font-medium">Edit Category</strong>
            </div>
            <form onSubmit={updateCategory}>
                <div className="w-full md:w-1/2 mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nama Kategori</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={nama_kategori}
                        onChange={(e) => setNama_kategori(e.target.value)}
                    />
                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Save
                </button>
                <Link
                    to="/category"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                    type="button"
                >
                    Kembali
                </Link>
            </form>
        </div>
    )
}

export default EditCategory
