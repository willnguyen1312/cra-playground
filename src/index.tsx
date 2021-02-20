import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App7";
import es6ObjectAssign from "es6-object-assign";
import * as serviceWorker from "./serviceWorker";

es6ObjectAssign.polyfill();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
