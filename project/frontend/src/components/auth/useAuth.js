import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

// Fungsi penggunaan otentikasi untuk mendapatkan data pengguna, token, dan konfigurasi Axios
export const useAuth = () => {
    const [name, setName] = useState('') // Nama pengguna
    const [token, setToken] = useState('') // Token otentikasi
    const [expire, setExpire] = useState('') // Waktu kedaluwarsa token
    const navigate = useNavigate() // Fungsi navigasi dari react-router-dom

    useEffect(() => {
        refreshToken()
    }, [])

    // Fungsi untuk mendapatkan token baru dengan menggunakan refreshToken
    const refreshToken = async () => {
        try {
            // Mengirim permintaan untuk mendapatkan refreshToken dari server
            const response = await axios.get('http://localhost:5000/token')
            const newToken = response.data.accessToken
            setToken(newToken)

            // Mendekode token untuk mendapatkan informasi pengguna
            const decoded = jwtDecode(newToken)
            setName(decoded.name)
            setExpire(decoded.exp)
        } catch (error) {
            // Menangani kesalahan saat mendapatkan refreshToken
            if (error.response && error.response.status === 401) {
                // Jika token tidak valid atau kedaluwarsa, redirect ke halaman login
                navigate('/login')
            }
        }
    }

    // Membuat instance Axios dengan interceptor untuk otentikasi token
    const axiosJWT = axios.create()

    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date()

            // Memeriksa apakah token telah kedaluwarsa
            if (expire * 1000 < currentDate.getTime()) {
                // Mendapatkan refreshToken baru jika token telah kedaluwarsa
                const response = await axios.get('http://localhost:5000/token')
                config.headers.Authorization = `Bearer ${response.data.accessToken}`
                setToken(response.data.accessToken)

                // Mendekode token baru untuk mendapatkan informasi pengguna
                const decoded = jwtDecode(response.data.accessToken)
                setName(decoded.name)
                setExpire(decoded.exp)
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // Konfigurasi untuk header Authorization dalam Axios
    const Config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // Mengembalikan objek yang berisi informasi pengguna, token, instance Axios, dan konfigurasi header
    return { name, token, expire, axiosJWT, Config }
}
