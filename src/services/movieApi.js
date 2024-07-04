// src/services/movieApi.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

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
