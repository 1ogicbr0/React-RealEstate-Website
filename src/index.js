import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ListPropertyContextProvider } from "./store/list-property-context";
import { AuthContextProvider } from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AuthContextProvider>
<ListPropertyContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ListPropertyContextProvider>
  </AuthContextProvider>
);
