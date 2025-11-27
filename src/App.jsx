import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Login from "./components/Login";
import Products from "./pages/Products";
import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckOutPage";
import RegisterPage from "./pages/RegisterPage";
import { UserProvider } from "./context/userContext";



function App() {
  return (
    <UserProvider>
     <CartProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/checkout" element={<CheckoutPage />} />
        {/* Add more routes like Products here */}
      </Routes>
      <Footer />
    </BrowserRouter>
    </CartProvider>
    </UserProvider>
  );
}

export default App;



