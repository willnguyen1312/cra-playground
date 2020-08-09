import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const send = () => {
    fetch("http://localhost:3001/");
  };
  useEffect(() => {
    // window.onbeforeunload = function () {
    //   fetch('http://localhost:3001/')
    //   return null
    // }
    window.addEventListener("beforeunload", send);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
