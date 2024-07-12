// src/hooks/useAuth.js
import { useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    localStorage.setItem('loggedIn', 'true');
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  const isAuthenticated = () => {
    return localStorage.getItem('loggedIn') === 'true';
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/usuarios', {
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
