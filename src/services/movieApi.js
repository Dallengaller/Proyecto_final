// // src/services/movieApi.js
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;
// const API_KEY = process.env.REACT_APP_API_KEY;

// export const fetchMovies = async (searchTerm) => {
//   try {
//     const response = await axios.get(API_URL, {
//       params: {
//         s: searchTerm,
//         apiKey: API_KEY
//       }
//     });
//     return response.data.Search || [];
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//     throw error;
//   }
// };

// src/services/movieApi.js

///////////
///////////

// import axios from 'axios';

// const API_KEY = '1f5a5420';  // Aquí colocas directamente tu API key
// const API_URL = 'https://www.omdbapi.com/';

// export const fetchMovies = async (searchTerm) => {
//   try {
//     const response = await axios.get(API_URL, {
//       params: {
//         s: searchTerm,
//         apiKey: API_KEY
//       }
//     });
//     return response.data.Search || [];
//   } catch (error) {
//     console.error('Error fetching movies:', error);
//     throw error;
//   }
// };

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
