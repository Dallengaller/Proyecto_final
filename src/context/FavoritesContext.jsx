// src/context/FavoritesContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://https://proyecto-final-2eg7.onrender.com/favorites', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Verifica la estructura de los datos aquí
      console.log('Favorites fetched:', response.data);

      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const addFavorite = async (movie) => {
    try {
      await axios.post('http://https://proyecto-final-2eg7.onrender.com/favorites', 
        { nombre: movie.Title, poster: movie.Poster, movieID: movie.movieID }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Refresca los favoritos después de agregar uno nuevo
      fetchFavorites();
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const removeFavorite = async (movieID) => {
    try {
      await axios.delete(`http://https://proyecto-final-2eg7.onrender.com/favorites/${movieID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Refresca los favoritos después de eliminar uno
      fetchFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
