import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Blog from './pages/Blog';
import Orders from './pages/Orders';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import SendOTP from './components/Auth/SendOTP';
import VerifyOTP from './components/Auth/VerifyOTP';
import Order from './components/Order/Order';
import cart from './components/cart/Cart';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <CartProvider>
          <Router>
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
  <Navbar />
  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:category" element={<Products />} />
      <Route path="/product/:id" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order/:id" element={<Orders />} />
      <Route path="/product-details" element={<ProductDetails />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </Box>
  <Footer />
  <ScrollToTop />
</Box>
          </Router>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
