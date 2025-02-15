// src/views/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../services/movieApi';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      try {
        
        const data = await fetchMovies();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching movies');
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  const handleVerMas = (id) => {
    navigate(`/title/${id}`);
  };

  return (
    <Container className="text-center">
      <h1 className="pt-5 text-white">Peliculas / Series</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <div className="d-flex flex-wrap justify-content-center">
        {movies.length > 0 ? (
          movies.map((movie) => (
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
                </ListGroup>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No se encontraron películas.</p>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
