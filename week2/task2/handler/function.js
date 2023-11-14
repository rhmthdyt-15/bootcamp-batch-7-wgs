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

// Fungsi untuk memperbarui data berdasarkan nama
async function updateData(name, options) {
  // Membaca data dari file
  const data = readDataFromFile();

  // Mencari indeks entri dengan nama yang sesuai
  const entryToUpdateIndex = data.findIndex(entry => entry.name === name);

  if (entryToUpdateIndex !== -1) {
    // Entry dengan nama yang cocok ditemukan
    const { phone, email, newName } = options;
    const entryToUpdate = data[entryToUpdateIndex];

    // Variabel untuk menyimpan informasi perubahan
    let changes = [];

    // Memperbarui nilai yang diberikan jika disediakan
    if (newName) {
      changes.push(`Nama berhasil diperbarui: ${entryToUpdate.name} -> ${newName}`);
      entryToUpdate.name = newName;
    }
    if (phone) {
      // Validasi dan pembaruan nomor telepon jika disediakan
      const validatedPhone = validatePhoneNumber(phone);
      if (validatedPhone !== null) {
        changes.push(`Nomor telepon berhasil diperbarui: ${entryToUpdate.phone} -> ${validatedPhone}`);
        entryToUpdate.phone = validatedPhone;
      } else {
        console.log('Nomor telepon tidak valid.');
        return;
      }
    }
    if (email) {
      // Validasi dan pembaruan alamat email jika disediakan
      const validatedEmail = validateEmail(email);
      if (validatedEmail !== null) {
        changes.push(`Alamat email berhasil diperbarui: ${entryToUpdate.email || 'Tidak disertakan'} -> ${validatedEmail}`);
        entryToUpdate.email = validatedEmail;
      } else {
        console.log('Alamat email tidak valid.');
        return;
      }
    }

    // Menyimpan kembali data ke dalam file setelah modifikasi
    writeDataToFile(data);

    // Menampilkan informasi perubahan
    console.log('Perubahan yang berhasil:');
    changes.forEach(change => console.log(change));

  } else {
    console.log(`Tidak ada data untuk nama ${name}.`);
  }
}


// Fungsi untuk menghapus data berdasarkan nama
async function deleteData(name) {
  // Membaca data dari file
  const data = readDataFromFile();

  // Mencari indeks entri dengan nama yang sesuai
  const entryToDeleteIndex = data.findIndex(entry => entry.name === name);

  if (entryToDeleteIndex !== -1) {
    // Menghapus entri dengan nama yang sesuai
    data.splice(entryToDeleteIndex, 1);

    // Menyimpan kembali data ke dalam file setelah penghapusan
    writeDataToFile(data);

    console.log(`Data untuk nama ${name} berhasil dihapus.`);
  } else {
    console.log(`Tidak ada data untuk nama ${name}.`);
  }
}


// Mengekspor fungsi-fungsi agar dapat digunakan di file lain
module.exports = {
    addAction,
    listAction,
    detailAction,
    updateData,
    deleteData
};