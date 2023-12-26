import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { formatRupiah } from '../../features/utils'
import { useAuth } from '../../auth/useAuth'

function DetailProduct() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const { axiosJWT, Config } = useAuth()

    useEffect(() => {
        // Ambil data produk berdasarkan id
        axiosJWT
            .get(`http://localhost:5000/product/${id}`, Config)
            .then((response) => {
                setProduct(response.data)
            })
            .catch((error) => console.error('Error fetching product:', error))
    }, [id])

    if (!product) {
        return <div>Loading...</div>
    }

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="flex justify-between items-center mb-3">
                <strong className="text-gray-700 font-medium">{product.nama_produk}</strong>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <img src={product.foto_produk_path} alt={product.nama_produk} className="w-full h-auto mb-4" />
                </div>
                <div>
                    <p className="text-gray-600 mb-2">Kode Produk: {product.kode_produk}</p>
                    <p className="text-gray-600 mb-2">Merk: {product.merk}</p>
                    <p className="text-gray-600 mb-2 font-bold">Harga Beli: Rp.{formatRupiah(product.harga_beli)}</p>
                    <p className="text-gray-600 mb-2 font-bold">Harga Jual: Rp.{formatRupiah(product.harga_jual)}</p>
                    <p className="text-gray-600 mb-2">Stok: {product.stok}</p>
                    <p className="text-gray-600 mb-2">Diskon: {product.diskon}</p>
                    <p className="text-gray-600 mb-2">Kategori: {product.kategori?.nama_kategori}</p>
                </div>
            </div>

            <div className="mt-4">
                <Link
                    to="/products"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                >
                    Kembali ke Produk
                </Link>
            </div>
        </div>
    )
}

export default DetailProduct
