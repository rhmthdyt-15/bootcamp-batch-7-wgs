const fs = require('fs');

// console.log(fs);

// untuk isi membuat file dengan isi yang ada maka akan di ganti kalau tidak engga
// fs.writeFileSync('test.txt', 'Hello world secara synchronous2'); 

//untuk membaca
fs.readFile('test.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
})