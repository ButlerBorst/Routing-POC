import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ExperimentProvider from "./ExperimentProvider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ExperimentProvider>
        <App />
      </ExperimentProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
