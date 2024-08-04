// src/context/ComentariosContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const ComentariosContext = createContext();

export const ComentariosProvider = ({ children }) => {
  const [comentarios, setComentarios] = useState([]);

  const fetchComentarios = async (id) => {
    if (!id) {
      console.error('Parámetro id inválido o faltante');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/comentarios/${id}`);
      const data = await response.json();
      setComentarios(data);
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
    }
  };

  const addComentario = (comentario) => {
    setComentarios((prevComentarios) => [...prevComentarios, comentario]);
  };

  return (
    <ComentariosContext.Provider value={{ comentarios, addComentario, fetchComentarios }}>
      {children}
    </ComentariosContext.Provider>
  );
};

export const useComentarios = () => useContext(ComentariosContext);
