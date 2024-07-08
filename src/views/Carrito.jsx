// src/views/Carrito.jsx
import React from 'react';
import { Container, Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';

const Carrito = () => {
  const { cartItems, removeFromCart } = useFavorites();

  const handleRemoveFromCart = (movieId) => {
    removeFromCart(movieId);
  };

  return (
    <Container className="py-4 d-flex justify-content-center align-items-center text-white">
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="text-center mb-4">Carrito de Compras</h1>
        {cartItems.length === 0 ? (
          <p className="text-center">Su carrito está vacío.</p>
        ) : (
          <Row>
            <Col xs={12}>
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.imdbID} className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <Image src={item.Poster} alt={item.Title} thumbnail style={{ maxHeight: '50px' }} className="me-3" />
                      <div>
                        <span className="me-3">{item.Title}</span>
                        <small className="text-muted">({item.Year})</small>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFromCart(item.imdbID)}
                    >
                      Eliminar
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default Carrito;
