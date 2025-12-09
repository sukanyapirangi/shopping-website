import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>         {/* 👈 Router at top */}
      <CartProvider>        {/* 👈 ONE CartProvider wrapping App */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);



