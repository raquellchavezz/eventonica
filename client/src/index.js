import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("root.render");
root.render(
  <React.StrictMode>
    {" "}
    {/*tools for potential problems in an application*/}
    <App />
  </React.StrictMode>
);
//strictmode caused rendering of app and event component multiple times
//bring back in later to prevent certain errors/problems
//additional checks and warnings ran in dev mode
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
