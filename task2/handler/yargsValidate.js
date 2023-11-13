const yargs = require('yargs');

const argv = yargs
  .command('add', 'Menambahkan data baru', {
    name: {
      describe: 'Nama kamu',
      demandOption: true,
      type: 'string',
    },
    phone: {
      describe: 'Nomor telepon kamu',
      demandOption: true,
      type: 'string',
      coerce: (arg) => validatePhoneNumber(arg),
    },
    email: {
      describe: 'Email kamu',
      type: 'string',
      coerce: (arg) => validateEmail(arg),
    },
  })
  .command('list', 'Menampilkan data name dan phone')
  .command('detail', 'Menampilkan semua data', {
    name: {
      describe: 'Nama untuk menampilkan detail',
      demandOption: true,
      type: 'string',
    },
  })
  .help()
  .argv;

function validatePhoneNumber(phone) {
  if (!validator.isMobilePhone(phone, 'id-ID')) {
    throw new Error('Format nomor hp tidak valid');
  }
  return phone;
}

function validateEmail(email) {
  if (email && !validator.isEmail(email)) {
    throw new Error('Format email tidak valid');
  }
  return email;
}

module.exports = argv;