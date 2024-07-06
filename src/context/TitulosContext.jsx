// src/context/TitulosContext.jsx
import React, { createContext, useState, useContext } from 'react';

const TitulosContext = createContext();

export const useTitulosContext = () => useContext(TitulosContext);

const TitulosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const agregarFavorito = (titulo) => {
    if (!favoritos.some((fav) => fav.imdbID === titulo.imdbID)) {
      setFavoritos([...favoritos, titulo]);
    }
  };

  const eliminarFavorito = (id) => {
    const nuevosFavoritos = favoritos.filter((fav) => fav.imdbID !== id);
    setFavoritos(nuevosFavoritos.slice()); // Crea una nueva matriz con slice()
  };

  console.log('TitulosProvider exportado correctamente');

  return (
    <TitulosContext.Provider value={{ favoritos, agregarFavorito, eliminarFavorito }}>
      {children}
    </TitulosContext.Provider>
  );
};

export default TitulosProvider;
