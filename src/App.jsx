import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import BookDetail from './Pages/BookDetail';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Favorites from './Pages/Favorites';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}