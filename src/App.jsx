// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navbar';
import HomePage from './views/HomePage';
import Favoritos from './views/Favoritos';
import Categorias from './views/Categorias';
import Carrito from './views/Carrito';
import NotFound from './views/NotFound';
import TitleDetails from './views/TitleDetails';
import Login from './components/Login';
import PrivatePage from './components/PrivatePage';
import useAuth from './hooks/useAuth';
import { FavoritesProvider } from './context/FavoritesContext';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <FavoritesProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={isAuthenticated() ? <HomePage /> : <Login />} />
        <Route path="/favoritos" element={isAuthenticated() ? <Favoritos /> : <Login />} />
        <Route path="/categorias" element={isAuthenticated() ? <Categorias /> : <Login />} />
        <Route path="/carrito" element={isAuthenticated() ? <Carrito /> : <Login />} />
        <Route path="/title/:id" element={isAuthenticated() ? <TitleDetails /> : <Login />} />
        <Route path="/private" element={isAuthenticated() ? <PrivatePage /> : <Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </FavoritesProvider>
  );
};

export default App;
