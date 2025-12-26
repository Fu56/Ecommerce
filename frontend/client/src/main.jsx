import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/auth.jsx";
import { CartProvider } from "./context/cart.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
          <Toaster />
          <App />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
