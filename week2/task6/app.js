// app.js

const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const { listAction } = require('./handler/function');
const contactRouter = require('./routes/contact'); // Menggunakan router yang sudah dibuat
const app = express();
const port = 3000;

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout/master');

// Menggunakan router untuk path yang berawalan dengan '/contact'
app.use('/contact', contactRouter);

app.get('/', (req, res) => {
  const data = listAction();
  res.render('home', { data, title: 'Home' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
