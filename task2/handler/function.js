const validator = require('validator');
const fs = require('fs');

// Path ke file data
const dataPath = 'data.json';

// Fungsi untuk membaca data dari file
function readDataFromFile() {
    try {
      // Jika file tidak ada, buat file baru dan isi dengan array kosong
      if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '[]', 'utf-8');
      }
  
      // Membaca data dari file dan mengonversi ke dalam bentuk objek JSON
      const existingData = fs.readFileSync(dataPath, 'utf-8');
      return JSON.parse(existingData);
    } catch (err) {
      // Menangani kesalahan ketika membaca atau parsing data
      console.error(err);
      return [];
    }
  }
  
  // Fungsi untuk menulis data ke dalam file
  function writeDataToFile(data) {
    try {
      // Menulis data ke dalam file dalam format JSON
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      // Menangani kesalahan ketika menulis data ke dalam file
      console.error(err);
    }
  }
  
  // Fungsi untuk validasi nomor telepon
  function validatePhoneNumber(phone) {
    return validator.isMobilePhone(phone, 'id-ID') ? phone : null;
  }
  
  // Fungsi untuk validasi alamat email
  function validateEmail(email) {
    return email && validator.isEmail(email) ? email : null;
  }
  
  // Fungsi untuk menampilkan data dengan opsional filter berdasarkan nama
  function displayData(data, filterName) {
    // Menggunakan filter jika filterName disediakan
    const filteredData = filterName ? data.filter(entry => entry.name === filterName) : data;
  
    // Menampilkan pesan jika data tidak ditemukan
    if (filteredData.length === 0) {
      console.log(filterName ? `Tidak ada data untuk nama ${filterName}` : 'Tidak ada data yang tersedia');
    } else {
      // Menampilkan setiap entri data
      filteredData.forEach((entry, index) => {
        console.log(`Data ${index + 1}:`);
        console.log(`  Nama: ${entry.name}`);
        console.log(`  Nomor Telepon: ${entry.phone}`);
        if (entry.email) console.log(`  Email: ${entry.email}`);
      });
    }
}

// Mengekspor fungsi-fungsi agar dapat digunakan di file lain
module.exports = {
    readDataFromFile,
    writeDataToFile,
    validatePhoneNumber,
    validateEmail,
    displayData,
};