import React, { useState } from "react";
import "./ThemeColor.css";
export default function ThemeColor() {
  const [nameColor, setNameColor] = useState("black");

  const changeColor = () => {
    const colors = ["red", "green", "purple", "yellow"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setNameColor(randomColor);
  };

  return (
    <div className="theme-container">
      <h1 style={{ color: nameColor }}>Hello, World!</h1>
      <button onClick={changeColor}>Change Color</button>
    </div>
  );
}
