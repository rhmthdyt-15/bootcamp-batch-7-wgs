const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  // metode nested
  readline.question('Siapa nama kamu?', name => {
    console.log(`Nama kamu adalah ${name}`);
    readline.question('Berapa nomor telepon?', phone => {
        console.log(`Nomor telepon kamu ${phone}`);
        readline.question('Masukan email kamu?', email => {
            console.log(`Email kamu? ${email}`)
            readline.close();
        })
    })
  });
