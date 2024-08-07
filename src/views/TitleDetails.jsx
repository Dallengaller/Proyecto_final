// src/views/TitleDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { fetchMovieDetails } from '../services/movieApi';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

const TitleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [precio, setPrecio] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);


        setIsFavorite(favorites.some(fav => fav.movie_id === data.imdbID));
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`http://https://proyecto-final-backend-k4ps.onrender.com/api/titulo/${data.Title}`);
        if (response.ok) {
          const titulo = await response.json();
          setPrecio(titulo.precio);
        } else {
          const precioAleatorio = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
          const guardarResponse = await fetch(`http://https://proyecto-final-backend-k4ps.onrender.com/api/titulo`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: data.Title, precio: precioAleatorio, movie_id: data.imdbID }),
          });
          if (guardarResponse.ok) {
            setPrecio(precioAleatorio);
          } else {
            throw new Error('Error al guardar el título en la base de datos');
          }
        }

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
    if (!movie || precio === null) return;
    console.log('Adding to cart:', movie);
    addToCart({ ...movie, precio });
  };


  const handleCommentsClick = () => {
    navigate(`/comentarios/${id}`);
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
                  <p><strong>Género:</strong> {movie.Genre}</p>
                  <p><strong>Director:</strong> {movie.Director}</p>
                  <p><strong>Actores:</strong> {movie.Actors}</p>
                  <p><strong>Precio:</strong> ${precio}</p>
                </Card.Body>
              </Card>
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  variant={isFavorite ? 'danger' : 'outline-primary'}
                  onClick={handleFavoriteClick}
                  aria-label={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
                >
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  {isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                >
                  Añadir al Carrito
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCommentsClick}
                >
                  <ChatBubbleOutlineOutlinedIcon /> Comentarios
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
