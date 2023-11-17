const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');
const dataHandler = require('./handler/function.js');
const app = express();

const port = 3000;

app.use(session({
    secret: 'secret-key', // Gantilah dengan kunci rahasia yang lebih kuat
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

// Middleware
app.use(methodOverride('_method')); // Method override untuk mendukung PUT dan DELETE
app.use(express.json()); // Middleware untuk memproses data JSON
app.use(express.urlencoded({
    extended: true
})); // Middleware untuk memproses data URL-encoded

// View Engine dan Layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout/master');

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Menampilkan halaman untuk melihat semua data
app.get('/contact', (req, res) => {
    const data = dataHandler.listAction();
    res.render('contact/index', {
        data,
        title: 'Contact',
    });
});

// Menampilkan halaman untuk menambah data
app.get('/contact/tambah', (req, res) => {
    res.render('contact/tambah', { title: 'Tambah Data' });
});

// Menangani penambahan data
app.post('/contact/tambah', [
    body('name').notEmpty().withMessage('Nama wajib diisi'),
    body('phone').notEmpty().withMessage('Nomor telepon wajib diisi'),
    body('email').optional({ nullable: true }).isEmail().withMessage('Format email tidak valid'),
], (req, res) => {
    // Menjalankan validasi menggunakan express-validator
    const errors = validationResult(req);

    // Memanggil fungsi addAction dan menyimpan hasilnya
    const result = dataHandler.addAction(req.body.name, req.body.phone, req.body.email || '', errors.array());

    // Jika ada kesalahan validasi atau duplikasi, menampilkan pesan kesalahan
    if (!result.success) {
        console.log('Kesalahan validasi atau duplikasi:', result.errors);

        // Render ulang formulir dengan pesan kesalahan dan data yang sudah diisi
        res.status(400).render('contact/tambah', { title: 'Tambah Data', errors: result.errors, formData: req.body });
        return;
    }

    res.redirect('/contact');
});

app.get('/contact/detail/:name', (req, res) => {
    const { name } = req.params;
    const result = dataHandler.detailAction(name);
    res.render('contact/show', { result, title: 'Detail' });
});

// Menampilkan halaman untuk mengupdate data
app.get('/contact/:name/edit', (req, res) => {
    const name = req.params.name;
    const data = dataHandler.getDataByName(name);

    if (data.length > 0) {
        res.render('contact/edit', { title: 'Update Data', data: data[0] });
    } else {
        res.status(404).send('Data not found');
    }
});

// Menangani update data
app.put('/contact/:name/update', [
    body('name').notEmpty().withMessage('Nama wajib diisi'),
    body('phone').notEmpty().withMessage('Nomor telepon wajib diisi'),
    body('email').optional({ nullable: true }).isEmail().withMessage('Format email tidak valid'),
], (req, res) => {
    const name = req.params.name;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const data = dataHandler.getDataByName(name);

        if (data.length > 0) {
            res.status(400).render('contact/edit', { title: 'Update Data', errors: errors.array(), data: data[0] });
        } else {
            res.status(404).send('Data not found');
        }
    } else {
        const updatedData = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email || '',
        };

        const result = dataHandler.updateData(name, updatedData);

        if (result.success) {
            res.redirect('/contact');
        } else {
            console.log('Kesalahan update:', result.errors);

            const data = dataHandler.getDataByName(name);

            if (data.length > 0) {
                res.status(400).render('contact/edit', { title: 'Update Data', errors: result.errors, data: data[0] });
            } else {
                res.status(404).send('Data not found');
            }
        }
    }
});

// Menangani penghapusan data
app.delete('/contact/:name/delete', (req, res) => {
    const { name } = req.params;
    dataHandler.deleteData(name);
    res.redirect('/contact');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



