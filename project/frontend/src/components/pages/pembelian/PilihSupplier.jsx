import React, { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { useAuth } from '../../auth/useAuth'
import { showErrorAlert } from '../../master/SweetAlertUtil'
import { FaCheck } from 'react-icons/fa'

function PilihSupplier() {
    const { axiosJWT, Config } = useAuth()
    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {
        getSuppliers()
    }, [])

    const getSuppliers = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5000/pembelian', Config)

            // Check if the expected property exists in response.data
            if (response.data && response.data.success && response.data.data && response.data.data.suppliers) {
                // Assuming `pembelian` is the property containing the array
                const suppliersArray = response.data.data.suppliers

                // Update state suppliers with data from the array
                setSuppliers(suppliersArray.map((item) => ({ ...item, selected: false })))
            } else {
                console.error('Invalid response structure:', response.data)
                showErrorAlert('Struktur respons tidak valid.')
            }
        } catch (error) {
            console.error('Error fetching suppliers:', error)
            showErrorAlert('Gagal mengambil suppliers.')
        }
    }

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            {/* Judul halaman */}
            <strong className="text-gray-700 font-medium text-xl">Pilih Supplier</strong>
            <div className="flex justify-between items-center mb-3 mt-3">
                {/* Input pencarian */}
                <div className="relative ml-auto">
                    <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
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
                            <th>No</th>
                            <th>Nama</th>
                            <th>Telepon</th>
                            <th>Alamat</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* Isi tabel */}
                    <tbody>
                        {suppliers.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.nama}</td>
                                <td>{item.telepon}</td>
                                <td>{item.alamat}</td>
                                <td>
                                    <button className="ttext-xs bg-green-500 text-white rounded-md px-2 py-1 transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none focus:ring focus:border-green-700 active:bg-green-700">
                                        Pilih
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PilihSupplier
