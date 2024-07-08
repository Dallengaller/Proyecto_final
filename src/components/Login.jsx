import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    console.log(email, password);

    // Inicio de sesion
    if (email === 'prueba@mail.com' && password === 'clave123') {
      login();
    } else {
      setError('Correo electrónico o contraseña incorrectos');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Form style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center text-white">Iniciar Sesión</h2>
        {error && <p className="text-danger">{error}</p>}
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
        <Button variant="primary" className="w-100 mb-3" onClick={handleLogin}>
          Iniciar Sesión
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
