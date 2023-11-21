const validator = require('validator');
const client = require('../connection');


// Fungsi untuk validasi nomor telepon
function validatePhoneNumber(phone) {
  return validator.isMobilePhone(phone, 'id-ID') ? phone : null;
}

// Fungsi untuk validasi alamat email
function validateEmail(email) {
  return email && validator.isEmail(email) ? email : null;
}


// Fungsi untuk menambahkan data baru
// Fungsi untuk menambahkan data baru
async function addAction(name, phone, email) {
  const validatedPhone = validatePhoneNumber(phone);
  const validatedEmail = validateEmail(email);

  try {
    // Menjalankan query SQL untuk menambahkan data ke database
    await client.query(
      'INSERT INTO contact (name, phone, email) VALUES ($1, $2, $3)',
      [name, validatedPhone, validatedEmail]
    );

    console.log(`Data berhasil ditambahkan ke database: ${name}`);
  } catch (err) {
    console.error('Error saat menambahkan data ke database:', err.message);
    throw err; // Menambahkan kembali kesalahan untuk menangani di lapisan panggilan fungsi
  }
}

async function detailAction(name) {
  try {
    // Menjalankan query SQL untuk mengambil detail data dari database
    const result = await client.query('SELECT * FROM contact WHERE name = $1', [name]);
    
    // Mengembalikan baris pertama dari hasil query sebagai objek data
    return result.rows[0] || {};
  } catch (err) {
    console.error('Error saat mengambil detail data dari database:', err.message);
    return {};
  }
}

async function listAction() {
  try {
    const result = await client.query('SELECT * FROM contact ORDER BY created_at DESC');
    return result.rows;
  } catch (err) {
    console.error('Error saat mengambil data dari database:', err.message);
    return [];
  }
}


// Fungsi untuk memperbarui data berdasarkan nama
async function updateData(name, options) {
  const { newName, phone, email } = options;

  try {
    // Menjalankan query SQL untuk memperbarui data di database
    const result = await client.query(
      'UPDATE contact SET name = $1, phone = $2, email = $3 WHERE name = $4',
      [newName, validatePhoneNumber(phone), validateEmail(email), name]
    );

    console.log(`Data berhasil diperbarui di database: ${name}`);
  } catch (err) {
    console.error('Error saat memperbarui data di database:', err.message);
  }
}

// Fungsi untuk menghapus data berdasarkan nama
async function deleteData(name) {
  try {
    // Menjalankan query SQL untuk menghapus data dari database
    const result = await client.query('DELETE FROM contact WHERE name = $1', [name]);

    console.log(`Data berhasil dihapus dari database: ${name}`);
  } catch (err) {
    console.error('Error saat menghapus data dari database:', err.message);
  }
}

// ... (kode lainnya tetap sama)

// Menambahkan koneksi ke database saat aplikasi dimulai
client.connect(err => {
  if (err) {
    console.error('Error saat menghubungkan ke database:', err.message);
  } else {
    console.log('Koneksi ke database berhasil.');
  }
});


// Fungsi untuk memperbarui data berdasarkan nama


// Mengekspor fungsi-fungsi agar dapat digunakan di file lain
module.exports = {
    addAction,
    listAction,
    detailAction,
    updateData,
    deleteData
};
