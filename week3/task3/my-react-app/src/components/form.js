import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  const onSubmit = () => {
    alert("Halo: " + name);

    if (props.onSubmit) {
      props.onSubmit(name);
    }
  };

  const searchKeydown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <>
      <div>
        Masukan Nama :
        <input
          onChange={(e) => setName(e.target.value)}
          onKeyDown={searchKeydown}
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
    </>
  );
}

// const [name, setName] = useState("");

// const handleSubmit = (event) => {
//   event.preventDefault();
//   alert(`The name you entered was: ${name}`);
// }

// return (
//   <form onSubmit={handleSubmit}>
//     <label>Enter your name:
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//     </label>
//     <input type="submit" />
//   </form>
// )

export default Form;
