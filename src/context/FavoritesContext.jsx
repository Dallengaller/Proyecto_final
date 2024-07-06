// src/context/FavoritsContext.jsx

// import React, { createContext, useState, useContext } from 'react';

// // Creamos el contexto
// export const FavoritesContext = createContext();

// // Proveedor del contexto
// export const FavoritesProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);

//   const addToFavorites = (movie) => {
//     setFavorites((prevFavorites) => [...prevFavorites, movie]);
//   };

//   const removeFromFavorites = (movieId) => {
//     setFavorites((prevFavorites) =>
//       prevFavorites.filter((movie) => movie.imdbID !== movieId)
//     );
//   };

//   return (
//     <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// // Hook personalizado para usar el contexto de favoritos
// export const useFavorites = () => useContext(FavoritesContext);


// // /////// 2
// import React, { createContext, useState, useContext } from 'react';

// // Creamos el contexto
// export const FavoritesContext = createContext();

// // Proveedor del contexto
// export const FavoritesProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);

//   const addFavorite = (movie) => {
//     setFavorites((prevFavorites) => [...prevFavorites, movie]);
//   };

//   const removeFavorite = (movieId) => {
//     setFavorites((prevFavorites) =>
//       prevFavorites.filter((movie) => movie.imdbID !== movieId)
//     );
//   };

//   return (
//     <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// // Hook personalizado para usar el contexto de favoritos
// export const useFavorites = () => useContext(FavoritesContext);


///// 3
// // src/context/FavoritesContext.jsx
// import React, { createContext, useState, useContext } from 'react';

// // Creamos el contexto
// export const FavoritesContext = createContext();

// // Proveedor del contexto
// export const FavoritesProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);

//   const addFavorite = (movie) => {
//     setFavorites((prevFavorites) => [...prevFavorites, movie]);
//   };

//   const removeFavorite = (movieId) => {
//     setFavorites((prevFavorites) =>
//       prevFavorites.filter((movie) => movie.imdbID !== movieId)
//     );
//   };

//   return (
//     <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// // Hook personalizado para usar el contexto de favoritos
// export const useFavorites = () => useContext(FavoritesContext);


// 5
// src/context/FavoritesContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
export const FavoritesContext = createContext();

// Proveedor del contexto
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.imdbID !== movieId)
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado para usar el contexto de favoritos
export const useFavorites = () => useContext(FavoritesContext);
