import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { showErrorAlert, showSuccessAlert, showConfirmationAlert } from '../../master/SweetAlertUtil'
import { HiOutlineSearch } from 'react-icons/hi'
import { formatRupiah, formatTanggal } from '../../features/utils'
import { useAuth } from '../../auth/useAuth'
import SupplierModal from './SupplierModal'

/**
 * Komponen untuk menampilkan daftar pengeluaran.
 */
function List() {
    // State untuk menyimpan data pengeluaran
    const [pembelian, setPembelian] = useState([])
    const [showModal, setShowModal] = useState(false)

    // Menggunakan custom hook useAuth untuk mendapatkan axios instance dan konfigurasi
    const { axiosJWT, Config } = useAuth()

    // Menggunakan useEffect untuk mendapatkan data pengeluaran saat komponen dimuat
    useEffect(() => {
        getPembelian()
    }, [])

    /**
     * Fungsi untuk mendapatkan data pengeluaran dari server.
     */
    const getPembelian = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5000/pembelian', Config)

            // Check if the expected property exists in response.data
            if (response.data && response.data.data) {
                // Assuming `pembelian` is the property containing the array
                const pembelianArray = response.data.data.pembelian

                // Update state pengeluaran with data from the array
                setPembelian(pembelianArray.map((item) => ({ ...item, selected: false })))
            } else {
                console.error('Invalid response structure:', response.data)
                showErrorAlert('Struktur respons tidak valid.')
            }
        } catch (error) {
            console.error('Error fetching pengeluaran:', error)
            showErrorAlert('Gagal mengambil pengeluaran.')
        }
    }

    /**
     * Fungsi untuk menghapus pengeluaran berdasarkan ID.
     * @param {string} pengeluaranId - ID pengeluaran yang akan dihapus.
     */
    const deletePembelian = async (pembelianId) => {
        const result = await showConfirmationAlert('Apakah Anda yakin?', 'Pembelian ini akan dihapus!')

        if (result.isConfirmed) {
            try {
                // Mengirim permintaan DELETE untuk menghapus pengeluaran
                await axiosJWT.delete(`http://localhost:5000/pembelian/${pembelianId}`, Config)

                // Mendapatkan ulang data pengeluaran setelah menghapus
                await getPembelian()

                // Menampilkan pesan sukses
                showSuccessAlert('Pembelian telah dihapus.')
            } catch (error) {
                // Menampilkan pesan kesalahan jika gagal menghapus pengeluaran
                console.error('Error deleting pengeluaran:', error)
                showErrorAlert('Gagal menghapus pengeluaran.')
            }
        }
    }

    // Render tampilan komponen List
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            {/* Judul halaman */}
            <strong className="text-gray-700 font-medium text-xl">Daftar Pembelian</strong>

            {/* Bagian atas halaman */}
            <div className="flex justify-between items-center mb-3 mt-3">
                {/* Tombol-tombol aksi */}
                <div className="relative space-x-2">
                    {/* Tombol tambah pengeluaran */}
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={() => setShowModal(true)}
                    >
                        Transaksi Baru
                    </button>
                    <SupplierModal showModal={showModal} setShowModal={setShowModal} />

                    {/* Tombol hapus pengeluaran terpilih */}
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
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Supplier</th>
                            <th>Total Item</th>
                            <th>Total Harga</th>
                            <th>Total Bayar</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* Isi tabel */}
                    <tbody></tbody>
                </table>
            </div>
        </div>
    )
}

// Mengekspor komponen List sebagai default
export default List
