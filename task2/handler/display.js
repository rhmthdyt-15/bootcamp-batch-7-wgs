function displayData(data, filterName) {
    const filteredData = filterName
      ? data.filter(entry => entry.name === filterName)
      : data;
  
    if (filteredData.length === 0) {
      console.log(filterName
        ? `Tidak ada data untuk nama ${filterName}`
        : 'Tidak ada data yang tersedia');
    } else {
      filteredData.forEach((entry, index) => {
        console.log(`Data ${index + 1}:`);
        console.log(`  Nama: ${entry.name}`);
        console.log(`  Nomor Telepon: ${entry.phone}`);
      });
    }
  }

module.exports = displayData ;