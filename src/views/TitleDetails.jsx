// src/views/TitleDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { fetchMovieDetails } from '../services/movieApi';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';

const TitleDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, addToCart, favorites } = useFavorites();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
        setIsFavorite(favorites.some(fav => fav.imdbID === data.imdbID));
        setLoading(false);
      } catch (error) {
        setError('Error fetching movie details');
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id, favorites]);

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
                  <ChatBubbleOutlineOutlinedIcon className="text-dark mr-2" />
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
