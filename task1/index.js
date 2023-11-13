const validator = require('validator');
const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = (ask) => {
    return new Promise((resolve, reject) => {
        readline.question(ask, (inputVariable) => {
            resolve(inputVariable);
        })
    })
}

async function main() {
  const dataPath = 'data.json';

  let data = [];

  // Pengecekan apakah file data.json ada dan tidak kosong
  try {
    const existingData = fs.readFileSync(dataPath, 'utf-8');
    
    // Memeriksa apakah existingData tidak kosong
    if(existingData.trim() !== '') {
      data = JSON.parse(existingData);

      // Pengecekan apakah data adalah array
      if (!Array.isArray(data)) {
        throw new Error('Data bukan berupa array');
      }
    }
  } catch (err) {
    console.log(err);
  }

  const name = await questions('Siapa nama kamu? ');
  let phone, email;

  do {
    phone = await questions('Berapa nomor telepon? ');
    if (validator.isMobilePhone(phone, 'id-ID')) {
      console.log('Format nomor hp benar!');
    } else {
      console.log('Format nomor hp tidak valid, silakan masukkan kembali');
    }
  } while (!validator.isMobilePhone(phone, 'id-ID'));

  do {
    email = await questions('Masukkan email kamu? ');
    if (validator.isEmail(email)) {
      console.log('Format email benar!');
    } else {
      console.log('Format email tidak valid, silakan masukkan email kamu');
    }
  } while (!validator.isEmail(email));

  console.log(`Nama kamu adalah ${name}`);
  console.log(`Nomor telepon kamu ${phone}`);
  console.log(`Email kamu? ${email}`);

  data.push({ name, phone, email });

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  readline.close();
}

main();
