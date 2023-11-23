// index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Navbar from "./components/navbar";

const rootElement = document.getElementById("root");
const navElement = document.getElementById("nav");

const root = createRoot(rootElement);
const navRoot = createRoot(navElement);

root.render(<App />);
navRoot.render(<Navbar />);
