const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path'); 
const morgan = require('morgan');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Tentukan path ke folder layouts
app.set('layout', 'layout/master');
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});


// Routes
app.get('/', (req, res) => {
  res.render('index', { nama: 'Rahmat', title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/contact', (req, res) => {
  const title = 'Contact';
  const data = [
    {
      name: 'Jaja',
      email: 'j@gmail.com',
    },
    {
      name: 'Juju',
      email: 'ju@gmail.com',
    },
    {
      name: 'Jaji',
      email: 'jaji@gmail.com',
    },
  ];
  res.render('contacts', { data, title });
});

// Tangani error 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404 Halaman Tidak Ditemukan' });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});


//untuk file html
// app.get('/', (req, res) => {
//     res.sendFile('./index.html', {root: __dirname})
// })

