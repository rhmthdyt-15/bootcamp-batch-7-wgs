// App.js
import "./App.css";
import React from "react";
import Comment from "./components/comment"; // Sesuaikan path dengan struktur direktori Anda
import { faker } from "@faker-js/faker";

function App() {
  return (
    <div className="App">
      {/* <Pekerjaan name="Jaja" pekerjaan="Web Development" />
      <Pekerjaan name="Ozi" pekerjaan="Software Engineering" /> */}
      <br />
      <Comment />
    </div>
  );
}

export default App;
