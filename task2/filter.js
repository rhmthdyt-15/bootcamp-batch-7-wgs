// Mengimpor modul validator untuk validasi input
const validator = require('validator');

// Mengimpor modul 'fs' untuk operasi file
const fs = require('fs');

// Mengimpor modul 'yargs' untuk menangani command line arguments
const yargs = require('yargs');

// Mendefinisikan command line options menggunakan 'yargs'
const argv = yargs
  .command('add', 'Menambahkan data baru', {
    name: {
      describe: 'Nama kamu',
      demandOption: true, // Memastikan opsi ini diperlukan
      type: 'string', // Menentukan tipe data input
    },
    phone: {
      describe: 'Nomor telepon kamu',
      demandOption: true,
      type: 'string',
      coerce: (arg) => validatePhoneNumber(arg), // Menggunakan fungsi 'coerce' untuk validasi tambahan
    },
    email: {
      describe: 'Email kamu',
      type: 'string',
      coerce: (arg) => validateEmail(arg), // Menggunakan fungsi 'coerce' untuk validasi tambahan
    },
  })
  .command('list', 'Menampilkan data name dan phone')
  .command('detail', 'Menampilkan semua data', {
    name: {
      describe: 'Nama untuk menampilkan detail',
      demandOption: true,
      type: 'string',
    },
  })
  .help() // Menambahkan opsi bantuan untuk menampilkan informasi bantuan
  .argv; // Menyimpan hasil parsing arguments dalam objek 'argv'

// Fungsi untuk validasi nomor telepon
function validatePhoneNumber(phone) {
  if (!validator.isMobilePhone(phone, 'id-ID')) {
    throw new Error('Format nomor hp tidak valid');
  }
  return phone;
}

// Fungsi untuk validasi alamat email
function validateEmail(email) {
  if (email && !validator.isEmail(email)) {
    throw new Error('Format email tidak valid');
  }
  return email;
}

// Fungsi untuk menampilkan data dengan opsional filter berdasarkan nama
function displayData(data, filterName) {
  // Menggunakan filter jika filterName disediakan
  const filteredData = filterName ? data.filter(entry => entry.name === filterName) : data;

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

// Fungsi utama yang akan dieksekusi
async function main() {
  // Path file data
  const dataPath = 'data.json';

  // Inisialisasi array untuk menyimpan data
  let data = [];

  try {
    // Membaca data dari file dalam format JSON
    const existingData = fs.readFileSync(dataPath, 'utf-8');

    // Memeriksa apakah data tidak kosong sebelum parsing JSON
    if (existingData.trim() !== '') {
      // Mengonversi data menjadi objek JSON
      data = JSON.parse(existingData);

      // Memeriksa apakah data merupakan array
      if (!Array.isArray(data)) {
        throw new Error('Data bukan berupa array');
      }
    }
  } catch (err) {
    // Menangani kesalahan ketika membaca atau parsing data
    console.log(err);
    data = [];
  }

  // Memproses aksi berdasarkan perintah yang diberikan
  switch (argv._[0]) {
    case 'add':
      // Menambahkan data baru ke dalam array
      const { name, phone, email } = argv;
      console.log(`Nama kamu adalah ${name}`);
      console.log(`Nomor telepon kamu ${phone}`);
      console.log(`Email kamu? ${email || 'Tidak disertakan'}`);
      data.push({ name, phone, email });
      break;
    case 'list':
      // Menampilkan seluruh data
      displayData(data);
      break;
    case 'detail':
      // Menampilkan detail data berdasarkan nama
      const { name: detailName } = argv;
      displayData(data, detailName);
      break;
    default:
      // Menangani aksi yang tidak valid
      console.log('Aksi tidak valid');
  }

  // Menyimpan kembali data ke dalam file setelah modifikasi
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Memanggil fungsi utama untuk eksekusi program
main();
