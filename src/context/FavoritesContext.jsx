// src/context/FavoritesContext.jsx
import React, { createContext, useState, useContext } from 'react';


export const FavoritesContext = createContext();


export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.imdbID !== movieId)
    );
  };

  const addToCart = (movie) => {
    setCartItems((prevItems) => [...prevItems, movie]);
  };

  const removeFromCart = (movieId) => {
    setCartItems((prevItems) =>
      prevItems.filter((movie) => movie.imdbID !== movieId)
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, cartItems, addToCart, removeFromCart }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
