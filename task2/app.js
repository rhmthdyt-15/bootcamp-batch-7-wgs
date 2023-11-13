
// Mengimpor modul 'yargs' untuk menangani command line arguments
const yargs = require('yargs');

// Mengimpor fungsi dari file handler/function.js
const {
  readDataFromFile,
  writeDataToFile,
  validatePhoneNumber,
  validateEmail,
  displayData,
} = require('./handler/function.js');


// Fungsi untuk menambahkan data baru
function addAction(name, phone, email) {
  const data = readDataFromFile();
  const validatedPhone = validatePhoneNumber(phone);
  const validatedEmail = validateEmail(email);

  // Jika nomor telepon valid, tambahkan data baru ke dalam array
  if (validatedPhone !== null) {
    data.push({ name, phone: validatedPhone, email: validatedEmail });
    console.log(`Nama: ${name}`);
    console.log(`Nomor telepon: ${validatedPhone}`);
    console.log(`Email: ${validatedEmail || 'Tidak disertakan'}`);
  } else {
    // Menampilkan pesan jika nomor telepon tidak valid
    console.log('Nomor telepon tidak valid.');
  }

  // Menyimpan kembali data ke dalam file setelah modifikasi
  writeDataToFile(data);
}

// Fungsi untuk menampilkan semua data
function listAction() {
  const data = readDataFromFile();
  displayData(data);
}

// Fungsi untuk menampilkan detail data berdasarkan nama
function detailAction(name) {
  const data = readDataFromFile();
  displayData(data, name);
}

// Fungsi utama yang akan dieksekusi
function main() {
  // Parsing command line arguments menggunakan 'yargs'
  const argv = yargs
    .command('add', 'Menambahkan data baru', {
      name: { describe: 'Nama kamu', demandOption: true, type: 'string' },
      phone: { describe: 'Nomor telepon kamu', demandOption: true, type: 'string' },
      email: { describe: 'Email kamu', type: 'string' },
    })
    .command('list', 'Menampilkan semua data')
    .command('detail', 'Menampilkan detail data', {
      name: { describe: 'Nama untuk menampilkan detail', demandOption: true, type: 'string' },
    })
    .help() // Menambahkan opsi bantuan untuk menampilkan informasi bantuan
    .argv; // Menyimpan hasil parsing arguments dalam objek 'argv'

  const action = argv._[0];

  // Memproses aksi berdasarkan perintah yang diberikan
  switch (action) {
    case 'add':
      addAction(argv.name, argv.phone, argv.email);
      break;
    case 'list':
      listAction();
      break;
    case 'detail':
      detailAction(argv.name);
      break;
    default:
      // Menangani aksi yang tidak valid
      console.log('Aksi tidak valid.');
  }
}

// Memanggil fungsi utama untuk eksekusi program
main();
