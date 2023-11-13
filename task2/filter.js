const fs = require('fs');
const argv = require('./handler/yargsValidate');
const displayData = require('./handler/display')

async function main() {
  const dataPath = 'data.json';

  let data = [];

  try {
    const existingData = fs.readFileSync(dataPath, 'utf-8');

    if (existingData.trim() !== '') {
      data = JSON.parse(existingData);

      if (!Array.isArray(data)) {
        throw new Error('Data bukan berupa array');
      }
    }
  } catch (err) {
    console.log(err);
    data = [];
  }

  switch (argv._[0]) {
    case 'add':
      const { name, phone, email } = argv;
      console.log(`Nama kamu adalah ${name}`);
      console.log(`Nomor telepon kamu ${phone}`);
      console.log(`Email kamu? ${email || 'Tidak disertakan'}`);
      data.push({ name, phone, email });
      break;
    case 'list':
      displayData(data);
      break;
    case 'detail':
      const { name: detailName } = argv;
      displayData(data, detailName);
      break;
    default:
      console.log('Aksi tidak valid');
  }

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

main();
