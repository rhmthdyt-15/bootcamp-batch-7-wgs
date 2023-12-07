// contactController.js

const express = require('express');
const { check, validationResult } = require('express-validator');
const validator = require('validator');
const { addAction, listAction, detailAction, updateData, deleteData } = require('../handler/function');

const router = express.Router();

// Route untuk menampilkan semua kontak
router.get('/', (req, res) => {
    const data = listAction();
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
        .custom((value) => {
            const existingName = listAction().find((item) => item.name === value);
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

            const existingPhone = listAction().find((item) => item.phone === value);
            if (existingPhone) {
                throw new Error('Nomor telepon sudah terdaftar');
            }
            return true;
        }),
    check('email')
        .optional({ nullable: true })
        .custom((value, { req }) => {
            if (req.body.email && !validator.isEmail(value)) {
                throw new Error('Format email tidak valid');
            }

            const existingEmail = listAction().find((item) => item.email === value);
            if (existingEmail) {
                throw new Error('Email sudah terdaftar');
            }
            return true;
        }),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika terdapat kesalahan validasi, kembalikan ke halaman tambah dengan pesan kesalahan
        return res.render('contact/tambah', { title: 'Tambah Data', errors: errors.array(), formData: req.body });
    }

    addAction(req.body.name, req.body.phone, req.body.email);
    return res.redirect('/contact');
});

// Route untuk menampilkan form edit kontak
router.get('/edit/:name', (req, res) => {
    const { name } = req.params;
    const data = detailAction(name);
    res.render('contact/edit', { data, title: 'Edit Data' });
});

// Route untuk menangani pembaruan kontak
router.put('/:name/update', [
    check('name')
        .notEmpty().withMessage('Nama wajib diisi')
        .custom((value, { req }) => {
            const existingName = listAction().find((item) => item.name === value && item.name !== req.params.name);
            if (existingName) {
                throw new Error('Nama sudah terdaftar');
            }
            return true;
        }),
    check('phone')
        .notEmpty().withMessage('Nomor telepon wajib diisi')
        .custom((value, { req }) => {
            if (req.body.phone && value && !validator.isMobilePhone(value, 'id-ID')) {
                throw new Error('Format nomor telepon tidak valid');
            }

            const existingPhone = listAction().find((item) => item.phone === value && item.name !== req.params.name);
            if (existingPhone) {
                throw new Error('Nomor telepon sudah terdaftar');
            }
            return true;
        }),
    check('email')
        .optional({ nullable: true })
        .custom((value, { req }) => {
            if (req.body.email && value && !validator.isEmail(value)) {
                throw new Error('Format email tidak valid');
            }

            const existingEmail = listAction().find((item) => item.email === value && item.name !== req.params.name);
            if (existingEmail) {
                throw new Error('Email sudah terdaftar');
            }
            return true;
        }),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika terdapat kesalahan validasi, kembalikan ke halaman edit dengan pesan kesalahan
        const { name } = req.params;
        const data = detailAction(name);
        return res.render('contact/edit', { title: 'Edit Data', errors: errors.array(), data });
    }

    const { name } = req.params;
    updateData(name, {
        newName: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
    });

    return res.redirect('/contact');
});

// Route untuk menampilkan detail kontak
router.get('/detail/:name', (req, res) => {
    const { name } = req.params;
    const data = detailAction(name);
    res.render('contact/show', { data, title: 'Detail' });
});

// Route untuk menghapus kontak
router.delete('/:name/delete', (req, res) => {
    const { name } = req.params;
    deleteData(name);
    res.redirect('/contact');
});

module.exports = router;
