const express = require('express');
const expressLayouts = require('express-ejs-layouts'); 
const methodOverride = require('method-override')
const { body, validationResult } = require('express-validator');
const app = express();
const dataHandler = require('./handler/function.js');
app.use(methodOverride('_method'))
const port = 3000;

// Middleware
app.use(methodOverride('_method')); // Method override untuk mendukung PUT dan DELETE
app.use(express.json()); // Middleware untuk memproses data JSON
app.use(express.urlencoded({ extended: true })); // Middleware untuk memproses data URL-encoded

// View Engine dan Layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout/master');

app.get('/', (req, res) => {
    const data = dataHandler.listData();
    res.render('index', { title: 'Home', data }) // Perbaiki typo pada properti title
});

app.get('/add', (req, res) => {
    res.render('add', { title: 'Add Contact', errors: [] });
});

app.post('/add', [
    body('name').notEmpty().withMessage('Nama harus diisi'),
    body('phone').notEmpty().withMessage('Nomor telepon harus diisi'),
    body('phone').isMobilePhone('id-ID').withMessage('Nomor telepon tidak valid'),
    body('email').optional().isEmail().withMessage('Alamat email tidak valid'),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('add', { title: 'Add Contact', errors: errors.array() });
    }

    const { name, phone, email } = req.body;

    // Memeriksa apakah nama sudah ada sebelumnya
    const isNameExists = dataHandler.isNameExists(name);
    if (isNameExists) {
        return res.render('add', { title: 'Add Contact', errors: [{ msg: 'Nama sudah ada, tidak boleh sama' }] });
    }

    const result = dataHandler.addData(name, phone, email);

    if (result.success) {
        res.redirect('/');
    } else {
        res.status(400).json({ message: result.message, errors: result.errors });
    }
});

app.get('/detail/:name', async(req, res) => {
    const { name } = req.params
    const result = await dataHandler.detailData(name)
    res.render('detail', { result, title: 'Detail' })
})

app.get('/update/:name', (req, res) => {
    const { name } = req.params;
    const data = dataHandler.getDataByName(name);
    res.render('update', { title: 'Update Data', data: data[0] });
});


app.post('/update-contact', (req, res) => {
    const { oldname, name, phone, email } = req.body;
    const contact = {
        oldname: oldname,
        name: name,
        phone: phone,
        email: email
    }
    const result = dataHandler.updateData(contact);

    if (result.success) {
        res.redirect('/');
    } else {
        res.status(400).json({ message: result.message, errors: result.errors });
    }
});

app.delete('/delete/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
      const result = await dataHandler.deleteData(name);
  
      if (result.success) {
        res.redirect('/');
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      console.error(error);
      res.render('error', { title: 'Error', message: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
