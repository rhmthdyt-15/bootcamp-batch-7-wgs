// Mengimpor modul-modul yang diperlukan
const validator = require('validator');
const fs = require('fs');
const yargs = require('yargs')

// Menggunakan yargs untuk mengelola argumen dari baris perintah
const argv = yargs
  .option('name', {
    describe: 'Nama kamu',
    demandOption: true, // Menjadikan argumen 'name' wajib diisi
    type: 'string', // Menetapkan tipe data argumen 'name' sebagai string
  })
  .option('phone', {
    describe: 'Nomor telepon kamu',
    demandOption: true, // Menjadikan argumen 'phone' wajib diisi
    type: 'string',
    coerce: (arg) => validatePhoneNumber(arg), // Menggunakan fungsi validatePhoneNumber saat mengonversi nilai argumen 'phone'
  })
  .option('email', {
    describe: 'Email kamu',
    type: 'string',
    coerce: (arg) => validateEmail(arg), // Menggunakan fungsi validateEmail saat mengonversi nilai argumen 'email'
  })
  .help() // Menambahkan opsi help
  .argv;

// Fungsi untuk validasi nomor telepon
function validatePhoneNumber(phone) {
  if (!validator.isMobilePhone(phone, 'id-ID')) {
    throw new Error('Format nomor hp tidak valid');
  }
  return phone;
}

// Fungsi untuk validasi email
function validateEmail(email) {
  if (email && !validator.isEmail(email)) {
    throw new Error('Format email tidak valid');
  }
  return email;
}

// Fungsi utama program
async function main() {
  const dataPath = 'data.json';

  let data = [];

  try {
    // Membaca data yang sudah ada dari file
    const existingData = fs.readFileSync(dataPath, 'utf-8');

    // Memeriksa apakah existingData tidak kosong
    if (existingData.trim() !== '') {
      // Mengonversi existingData menjadi array
      data = JSON.parse(existingData);

      // Pengecekan apakah data adalah array
      if (!Array.isArray(data)) {
        throw new Error('Data bukan berupa array');
      }
    }
  } catch (err) {
    // Menangani kesalahan ketika membaca file
    console.log(err);

    // Menetapkan data sebagai array kosong jika terjadi kesalahan
    data = [];
  }

  // Mendapatkan nilai name, phone, dan email dari objek argv menggunakan destructuring assignment
  const { name, phone, email } = argv;

  // Menampilkan informasi yang telah dimasukkan oleh pengguna
  console.log(`Nama kamu adalah ${name}`);
  console.log(`Nomor telepon kamu ${phone}`);
  console.log(`Email kamu? ${email || 'Tidak disertakan'}`);

  // Menambahkan data baru ke array data
  data.push({ name, phone, email });

  // Menyimpan data ke file data.json
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Memanggil fungsi utama
main();
