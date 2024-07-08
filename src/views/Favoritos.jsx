// src/views/Favoritos.jsx
import React from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';

const Favoritos = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleVerMas = (id) => {
    navigate(`/title/${id}`);
  };

  const handleRemoveFromFavorites = (id) => {
    removeFavorite(id);
  };

  return (
    <Container className="text-center">
      <h1 className="pt-5 text-white">Favoritos</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {favorites.map((movie) => (
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
                <Button variant="danger" onClick={() => handleRemoveFromFavorites(movie.imdbID)}>Eliminar</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Favoritos;
