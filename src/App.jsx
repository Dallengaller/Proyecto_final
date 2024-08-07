// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navbar';
import HomePage from './views/HomePage';
import Favoritos from './views/Favoritos';
// import Categorias from './views/Categorias';
import Carrito from './views/Carrito';
import NotFound from './views/NotFound';
import TitleDetails from './views/TitleDetails';
import Comentarios from './views/Comentarios';
import Login from './components/Login';
import Register from './views/Register';
import PrivatePage from './components/PrivatePage';
import useAuth from './hooks/useAuth';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { ComentariosProvider } from './context/ComentariosContext';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <FavoritesProvider>
      <CartProvider>
        <ComentariosProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={isAuthenticated() ? <HomePage /> : <Login />} />
            <Route path="/favoritos" element={isAuthenticated() ? <Favoritos /> : <Login />} />
            {/* <Route path="/categorias" element={isAuthenticated() ? <Categorias /> : <Login />} /> */}
            <Route path="/carrito" element={isAuthenticated() ? <Carrito /> : <Login />} />
            <Route path="/title/:id" element={isAuthenticated() ? <TitleDetails /> : <Login />} />
            <Route path="/comentarios/:id" element={isAuthenticated() ? <Comentarios /> : <Login />} />
            <Route path="/private" element={isAuthenticated() ? <PrivatePage /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ComentariosProvider> 
      </CartProvider>
    </FavoritesProvider>
  );
};

export default App;
