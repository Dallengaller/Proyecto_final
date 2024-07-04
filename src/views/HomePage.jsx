// import { Container } from "react-bootstrap";

// const HomePage = () => {
//   return (
//     <Container className="text-center">
//       <h1 className="pt-5">
//         Pagina principal
//       </h1>
//       <h6> Aca se agregaran los items </h6>
//     </Container>
//   );
// };
// export default HomePage;


import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { fetchMovies } from '../services/movieApi';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies('Star Wars');
        setMovies(data.slice(0, 10));
        setError(null);
      } catch (error) {
        setError('Error fetching movies');
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <Container className="text-center">
      <h1 className="pt-5">Página principal</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="d-flex flex-wrap justify-content-center">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="m-3">
              <img src={movie.Poster} alt={movie.Title} style={{ maxWidth: '200px', maxHeight: '300px' }} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default HomePage;
