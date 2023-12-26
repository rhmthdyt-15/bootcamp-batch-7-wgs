// utils.js
export function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID').format(angka)
}

export const formatTanggal = (tanggalISO) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    const tanggal = new Date(tanggalISO).toLocaleDateString('id-ID', options)
    return tanggal
}
