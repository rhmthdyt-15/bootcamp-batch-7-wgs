// ProductModal.js
import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

function ProductModal({ showModal, setShowModal }) {
    return (
        <>
            {showModal && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-6xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Pilih Produk</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
                                        <div className="flex justify-between items-center mb-3 mt-3">
                                            {/* Input pencarian */}
                                            <div className="relative ml-auto">
                                                <HiOutlineSearch
                                                    fontSize={20}
                                                    className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Cari..."
                                                    className="text-sm focus:outline-none active:outline-none h-10 w-[20rem] border border-gray-300 rounded-sm pl-11 pr-4"
                                                />
                                            </div>
                                        </div>
                                        {/* Tabel daftar supplier */}
                                        <div className="border-x border-gray-200 rounded-sm">
                                            <table className="w-full text-gray-700">
                                                {/* Header tabel */}
                                                <thead>
                                                    <tr>
                                                        <th>Kode Produk</th>
                                                        <th>Nama</th>
                                                        <th>Harga Beli</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                {/* Isi tabel */}
                                                <tbody>
                                                    <tr>
                                                        <td>udsdyeiwdiw</td>
                                                        <td>aIUAHASUHASJANBSBAUSYAUS</td>
                                                        <td>Berapa</td>
                                                        <td>
                                                            <button className="ttext-xs bg-green-500 text-white rounded-md px-2 py-1 transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700 active:bg-green-700">
                                                                Pilih
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </>
    )
}

export default ProductModal
