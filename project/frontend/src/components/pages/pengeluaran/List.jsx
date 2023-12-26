import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { showErrorAlert, showSuccessAlert, showConfirmationAlert } from '../../master/SweetAlertUtil'
import { HiOutlineSearch } from 'react-icons/hi'
import { formatRupiah } from '../../features/utils'
import { useAuth } from '../../auth/useAuth'

/**
 * Komponen untuk menampilkan daftar pengeluaran.
 */
function List() {
    // State untuk menyimpan data pengeluaran
    const [pengeluaran, setPengeluaran] = useState([])

    // Menggunakan custom hook useAuth untuk mendapatkan axios instance dan konfigurasi
    const { axiosJWT, Config } = useAuth()

    // Menggunakan useEffect untuk mendapatkan data pengeluaran saat komponen dimuat
    useEffect(() => {
        getPengeluaran()
    }, [])

    /**
     * Fungsi untuk mendapatkan data pengeluaran dari server.
     */
    const getPengeluaran = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5000/pengeluaran', Config)

            // Mengupdate state pengeluaran dengan data pengeluaran dari server
            setPengeluaran(response.data.map((item) => ({ ...item, selected: false })))
        } catch (error) {
            // Menampilkan pesan kesalahan jika gagal mendapatkan data pengeluaran
            console.error('Error fetching pengeluaran:', error)
            showErrorAlert('Gagal mengambil pengeluaran.')
        }
    }

    /**
     * Fungsi untuk menghapus pengeluaran berdasarkan ID.
     * @param {string} pengeluaranId - ID pengeluaran yang akan dihapus.
     */
    const deletePengeluaran = async (pengeluaranId) => {
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Pengeluaran ini akan dihapus!')

        if (result.isConfirmed) {
            try {
                // Mengirim permintaan DELETE untuk menghapus pengeluaran
                await axiosJWT.delete(`http://localhost:5000/pengeluaran/${pengeluaranId}`, Config)

                // Mendapatkan ulang data pengeluaran setelah menghapus
                await getPengeluaran()

                // Menampilkan pesan sukses
                showSuccessAlert('Pengeluaran telah dihapus.')
            } catch (error) {
                // Menampilkan pesan kesalahan jika gagal menghapus pengeluaran
                console.error('Error deleting pengeluaran:', error)
                showErrorAlert('Gagal menghapus pengeluaran.')
            }
        }
    }

    /**
     * Fungsi untuk menghapus pengeluaran terpilih.
     */
    const deleteSelectedPengeluaran = async () => {
        const selectedIds = pengeluaran.filter((item) => item.selected).map((item) => item.id)

        if (selectedIds.length === 0) {
            // Menampilkan pesan jika tidak ada pengeluaran terpilih
            showErrorAlert('Pilih setidaknya satu pengeluaran untuk dihapus.')
            return
        }

        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Pengeluaran terpilih akan dihapus!')

        if (result.isConfirmed) {
            try {
                // Mengirim permintaan DELETE untuk menghapus pengeluaran terpilih
                await axiosJWT.delete('http://localhost:5000/pengeluaran', { ...Config, data: { ids: selectedIds } })

                // Mendapatkan ulang data pengeluaran setelah menghapus
                await getPengeluaran()

                // Menampilkan pesan sukses
                showSuccessAlert('Pengeluaran terpilih telah dihapus.')
            } catch (error) {
                // Menampilkan pesan kesalahan jika gagal menghapus pengeluaran terpilih
                console.error('Error deleting selected pengeluaran:', error)
                showErrorAlert('Gagal menghapus pengeluaran terpilih.')
            }
        }
    }

    /**
     * Fungsi untuk mengubah status seleksi pengeluaran berdasarkan ID.
     * @param {string} pengeluaranId - ID pengeluaran yang akan diubah status seleksinya.
     */
    const toggleSelection = (pengeluaranId) => {
        setPengeluaran((prevPengeluaran) =>
            prevPengeluaran.map((item) => {
                if (item.id === pengeluaranId) {
                    return { ...item, selected: !item.selected }
                }
                return item
            })
        )
    }

    /**
     * Fungsi untuk mengubah status seleksi semua pengeluaran.
     */
    const toggleAllSelection = () => {
        setPengeluaran((prevPengeluaran) =>
            prevPengeluaran.map((item) => ({ ...item, selected: !prevPengeluaran.every((item) => item.selected) }))
        )
    }

    // Render tampilan komponen List
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            {/* Judul halaman */}
            <strong className="text-gray-700 font-medium text-xl">Daftar Pengeluaran</strong>

            {/* Bagian atas halaman */}
            <div className="flex justify-between items-center mb-3 mt-3">
                {/* Tombol-tombol aksi */}
                <div className="relative space-x-2">
                    {/* Tombol tambah pengeluaran */}
                    <Link
                        to="/pengeluaran/add"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah
                    </Link>
                    {/* Tombol hapus pengeluaran terpilih */}
                    <button
                        onClick={deleteSelectedPengeluaran}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Hapus
                    </button>
                </div>

                {/* Input pencarian */}
                <div className="relative">
                    <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
                    <input
                        type="text"
                        placeholder="Cari..."
                        className="text-sm focus:outline-none active:outline-none h-10 w-[20rem] border border-gray-300 rounded-sm pl-11 pr-4"
                    />
                </div>
            </div>

            {/* Tabel daftar pengeluaran */}
            <div className="border-x border-gray-200 rounded-sm">
                <table className="w-full text-gray-700">
                    {/* Header tabel */}
                    <thead>
                        <tr>
                            {/* Kolom seleksi semua pengeluaran */}
                            <th>
                                <input
                                    type="checkbox"
                                    checked={pengeluaran.every((item) => item.selected)}
                                    onChange={toggleAllSelection}
                                />
                            </th>
                            <th>No</th>
                            <th>Deskripsi</th>
                            <th>Nominal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    {/* Isi tabel */}
                    <tbody>
                        {pengeluaran.map((row, index) => (
                            <tr key={row.id}>
                                {/* Kolom seleksi row */}
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={row.selected || false}
                                        onChange={() => toggleSelection(row.id)}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                {/* Kolom data row */}
                                <td>{row.deskripsi}</td>
                                <td className="font-bold">Rp. {formatRupiah(row.nominal)}</td>
                                {/* Kolom aksi */}
                                <td className="flex space-x-2">
                                    {/* Tombol edit row */}
                                    <Link
                                        to={`/pengeluaran/edit/${row.id}`}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                    {/* Tombol hapus pengeluaran */}
                                    <button
                                        onClick={() => deletePengeluaran(row.id)}
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

// Mengekspor komponen List sebagai default
export default List
