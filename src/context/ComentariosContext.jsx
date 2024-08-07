// src/context/ComentariosContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ComentariosContext = createContext();

export const ComentariosProvider = ({ children }) => {
  const [comentarios, setComentarios] = useState([]);

  const fetchComentarios = async (id) => {
    if (!id) {
      console.error('Parámetro id inválido o faltante');
      return;
    }
    try {
      const response = await axios.get(`http://https://proyecto-final-backend-k4ps.onrender.com/api/comentarios/${encodeURIComponent(id)}`, {
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

  const addComentario = async (id, comentario) => {
    if (!id || !comentario) {
      console.error('Parámetros id y comentario son obligatorios');
      return;
    }
    try {
      await axios.post(`http://https://proyecto-final-backend-k4ps.onrender.com/api/comentarios/${encodeURIComponent(id)}`, 
        { comentario },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
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
