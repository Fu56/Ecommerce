import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/auth.jsx";
import { CartProvider } from "./context/cart.jsx";
import { WishlistProvider } from "./context/wishlist.jsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";

// Set base URL from environment variable for production
// In development, this is undefined, so it falls back to the Vite proxy
if (import.meta.env.VITE_API) {
  axios.defaults.baseURL = import.meta.env.VITE_API;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter future={{ v7_relativeSplatPath: true }}>
            <Toaster />
            <App />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
