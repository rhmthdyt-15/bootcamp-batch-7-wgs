// Mengimpor modul 'yargs' untuk menangani command line arguments
const yargs = require('yargs');

// Mengimpor fungsi dari file handler/function.js
const {
  addAction,
  listAction,
  detailAction,
  updateData,
  deleteData
} = require('./handler/function.js');

// Fungsi utama yang akan dieksekusi
async function main() {
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
    .command('update', 'Memperbarui data', {
      name: { describe: 'Nama data yang akan diperbarui', demandOption: true, type: 'string' },
      phone: { describe: 'Nomor telepon baru', type: 'string' },
      email: { describe: 'Email baru', type: 'string' },
    })
    .command('delete', 'Menghapus data', {
      name: { describe: 'Nama untuk menghapus data', demandOption: true, type: 'string' },
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
    case 'update':
      await updateData(argv.name, {
        newName: argv.newName,
        phone: argv.phone,
        email: argv.email
        });
      break;
    case 'delete':
      deleteData(argv.name);
      break;
    default:
      // Menangani aksi yang tidak valid
      console.log('Aksi tidak valid.');
  }
}

// Memanggil fungsi utama untuk eksekusi program
main();
