// utils.js
export function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID').format(angka)
}
