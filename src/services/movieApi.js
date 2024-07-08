// src/services/movieApi.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export const fetchMovies = async (searchTerm) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        s: searchTerm,
        apiKey: API_KEY
      }
    });
    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        i: id,
        apiKey: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};


