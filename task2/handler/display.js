// Fungsi untuk menampilkan data dengan opsional filter berdasarkan nama
function displayData(data, filterName) {
  // Menggunakan filter jika filterName disediakan
  const filteredData = filterName
    ? data.filter(entry => entry.name === filterName)
    : data;

  // Menampilkan pesan jika data tidak ditemukan
  if (filteredData.length === 0) {
    console.log(filterName
      ? `Tidak ada data untuk nama ${filterName}`
      : 'Tidak ada data yang tersedia');
  } else {
    // Menampilkan setiap entri data
    filteredData.forEach((entry, index) => {
      console.log(`Data ${index + 1}:`);
      console.log(`  Nama: ${entry.name}`);
      console.log(`  Nomor Telepon: ${entry.phone}`);
    });
  }
}

// Mengekspor fungsi displayData agar dapat digunakan di modul lain
module.exports = displayData;
