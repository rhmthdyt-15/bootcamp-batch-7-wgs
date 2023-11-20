const validator = require('validator');
const fs = require('fs');
const path = require('path');

// Path ke file data
const dataFolder = 'data';
const dataPath = path.join(dataFolder, 'contacts.json');

// Fungsi untuk memastikan keberadaan file dan folder
function ensureDataFile() {
  try {
    // Membuat folder data jika belum ada
    if (!fs.existsSync(dataFolder)) {
      fs.mkdirSync(dataFolder, { recursive: true });
    }

    // Membuat file contacts.json jika belum ada
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, '[]', 'utf-8');
    }
  } catch (err) {
    console.error(err);
  }
}

// Fungsi untuk membaca data dari file
function readDataFromFile() {
  try {
    ensureDataFile();

    const existingData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(existingData);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Fungsi untuk menulis data ke dalam file
function writeDataToFile(data) {
  try {
    ensureDataFile();

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
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

function listAction() {
  const data = readDataFromFile();
  return data; // Pastikan fungsi mengembalikan nilai data
}

function detailAction(name) {
  const data = readDataFromFile();
  return data.find(entry => entry.name === name) || {};
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

    // Variabel untuk menyimpan informasi perubahan
    let changes = [];

    // Memperbarui nilai yang diberikan jika disediakan
    if (newName) {
      changes.push(`Nama berhasil diperbarui: ${data[entryToUpdateIndex].name} -> ${newName}`);
      data[entryToUpdateIndex].name = newName;
    }
    if (phone) {
      // Validasi dan pembaruan nomor telepon jika disediakan
      const validatedPhone = validatePhoneNumber(phone);
      if (validatedPhone !== null) {
        changes.push(`Nomor telepon berhasil diperbarui: ${data[entryToUpdateIndex].phone} -> ${validatedPhone}`);
        data[entryToUpdateIndex].phone = validatedPhone;
      } else {
        console.log('Nomor telepon tidak valid.');
        return;
      }
    }
    if (email) {
      // Validasi dan pembaruan alamat email jika disediakan
      const validatedEmail = validateEmail(email);
      if (validatedEmail !== null) {
        changes.push(`Alamat email berhasil diperbarui: ${data[entryToUpdateIndex].email || 'Tidak disertakan'} -> ${validatedEmail}`);
        data[entryToUpdateIndex].email = validatedEmail;
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
