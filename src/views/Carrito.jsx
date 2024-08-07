// src/views/Carrito.jsx
import React from 'react';
import { Container, Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const Carrito = () => {
  const { cartItems, removeFromCart } = useCart();

  
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.Title === item.Title);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  
  const total = groupedItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);

  const handleRemoveFromCart = (movieId) => {
    removeFromCart(movieId);
  };

  const handleBuyNow = () => {
    alert('Compra realizada. ¡Gracias por su compra!');
    
  };

  return (
    <Container className="py-4 d-flex justify-content-center align-items-center text-white">
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <h1 className="text-center mb-4">Carrito de Compras</h1>
        {groupedItems.length === 0 ? (
          <p className="text-center">Su carrito está vacío.</p>
        ) : (
          <>
            <Row>
              <Col xs={12}>
                <ListGroup>
                  {groupedItems.map((item) => (
                    <ListGroup.Item
                      key={item.imdbID} 
                      className="d-flex align-items-start mb-3"
                    >
                      <Row className="w-100 align-items-center">
                        <Col xs={12} md={4} className="d-flex align-items-center">
                          {item.Poster ? (
                            <Image
                              src={item.Poster}
                              alt={item.Title}
                              thumbnail
                              style={{ maxHeight: '75px' }}
                              className="me-3"
                            />
                          ) : (
                            <div style={{ maxHeight: '75px', width: '75px', backgroundColor: 'gray' }} className="me-3"></div>
                          )}
                          <div className="flex-grow-1">
                            <span className="d-block text-truncate">{item.Title}</span>
                            <small className="text-muted">({item.Year})</small>
                            <div>
                              <span className="text-muted">Cantidad: {item.quantity}</span>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
                          <span>Precio: ${item.precio}</span>
                        </Col>
                        <Col xs={12} md={4} className="d-flex justify-content-end align-items-center">
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveFromCart(item.imdbID)}
                          >
                            Eliminar
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col xs={12} className="d-flex justify-content-between align-items-center">
                <h3>Total: ${total}</h3>
                <Button variant="success" onClick={handleBuyNow}>
                  Comprar
                </Button>
              </Col>
            </Row>
          </>
        )}
      </div>
    </Container>
  );
};

export default Carrito;
