import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// Komponen untuk halaman Login
function Login() {
    const [email, setEmail] = useState('') // State untuk menyimpan nilai email
    const [password, setPassword] = useState('') // State untuk menyimpan nilai password
    const [msg, setMsg] = useState('') // State untuk menyimpan pesan kesalahan
    const navigate = useNavigate() // Fungsi navigasi dari react-router-dom

    // Fungsi otentikasi yang dipanggil saat formulir login disubmit
    const Auth = async (e) => {
        e.preventDefault()
        try {
            // Mengirim permintaan otentikasi ke server
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            })
            // Jika otentikasi berhasil, redirect ke halaman utama
            navigate('/')
        } catch (error) {
            // Menangani kesalahan saat otentikasi gagal
            if (error.response) {
                setMsg(error.response.data.msg)
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <form onSubmit={Auth}>
                    {msg && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-neutral-700 p-4" role="alert">
                            <p>{msg}</p>
                        </div>
                    )}

                    <div className="mb-4 mt-3">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
