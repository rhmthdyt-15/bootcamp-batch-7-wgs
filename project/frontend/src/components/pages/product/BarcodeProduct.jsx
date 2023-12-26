import React, { useState, useEffect } from 'react'
import Barcode from 'react-barcode'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'

function BarcodeProduct() {
    const location = useLocation()
    const products = location.state?.products || []
    const [productData, setProductData] = useState([])

    const { axiosJWT, Config } = useAuth()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productDetails = await Promise.all(
                    products.map(async (productId) => {
                        const response = await axiosJWT.get(`http://localhost:5000/product/${productId}`, Config)
                        return response.data
                    })
                )
                setProductData(productDetails)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        if (products.length > 0) {
            fetchProducts()
        }
    }, [products, axiosJWT, Config])

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <h2>Barcode Produk</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {productData.map((product) => (
                    <div key={product.id} style={{ textAlign: 'center' }}>
                        <h4>{product.nama_produk}</h4>
                        <Barcode value={product.kode_produk} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BarcodeProduct
