// src/views/Comentarios.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useComentarios } from '../context/ComentariosContext';

const Comentarios = () => {
  const { id } = useParams();

  const { comentarios, addComentario, fetchComentarios } = useComentarios();
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (id) {
      fetchComentarios(id);
    }
  }, [id, fetchComentarios]);

  const handleAddComentario = async (e) => {
    e.preventDefault();

    if (!nuevoComentario) return;

    try {
      const url = `http://https://proyecto-final-backend-k4ps.onrender.com/api/comentarios/${id}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movie_id: id, comentario: nuevoComentario }),
      });

      if (response.ok) {
        const data = await response.json();
        addComentario(data);
        setNuevoComentario('');
        setMensaje('');
      } else {
        setMensaje('Error al agregar el comentario');
      }
    } catch (error) {
      console.error('Error al agregar comentario:', error);
      setMensaje('Error al agregar el comentario');
    }
  };
  return (
    <Container className="py-4">
      <h2 className="text-center text-white mb-4">Comentarios</h2>
      <Form onSubmit={handleAddComentario} className="mb-4">
        <Form.Group controlId="comentario">
          <Form.Label className='text-white'>Agregar un comentario:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Agregar Comentario
        </Button>
      </Form>
      {mensaje && <Alert variant="info">{mensaje}</Alert>}
      <ListGroup>
        {comentarios.length > 0 ? (
          comentarios.map((comentario) => (
            <ListGroup.Item key={comentario.comentario_id}>
              {comentario.comentario}
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No hay comentarios disponibles.</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
};

export default Comentarios;
