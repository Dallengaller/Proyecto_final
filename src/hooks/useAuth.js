// // src/hooks/useAuth.js
import { useState } from 'react';

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

  return { login, logout, isAuthenticated };
};

export default useAuth;
