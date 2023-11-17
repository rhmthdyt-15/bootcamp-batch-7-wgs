const fs = require('fs');
const path = require('path');
const { validationResult, body } = require('express-validator');
const validator = require('validator');


const dataFolder = 'data';
const dataPath = path.join(dataFolder, 'contacts.json');

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

function writeDataToFile(data) {
  try {
    ensureDataFile();

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(err);
  }
}

function displayData(data, filterName) {
  const filteredData = filterName ? data.filter(entry => entry.name === filterName) : data;

  if (filteredData.length === 0) {
    // console.log(filterName ? `Tidak ada data untuk nama ${filterName}` : 'Tidak ada data yang tersedia');
  } else {
    filteredData.forEach((entry, index) => {
      console.log(`Data ${index + 1}:`);
      console.log(`  Nama: ${entry.name}`);
      console.log(`  Nomor Telepon: ${entry.phone}`);
      if (entry.email) console.log(`  Email: ${entry.email}`);
    });
  }
}


function isValidPhoneNumber(phone) {
  return phone && validator.isMobilePhone(phone, 'id-ID') ? phone : null;
}

// Fungsi validasi email
function validateEmail(email) {
  return email && validator.isEmail(email) ? email : null;
}

// Fungsi pengecekan apakah nama sudah ada
function isNameExists(name) {
  const data = readDataFromFile();
  return data.some(entry => entry.name === name);
}

function addAction(name, phone, email) {
  const data = readDataFromFile();

  // Memeriksa apakah nama dan telepon sudah ada dalam data
  const isNameExist = data.some(entry => entry.name === name);
  const isPhoneExist = data.some(entry => entry.phone === phone);

  const duplicateErrors = [];

  // Menambahkan pesan kesalahan sesuai dengan data yang sudah ada
  if (isNameExist) {
    duplicateErrors.push({ msg: 'Nama sudah terdaftar.' });
  }

  if (isPhoneExist) {
    duplicateErrors.push({ msg: 'Nomor telepon sudah terdaftar.' });
  }

  if (email && !validateEmail(email)) {
    duplicateErrors.push({ msg: 'Format email tidak valid.' });
  }

  if (duplicateErrors.length > 0) {
    console.log('Duplikasi data: Nama atau telepon sudah ada.');
    return { success: false, errors: duplicateErrors };
  }

  // Jika tidak ada duplikasi, tambahkan data ke dalam file JSON
  data.push({ name, phone, email });
  writeDataToFile(data);

  return { success: true, errors: [] };
}

function listAction() {
  const data = readDataFromFile();
  return data;
}

function detailAction(name) {
  const data = readDataFromFile();
  const filteredData = data.filter(entry => entry.name === name);
  displayData(filteredData, name);
  return filteredData;
}

function getDataByName(name) {
  const data = readDataFromFile();
  return data.filter(entry => entry.name === name);
}

function updateData(name, updatedData) {
  const data = readDataFromFile();

  // Mencari indeks data yang akan diupdate
  const entryToUpdateIndex = data.findIndex(entry => entry.name === name);

  if (entryToUpdateIndex !== -1) {
    // Memeriksa apakah ada perubahan pada nomor telepon
    const isPhoneChanged = updatedData.phone && data[entryToUpdateIndex].phone !== updatedData.phone;

    // Memeriksa apakah ada perubahan pada email
    const isEmailChanged = updatedData.email && data[entryToUpdateIndex].email !== updatedData.email;

    // Jika ada perubahan, periksa duplikasi data baru
    if (isPhoneChanged) {
      if (!isValidPhoneNumber(updatedData.phone)) {
        const duplicateErrors = [{ msg: 'Nomor telepon tidak valid atau sudah terdaftar.' }];
        console.log('Duplikasi data: Nomor telepon tidak valid atau sudah terdaftar.');
        return { success: false, errors: duplicateErrors };
      }

      // Memformat nomor telepon
      updatedData.phone = isValidPhoneNumber(updatedData.phone);
    }

    if (isEmailChanged && updatedData.email !== '' && !validator.isEmail(updatedData.email)) {
      const duplicateErrors = [{ msg: 'Format email tidak valid.' }];
      console.log('Duplikasi data: Format email tidak valid.');
      return { success: false, errors: duplicateErrors };
    }

    // Melakukan update data
    data[entryToUpdateIndex] = {
      name: updatedData.name || data[entryToUpdateIndex].name,
      phone: updatedData.phone || data[entryToUpdateIndex].phone,
      email: updatedData.email !== undefined ? updatedData.email : data[entryToUpdateIndex].email, // Menyertakan email asli jika tidak diupdate
    };

    writeDataToFile(data);

    console.log(`Data untuk nama ${name} berhasil diupdate.`);
    return { success: true, errors: [] };
  } else {
    console.log(`Tidak ada data untuk nama ${name}.`);
    return { success: false, errors: [{ msg: 'Data tidak ditemukan.' }] };
  }
}


function deleteData(name) {
  const data = readDataFromFile();
  const entryToDeleteIndex = data.findIndex(entry => entry.name === name);

  if (entryToDeleteIndex !== -1) {
    data.splice(entryToDeleteIndex, 1);
    writeDataToFile(data);
    // console.log(`Data untuk nama ${name} berhasil dihapus.`);
  } else {
    // console.log(`Tidak ada data untuk nama ${name}.`);
  }
}

module.exports = {
  addAction,
  listAction,
  detailAction,
  updateData,
  deleteData,
  getDataByName
};
