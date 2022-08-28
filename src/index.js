import React from "react";
import ReactDOM from "react-dom/client";

//importing the main file in
// import { App } from "../src/Projects/birthday_reminder/src/App";
// import { App } from "./Projects/tours/App";
import { App } from "./Projects/reviews/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
