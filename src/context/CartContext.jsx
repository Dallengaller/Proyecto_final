// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        // Verifica los datos recibidos
        console.log('Cart items fetched:', response.data);
  
        // Verifica que los datos sean un array
        if (Array.isArray(response.data)) {
          setCartItems(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        // Imprime el error completo para depuración
        console.error('Error fetching cart items:', error.response || error.message || error);
      }
    };
  
    fetchCartItems();
  }, []);
  

  const addToCart = async (movie) => {
    try {
      const response = await axios.post('http://localhost:3000/cart', { movie }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCartItems((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (movieId) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${movieId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.imdbID !== movieId)
      );
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);


////////////////////////////////////
