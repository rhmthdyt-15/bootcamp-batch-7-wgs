import logo from "./logo.svg";
// import "./App.css";
import Clock from "./components/time";
import Form from "./components/form";
import ImageSearch from "./components/imageSearch";

function App() {
  return (
    <div className="App">
      <Clock />
      <Form />
      <ImageSearch />
    </div>
  );
}

export default App;
