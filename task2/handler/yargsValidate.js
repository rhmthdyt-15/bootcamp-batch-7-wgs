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

// Mengekspor objek 'argv' yang berisi hasil parsing arguments
module.exports = argv;
