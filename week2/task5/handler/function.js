const fs = require('fs');
const path = require('path');
const { body, validationResult } = require('express-validator');

const dataFolder = 'data';
const dataPath = path.join(dataFolder, 'contacts.json');

function readDataFromFile() {
    try {
        if (!fs.existsSync(dataFolder)) {
            fs.mkdirSync(dataFolder);
        }

        if (!fs.existsSync(dataPath)) {
            fs.writeFileSync(dataPath, '[]', 'utf-8');
        }

        const existingData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(existingData);
    } catch (error) {
        console.log(error);
        return [];
    }
}

function writeDataToFile(data) {
    try {
        if (!fs.existsSync(dataFolder)) {
            fs.mkdirSync(dataFolder);
        }

        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.log(error);
    }
}

function validatePhoneNumber(phone) {
    return phone && body(phone).isMobilePhone('id-ID') ? phone : null;
}

function validateEmail(email) {
    return email && body(email).isEmail() ? email : null;
}

function isNameExists(name) {
    const data = readDataFromFile();
    return data.some(entry => entry.name === name);
}

function getDataByName(name) {
    const data = readDataFromFile();
    return data.filter(entry => entry.name === name);
  }
  
  // Fungsi untuk menambahkan data baru dengan validasi nama
function addData(name, phone, email) {
    const data = readDataFromFile();
  
    // Validasi nama unik
    if (isNameExists(name)) {
      return {
        success: false,
        message: 'Nama sudah ada, tidak boleh sama',
        errors: [{ msg: 'Nama sudah ada, tidak boleh sama' }],
        existingData: data,
      };
    }
  
    const errors = validationResult(body({
      name,
      phone,
      email,
    }));
  
    if (!errors.isEmpty()) {
      return {
        success: false,
        message: 'Gagal menambahkan data.',
        errors: errors.array(),
        existingData: data,
      };
    }
  
    const validatedPhone = validatePhoneNumber(phone);
    if (!validatedPhone) {
      return {
        success: false,
        message: 'Nomor telepon tidak valid.',
      };
    }
  
    const validatedEmail = validateEmail(email);
    if (email && !validatedEmail) {
      return {
        success: false,
        message: 'Format email tidak valid.',
      };
    }
  
    data.push({
      name,
      phone: validatedPhone,
      email: validatedEmail,
    });
    writeDataToFile(data);
  
    return {
      success: true,
      message: 'Data berhasil ditambahkan.',
    };
}

function listData() {
    return readDataFromFile();
}

function detailData(name) {
    const data = readDataFromFile();
    const filteredData = data.filter(entry => entry.name === name);
    return filteredData;
}

function updateData(contact) {
    console.log(contact);
    const data = readDataFromFile();

    const newContact = {
        name: contact.name,
        phone: contact.phone,
        email: contact.email
    }

    // Update data pada index yang ditemukan
    for (let i = 0; i < data.length; i++) {
        if (data[i]['name'] === contact.oldname) {
            data[i] = newContact
        }
    }

    writeDataToFile(data);

    return {
        success: true,
        message: 'Data berhasil diupdate.',
    };
}


function deleteData(name) {
    const data = readDataFromFile();

    const indexToDelete = data.findIndex(entry => entry.name === name);

    if (indexToDelete === -1) {
        return {
            success: false,
            message: 'Data tidak ditemukan.',
        };
    }

    // Menghapus data pada index yang ditemukan
    data.splice(indexToDelete, 1);

    writeDataToFile(data);

    return {
        success: true,
        message: 'Data berhasil dihapus.',
    };
}

module.exports = {
    addData,
    listData,
    detailData,
    updateData,
    deleteData,
    isNameExists,
    getDataByName
};
