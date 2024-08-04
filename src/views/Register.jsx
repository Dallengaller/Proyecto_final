// src/views/Register.jsx

import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    console.log(name, email, password);

    
    if (name && email && password) {
      try {
        await register(name, email, password);
        alert('Usuario registrado exitosamente');
      } catch (error) {
        setError('Error al registrar usuario');
      }
    } else {
      setError('Todos los campos son obligatorios');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Form style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center text-white">Registrarse</h2>
        {error && <p className="text-danger">{error}</p>}
        <Form.Group controlId="formBasicName" className="mb-3 text-white">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="mb-3 text-white">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="mb-3 text-white">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" className="w-100 mb-3" onClick={handleRegister}>
          Registrarse
        </Button>
      </Form>
    </Container>
  );
};

export default Register;


////////////////////////////////////