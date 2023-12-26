import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useAuth } from '../../auth/useAuth'
import { showSuccessAlert } from '../../master/SweetAlertUtil'

function AddCategory() {
    const [categories, setCategories] = useState([
        // Default category object
        { nama_kategori: '' }
    ])

    const { axiosJWT, Config } = useAuth()
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

    const handleInputChange = (index, value) => {
        const updatedCategories = [...categories]
        updatedCategories[index].nama_kategori = value
        setCategories(updatedCategories)
    }

    const addCategory = () => {
        setCategories([...categories, { nama_kategori: '' }])
    }

    const removeCategory = (index) => {
        const updatedCategories = [...categories]
        updatedCategories.splice(index, 1)
        setCategories(updatedCategories)
    }

    const saveCategory = async (e) => {
        e.preventDefault()
        try {
            // Send all categories to the server
            await axiosJWT.post(
                'http://localhost:5000/category',
                {
                    categories
                },
                Config
            )
            navigate('/category')
            showSuccessAlert('Category Berhasil Ditambahkan!')
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg)
            }
        }
    }

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="flex justify-between items-center mb-3">
                <strong className="text-gray-700 font-medium">Tambah Category</strong>
            </div>
            <form onSubmit={saveCategory}>
                {categories.map((category, index) => (
                    <div key={index} className="w-full md:w-1/2 mb-4">
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold">Nama Kategori</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                value={category.nama_kategori}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                            {categories.length > 1 && (
                                <button
                                    type="button"
                                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => removeCategory(index)}
                                >
                                    <FaMinus />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex justify-end">
                    <button
                        className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={addCategory}
                    >
                        <FaPlus />
                    </button>
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

export default AddCategory
