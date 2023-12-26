import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { showErrorAlert, showSuccessAlert, showConfirmationAlert } from '../../master/SweetAlertUtil'
import { HiOutlineSearch } from 'react-icons/hi'
import { formatRupiah } from '../../features/utils'
import { useAuth } from '../../auth/useAuth'

function List() {
    const [suppliers, setSuppliers] = useState([])
    const { axiosJWT, Config } = useAuth()

    useEffect(() => {
        getSuppliers()
    }, [])

    const getSuppliers = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5000/suppliers', Config)
            setSuppliers(response.data.map((item) => ({ ...item, selected: false })))
        } catch (error) {
            console.error('Error fetching supplier:', error)
            showErrorAlert('Gagal mengambil supplier.')
        }
    }

    const deleteSupplier = async (supplierId) => {
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Supplier ini akan dihapus!')

        if (result.isConfirmed) {
            try {
                await axiosJWT.delete(`http://localhost:5000/suppliers/${supplierId}`, Config)
                await getSuppliers()
                showSuccessAlert('Supplier telah dihapus.')
            } catch (error) {
                console.error('Error deleting supplier:', error)
                showErrorAlert('Gagal menghapus supplier.')
            }
        }
    }

    const deleteSelectedSuppliers = async () => {
        const selectedIds = suppliers.filter((item) => item.selected).map((item) => item.id)

        if (selectedIds.length === 0) {
            showErrorAlert('Pilih setidaknya satu supplier untuk dihapus.')
            return
        }

        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Supplier terpilih akan dihapus!')

        if (result.isConfirmed) {
            try {
                await axiosJWT.delete('http://localhost:5000/suppliers', { ...Config, data: { ids: selectedIds } })
                await getSuppliers()
                showSuccessAlert('Supplier terpilih telah dihapus.')
            } catch (error) {
                console.error('Error deleting selected supplier:', error)
                showErrorAlert('Gagal menghapus supplier terpilih.')
            }
        }
    }

    const toggleSelection = (supplierId) => {
        setSuppliers((prevsupplier) =>
            prevsupplier.map((item) => {
                if (item.id === supplierId) {
                    return { ...item, selected: !item.selected }
                }
                return item
            })
        )
    }

    const toggleAllSelection = () => {
        setSuppliers((prevsupplier) =>
            prevsupplier.map((item) => ({ ...item, selected: !prevsupplier.every((item) => item.selected) }))
        )
    }
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium text-xl">Daftar Supplier</strong>
            <div className="flex justify-between items-center mb-3 mt-3">
                <div className="relative space-x-2">
                    <Link
                        to="/suppliers/add"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah
                    </Link>
                    <button
                        onClick={deleteSelectedSuppliers}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Hapus
                    </button>
                </div>
                <div className="relative">
                    <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
                    <input
                        type="text"
                        placeholder="Cari..."
                        className="text-sm focus:outline-none active:outline-none h-10 w-[20rem] border border-gray-300 rounded-sm pl-11 pr-4"
                    />
                </div>
            </div>

            <div className="border-x border-gray-200 rounded-sm">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={suppliers.every((item) => item.selected)}
                                    onChange={toggleAllSelection}
                                />
                            </th>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Telepon</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((supplier, index) => (
                            <tr key={supplier.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={supplier.selected || false}
                                        onChange={() => toggleSelection(supplier.id)}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>{supplier.nama}</td>
                                <td>{supplier.alamat}</td>
                                <td>{supplier.telepon}</td>
                                <td className="flex space-x-2">
                                    <Link
                                        to={`/suppliers/edit/${supplier.id}`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteSupplier(supplier.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Hapus
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

export default List
