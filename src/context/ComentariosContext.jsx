// // src/context/ComentariosContext.js
// import { createContext, useContext, useState, useEffect } from 'react';

// const ComentariosContext = createContext();

// export const ComentariosProvider = ({ children }) => {
//   const [comentarios, setComentarios] = useState([]);

//   const fetchComentarios = async (id) => {
//     if (!id) {
//       console.error('Parámetro id inválido o faltante');
//       return;
//     }
//     try {
//       const response = await fetch(`http://localhost:3000/api/comentarios/${id}`);
//       const data = await response.json();
//       setComentarios(data);
//     } catch (error) {
//       console.error('Error al obtener comentarios:', error);
//     }
//   };

//   const addComentario = (comentario) => {
//     setComentarios((prevComentarios) => [...prevComentarios, comentario]);
//   };

//   return (
//     <ComentariosContext.Provider value={{ comentarios, addComentario, fetchComentarios }}>
//       {children}
//     </ComentariosContext.Provider>
//   );
// };

// export const useComentarios = () => useContext(ComentariosContext);

// src/context/ComentariosContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ComentariosContext = createContext();

export const ComentariosProvider = ({ children }) => {
  const [comentarios, setComentarios] = useState([]);

  // // Función para obtener los comentarios de una película específica
  // const fetchComentarios = async (id) => {
  //   if (!id) {
  //     console.error('Parámetro id inválido o faltante');
  //     return;
  //   }
  //   try {
  //     const response = await axios.get(`http://localhost:3000/api/comentarios/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     setComentarios(response.data);
  //   } catch (error) {
  //     console.error('Error al obtener comentarios:', error);
  //   }
  // };
  const fetchComentarios = async (id) => {
    if (!id) {
      console.error('Parámetro id inválido o faltante');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3000/api/comentarios/${encodeURIComponent(id)}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      setComentarios(response.data);
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
    }
  };

  // // Función para agregar un comentario
  // const addComentario = async (id, comentario) => {
  //   if (!id || !comentario) {
  //     console.error('Parámetros id y comentario son obligatorios');
  //     return;
  //   }
  //   try {
  //     await axios.post(`http://localhost:3000/api/comentarios/${id}`, 
  //       { comentario },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       }
  //     );
  //     // Refresca los comentarios después de agregar uno nuevo
  //     fetchComentarios(id);
  //   } catch (error) {
  //     console.error('Error al agregar comentario:', error);
  //   }
  // };
  const addComentario = async (id, comentario) => {
    if (!id || !comentario) {
      console.error('Parámetros id y comentario son obligatorios');
      return;
    }
    try {
      await axios.post(`http://localhost:3000/api/comentarios/${encodeURIComponent(id)}`, 
        { comentario },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // Refresca los comentarios después de agregar uno nuevo
      fetchComentarios(id);
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  return (
    <ComentariosContext.Provider value={{ comentarios, addComentario, fetchComentarios }}>
      {children}
    </ComentariosContext.Provider>
  );
};

export const useComentarios = () => useContext(ComentariosContext);
