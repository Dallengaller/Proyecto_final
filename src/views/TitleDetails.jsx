// src/views/TitleDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { fetchMovieDetails } from '../services/movieApi';
import { useFavorites } from '../context/FavoritesContext';

const TitleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, addToCart, favorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
        setIsFavorite(favorites.some(fav => fav.imdbID === data.imdbID));
      
        
        const precioAleatorio = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;

        
        await guardarTituloEnBaseDeDatos(data.Title, precioAleatorio);
        
        setLoading(false);
      } catch (error) {
        setError('Error fetching movie details');
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id, favorites]);

  const guardarTituloEnBaseDeDatos = async (nombre, precio) => {
    try {
      const response = await fetch('http://localhost:3000/api/titulo', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, precio }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el título en la base de datos');
      }
    } catch (error) {
      console.error(error);
      alert('Error al guardar el título. Intente de nuevo más tarde.');
    }
  };

  const handleFavoriteClick = () => {
    if (!movie) return;

    if (isFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (!movie) return;
    addToCart(movie);
  };

  const handleCommentsClick = () => {
    navigate('/comentarios');
  };

  if (loading) return <p>Cargando detalles de la película...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="py-4">
      <Card className="p-4">
        {movie && (
          <Row className="justify-content-center align-items-start">
            <Col md={4}>
              <div className="text-center mb-4">
                <img src={movie.Poster} alt={movie.Title} style={{ width: '300px', height: 'auto' }} />
              </div>
            </Col>
            <Col md={8}>
              <Card className="shadow-sm rounded-lg border-0 mb-4">
                <Card.Body>
                  <h3 className="mb-3">{movie.Title}</h3>
                  <p><strong>Sinopsis:</strong> {movie.Plot}</p>
                  <p><strong>Año:</strong> {movie.Year}</p>
                  <p><strong>Duración:</strong> {movie.Runtime}</p>
                  <p><strong>Idiomas:</strong> {movie.Language}</p>
                  <p><strong>Rating:</strong> {movie.imdbRating}</p>
                </Card.Body>
              </Card>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  {isFavorite ? (
                    <FavoriteIcon className="text-danger mr-2" onClick={handleFavoriteClick} style={{ cursor: 'pointer' }} />
                  ) : (
                    <FavoriteBorderIcon className="text-muted mr-2" onClick={handleFavoriteClick} style={{ cursor: 'pointer' }} />
                  )}
                  <ChatBubbleOutlineOutlinedIcon className="text-dark mr-2" onClick={handleCommentsClick} style={{ cursor: 'pointer' }} />
                </div>
                <div className="d-flex align-items-center mr-3">
                  <p className="mb-0">Precio $ {Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000}</p>
                </div>
                <Button variant="danger" onClick={handleAddToCart}>
                  Comprar
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Card>
    </Container>
  );
};

export default TitleDetails;
