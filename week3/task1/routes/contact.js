const express = require('express');
const { check, validationResult } = require('express-validator');
const validator = require('validator');
const { addAction, listAction, detailAction, updateData, deleteData } = require('../handler/function');

const router = express.Router();

// Route untuk menampilkan semua kontak
router.get('/', async (req, res) => {
    const data = await listAction();
    res.render('contact/index', { data, title: 'Contact' });
});

// Route untuk menampilkan form tambah kontak
router.get('/tambah', (req, res) => {
    res.render('contact/tambah', { title: 'Tambah Data', formData: {} });
});

// Route untuk menangani penambahan kontak
router.post('/tambah', [
    check('name')
    .notEmpty().withMessage('Nama wajib diisi')
    .custom(async (value) => {
        const data = await listAction(); // Mendapatkan data dari database
        const existingName = data.find((item) => item.name === value);
        if (existingName) {
            throw new Error('Nama sudah terdaftar');
        }
        return true;
    }),
    check('phone')
        .notEmpty().withMessage('Nomor telepon wajib diisi')
        .custom((value) => {
            if (value && !validator.isMobilePhone(value, 'id-ID')) {
                throw new Error('Format nomor telepon tidak valid');
            }
            return true;
        }),
    check('email')
        .optional({ nullable: true })
        .custom((value) => {
            if (value && !validator.isEmail(value)) {
                throw new Error('Format email tidak valid');
            }
            return true;
        }),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika terdapat kesalahan validasi, kembalikan ke halaman tambah dengan pesan kesalahan
        return res.render('contact/tambah', { title: 'Tambah Data', errors: errors.array(), formData: req.body });
    }

    await addAction(req.body.name, req.body.phone, req.body.email);
    const data = await listAction(); // Tunggu hasil query sebelum merender halaman

    return res.render('contact/index', { data, title: 'Contact' });
});

/// Route untuk menampilkan form edit kontak
router.get('/edit/:name', async (req, res) => {
    const { name } = req.params;
    const data = await detailAction(name);
    res.render('contact/edit', { data, title: 'Edit Data' });
});

// Route untuk menangani pembaruan kontak
router.put('/:name/update', [
    // ...
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika terdapat kesalahan validasi, kembalikan ke halaman edit dengan pesan kesalahan
        const { name } = req.params;
        const data = await detailAction(name);
        return res.render('contact/edit', { title: 'Edit Data', errors: errors.array(), data });
    }

    const { name } = req.params;
    await updateData(name, {
        newName: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
    });

    const updatedData = await listAction();
    return res.render('contact/index', { data: updatedData, title: 'Contact' });
});


// Route untuk menampilkan detail kontak
router.get('/detail/:name', async (req, res) => {
    const { name } = req.params;
    const data = await detailAction(name);
    res.render('contact/show', { data, title: 'Detail' });
});

// Route untuk menghapus kontak
router.delete('/:name/delete', async (req, res) => {
    const { name } = req.params;
    await deleteData(name);
    res.redirect('/contact');
});

module.exports = router;
