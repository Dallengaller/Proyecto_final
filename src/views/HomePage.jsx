// // src/views/HomePage.jsx
// import React, { useState, useEffect } from 'react';
// import { Container, Card, ListGroup } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { fetchMovies } from '../services/movieApi';
// import { useFavorites } from '../context/FavoritesContext';


// const HomePage = () => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { addToFavorites } = useFavorites();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getMovies = async () => {
//       try {
//         const data = await fetchMovies('Star Wars');
//         setMovies(data.slice(0, 10));
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching movies');
//         setLoading(false);
//       }
//     };

//     getMovies();
//   }, []);

//   const handleVerMas = (id) => {
//     navigate(`/title/${id}`);
//   };

//   return (
//     <Container className="text-center">
//       <h1 className="pt-5">Página principal</h1>
//       {loading && <p>Cargando...</p>}
//       {error && <p>{error}</p>}
//       <div className="d-flex flex-wrap justify-content-center">
//         {movies.map((movie) => (
//           <Card key={movie.imdbID} style={{ width: '18rem', margin: '10px' }}>
//             <Card.Img
//               variant="top"
//               src={movie.Poster}
//               alt={movie.Title}
//               onClick={() => handleVerMas(movie.imdbID)}
//               style={{
//                 cursor: 'pointer',
//                 height: '410px',
//                 objectFit: 'cover',
//                 objectPosition: 'center',
//               }}
//             />
//             <Card.Body style={{ minHeight: '150px', paddingBottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//               <Card.Title style={{ marginBottom: '10px', textAlign: 'center' }}>{movie.Title}</Card.Title>
//               <ListGroup className="list-group-flush">
//                 <ListGroup.Item style={{ textAlign: 'center' }}>Año: {movie.Year}</ListGroup.Item>
//               </ListGroup>
//               <div style={{ textAlign: 'center', marginTop: '10px' }}>
//               </div>
//             </Card.Body>
//           </Card>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default HomePage;

// src/views/HomePage.jsx
// src/views/HomePage.jsx
// src/views/HomePage.jsx
// src/views/HomePage.jsx
// src/views/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../services/movieApi';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies('Star Wars');
        setMovies(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching movies');
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = movies;

      if (genre) {
        filtered = filtered.filter(movie => movie.Genre && movie.Genre.toLowerCase().includes(genre.toLowerCase()));
      }
      

      if (year) {
        filtered = filtered.filter(movie => movie.Year && movie.Year === year);
      }

      setFilteredMovies(filtered.slice(0, 10));
    };

    applyFilters();
  }, [genre, year, movies]);

  const handleVerMas = (id) => {
    navigate(`/title/${id}`);
  };

  return (
    <Container className="text-center">
      <h1 className="pt-5">Página principal</h1>
      <Form>
        <Row className="justify-content-center mb-4">
          <Col xs={6} md={3}>
            <Form.Group controlId="genreSelect">
              <Form.Label>Filtrar por Género</Form.Label>
              <Form.Control as="select" value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">Todos</option>
                <option value="Action">Acción</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedia</option>
                <option value="Animation">Animación</option>
                <option value="Horror">Horror</option>
                {/* Agrega más opciones de género según sea necesario */}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={6} md={3}>
            <Form.Group controlId="yearInput">
              <Form.Label>Filtrar por Año</Form.Label>
              <Form.Control
                type="number"
                placeholder="Por ejemplo, 2020"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <div className="d-flex flex-wrap justify-content-center">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Card key={movie.imdbID} style={{ width: '18rem', margin: '10px' }}>
              <Card.Img
                variant="top"
                src={movie.Poster}
                alt={movie.Title}
                onClick={() => handleVerMas(movie.imdbID)}
                style={{
                  cursor: 'pointer',
                  height: '410px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              <Card.Body style={{ minHeight: '150px', paddingBottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Card.Title style={{ marginBottom: '10px', textAlign: 'center' }}>{movie.Title}</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item style={{ textAlign: 'center' }}>Año: {movie.Year}</ListGroup.Item>
                  <ListGroup.Item style={{ textAlign: 'center' }}>IMDB Rating: {movie.imdbRating}</ListGroup.Item>
                </ListGroup>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No se encontraron películas que coincidan con los filtros seleccionados.</p>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
