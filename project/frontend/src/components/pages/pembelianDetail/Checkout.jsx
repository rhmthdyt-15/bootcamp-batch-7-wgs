import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { HiOutlineSearch } from 'react-icons/hi'
import ProductModal from './ProductModal'

function Checkout() {
    const [showModal, setShowModal] = useState(false)
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium text-xl">Transaksi Pembelian</strong>

            <div className="px-3 py-6  sm:grid-cols-3 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Nama Supplier : Rahmat Hidayat</dt>
                <dt className="text-sm font-medium leading-6 text-gray-900">Telepon : 0896623623</dt>
                <dt className="text-sm font-medium leading-6 text-gray-900">Alamat : Jln.Aja</dt>
            </div>
            <div className="flex justify-start">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="diskon">
                    Produk :
                </label>

                <div className="md:w-1/3 flex">
                    <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="text"
                    />
                    <ProductModal showModal={showModal} setShowModal={setShowModal} />
                </div>
            </div>

            <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Kode Produk</th>
                            <th>Harga</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2">
                                <div className="flex items-center">
                                    <img
                                        className="h-16 w-16 mr-4"
                                        src="https://via.placeholder.com/150"
                                        alt="Product image"
                                    />
                                    <span className="font-semibold">Product name</span>
                                </div>
                            </td>
                            <td className="py-2">$19.99</td>
                            <td className="py-2">$19.99</td>
                            <td className="py-2">
                                <div className="flex items-center">
                                    <button>-</button>
                                    <span className="mx-2">1</span>
                                    <button>+</button>
                                </div>
                            </td>
                            <td className="py-2">$19.99</td>
                            <td>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-3 mt-3">
                <div className="lg:w-8/12 mb-8">
                    <div className="text-4xl text-center h-32 bg-neutral-700 border-2 border-neutral-300 rounded flex items-center justify-center shadow-md text-white">
                        Rp. 10.000
                    </div>
                    <div className="p-4 bg-white border-2 border-gray-300 rounded shadow-md">Sepuluh Ribu Rupiah</div>
                </div>

                <div className="lg:w-4/12 lg:flex relative">
                    <form className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="total"
                                >
                                    Total :
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="total"
                                    type="text"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="diskon"
                                >
                                    Diskon :
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="diskon"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="bayar"
                                >
                                    Bayar :
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="bayar"
                                    type="text"
                                    disabled
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                    type="submit"
                >
                    Simpan Transaksi
                </button>
            </div>
        </div>
    )
}

export default Checkout
