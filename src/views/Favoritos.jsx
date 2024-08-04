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

  const handleRemoveFromFavorites = (movieId) => {
    console.log('Removing movie with id:', movieId);
    removeFavorite(movieId);
  };

  return (
    <Container className="text-center">
      <h1 className="pt-5 text-white">Favoritos</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {favorites.length === 0 ? (
          <p className="text-white">No tienes favoritos agregados.</p>
        ) : (
          favorites.map((favorite, index) => (
            <Card key={favorite.favoritos_id || index} style={{ width: '18rem', margin: '10px' }}>
              {favorite.image_url ? (
                <Card.Img
                  variant="top"
                  src={favorite.image_url}
                  alt={favorite.titulo_nombre}
                  onClick={() => handleVerMas(favorite.movie_id)}
                  style={{
                    cursor: 'pointer',
                    height: '410px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              ) : (
                <div style={{ height: '410px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <p>No image available</p>
                </div>
              )}
              <Card.Body style={{ minHeight: '150px', paddingBottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Card.Title style={{ marginBottom: '10px', textAlign: 'center' }}>{favorite.titulo_nombre}</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item style={{ textAlign: 'center' }}>Precio: {favorite.precio}</ListGroup.Item>
                </ListGroup>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <Button variant="danger" onClick={() => handleRemoveFromFavorites(favorite.movie_id)}>Eliminar</Button>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
};

export default Favoritos;
