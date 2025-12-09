import { Routes, Route } from "react-router-dom";

// Storefront pages

import HomePage from "./pages/HomePage";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";

// Admin pages
import AdminOrders from "./pages/admin/AdminOrders.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts";

// Navbar
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <div>
      {/* Navbar is inside BrowserRouter context now ✔ */}
      <Navbar />

      <Routes>
        {/* Storefront */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success/:id" element={<SuccessPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

      </Routes>
    </div>
  );
}

export default App;
