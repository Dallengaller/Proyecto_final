// src/components/Searchbar.jsx

// import React, { useState } from 'react';
// import { fetchMovies } from '../services/movieApi'; // Importa la función fetchMovies

// const Searchbar = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [error, setError] = useState(null);

//   const handleSearch = async (event) => {
//     event.preventDefault();
//     if (!searchTerm.trim()) {
//       setError('Please enter a movie title');
//       return;
//     }

//     try {
//       const movies = await fetchMovies(searchTerm); // Llama a la función fetchMovies con el término de búsqueda
//       setSearchResults(movies);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//       setError('There was a problem with your search');
//     }
//   };

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleChange}
//           placeholder="Search movies..."
//         />
//         <button type="submit">Search</button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div>
//         {searchResults.map((movie) => (
//           <div key={movie.imdbID}>
//             <h2>{movie.Title}</h2>
//             <p>Year: {movie.Year}</p>
//             <img src={movie.Poster} alt={movie.Title} style={{ width: '100px' }} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Searchbar;
