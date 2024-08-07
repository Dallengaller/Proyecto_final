// src/hooks/useAuth.js
import { useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`http://https://proyecto-final-backend-k4ps.onrender.com/usuarios/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
    } catch (error) {
      throw new Error('Credenciales inválidas');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`http://https://proyecto-final-backend-k4ps.onrender.com/usuarios`, {
        nombre: name,
        email,
        password
      });
      console.log('Usuario registrado:', response.data);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return { login, logout, isAuthenticated, register };
};

export default useAuth;

////////////////////////////////////