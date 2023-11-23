function App(props) {
  return (
    <div>
      <div className="container mt-5">
        <h1>Nama saya: {props.name}</h1>
        <h2>Pekerjaan saya: {props.pekerjaan}</h2>
        {/* <input type="number" min={5} style={{ border: "3px solid" }} /> */}
      </div>
    </div>
  );
}

// function App(params) {
//   return <h1>{new Date().toLocaleTimeString()}</h1>;
// }

export default App;

// const pekerjaanCount = 2; // Ganti dengan jumlah pekerjaan yang diinginkan

//   const pekerjaanComponents = [];
//   for (let i = 0; i < pekerjaanCount; i++) {
//     const fakeName = faker.name.firstName();
//     const fakePekerjaan = faker.name.jobTitle();

//     pekerjaanComponents.push(
//       <Pekerjaan key={i} name={fakeName} pekerjaan={fakePekerjaan} />
//     );
//   }
