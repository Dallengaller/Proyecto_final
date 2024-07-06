// src/views/TitleDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { fetchMovieDetails } from '../services/movieApi';

const TitleDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching movie details');
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) return <p>Cargando detalles de la película...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="py-4">
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
                <FavoriteBorderIcon className="text-muted mr-2" />
                <ChatBubbleOutlineOutlinedIcon className="text-muted mr-2" />
              </div>
              <Button variant="danger">Comprar</Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default TitleDetails;


