// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMovies } from '../services/movieApi';
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim() && isAuthenticated()) {
        fetchResults(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(delayedSearch);
  }, [searchTerm, isAuthenticated]);

  const fetchResults = async (term) => {
    try {
      const results = await fetchMovies(term);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultClick = (id) => {
    navigate(`/title/${id}`);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige a la página de inicio de sesión
  };

  return (
    <Navbar bg="warning" variant="light" expand="lg" className="bg-body-primary position-relative">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Proyecto Final Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={Link} to="/" className="text-white ms-3 text-decoration-none">🏠 Home</Nav.Link>
            <Nav.Link as={Link} to="/favoritos" className="text-white ms-3 text-decoration-none">Favoritos</Nav.Link>
            <Nav.Link as={Link} to="/categorias" className="text-white ms-3 text-decoration-none">Categorías</Nav.Link>
            <Nav.Link as={Link} to="/carrito" className="text-white ms-3 text-decoration-none">Carrito</Nav.Link>
          </Nav>
          <Form className="position-relative">
            <Form.Control
              type="search"
              name="search"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Buscar"
              className="me-2"
              aria-label="Buscar"
            />
            {searchResults.length > 0 && (
              <ul className="list-group position-absolute bg-white w-100 rounded shadow mt-1" style={{ zIndex: 100 }}>
                {searchResults.map((movie) => (
                  <li key={movie.imdbID} className="list-group-item cursor-pointer" onClick={() => handleResultClick(movie.imdbID)}>
                    {movie.Title} ({movie.Year})
                  </li>
                ))}
              </ul>
            )}
          </Form>
          {isAuthenticated() ? (
            <Button variant="outline-light" className="ms-3" onClick={handleLogout}>Salir</Button>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="text-white ms-3 text-decoration-none">Iniciar Sesión</Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-white ms-3 text-decoration-none">Registrarse</Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
