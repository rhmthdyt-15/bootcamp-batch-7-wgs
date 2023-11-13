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

async function askWithValidation(question, validatorFunc, errorMessage) {
    let input;

    do {
        input = await questions(question);

        if (!validatorFunc(input)) {
            console.log(errorMessage)
        }
    } while (!validatorFunc(input));

    return input;
}


async function main() {
  const dataPath = 'data.json';

  let data = [];

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

    // Menangani kasus file kosong, inisialisasi data dengan array kosong
    data = [];
  }

  const name = await questions('Siapa nama kamu? ');
  const phone = await askWithValidation('Berapa nomor telepon? ', (input) => validator.isMobilePhone(input, 'id-ID'), 'Format nomor hp tidak valid, silakan masukkan kembali');
  const email = await askWithValidation('Masukkan email kamu? ', validator.isEmail, 'Format email tidak valid, silakan masukkan email kamu');

  console.log(`Nama kamu adalah ${name}`);
  console.log(`Nomor telepon kamu ${phone}`);
  console.log(`Email kamu? ${email}`);

  data.push({ name, phone, email });

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  readline.close();
}

main();
