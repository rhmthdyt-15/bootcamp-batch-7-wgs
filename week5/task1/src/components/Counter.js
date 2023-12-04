// Import library React dan fungsi connect dari react-redux
import React from "react";
import { connect } from "react-redux";

// Mendefinisikan komponen fungsional Counter
const Counter = ({ count, increment, decrement, reset }) => {
  return (
    // JSX: Menampilkan div yang berisi nilai count saat ini, dan tiga tombol
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Tambah</button>
      <button onClick={decrement}>Kurangi</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

// Mendefinisikan fungsi mapStateToProps untuk memetakan state dari Redux store ke properti komponen
const mapStateToProps = (state) => {
  // Mengembalikan objek dengan properti 'count' yang diisi dengan nilai 'state'
  return {
    count: state,
  };
};

// Mendefinisikan fungsi mapDispatchToProps untuk memetakan dispatch aksi ke properti komponen
const mapDispatchToProps = (dispatch) => {
  // Mengembalikan objek dengan tiga fungsi (increment, decrement, reset),
  // masing-masing melakukan dispatch aksi tertentu ke Redux store
  return {
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
    reset: () => dispatch({ type: "RESET" }),
  };
};

// Menghubungkan komponen Counter ke Redux store menggunakan fungsi connect
// mapStateToProps dan mapDispatchToProps digunakan untuk menentukan cara memetakan state dan dispatch ke properti
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
