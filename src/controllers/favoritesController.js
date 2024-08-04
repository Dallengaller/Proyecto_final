// src/controllers/favoritesController.js
import pool from '../database/dbconfig.js';

// Obtener los favoritos del usuario

const getFavorites = async (req, res) => {
  const perfil_id = req.user.perfil_id; // Asegúrate de que perfil_id está en el token JWT

  try {
    const query = `
      SELECT f.favoritos_id, f.perfil_id, t.titulo_id, t.nombre AS titulo_nombre, t.precio, f.movie_id, f.image_url
      FROM favoritos f
      JOIN titulo t ON f.titulo_id = t.titulo_id
      WHERE f.perfil_id = $1
    `;
    const values = [perfil_id];
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};


const addFavorite = async (req, res) => {
  const { nombre, poster } = req.body; // Asegúrate de que 'poster' esté en el cuerpo de la solicitud
  const perfil_id = req.user.perfil_id; // Obtén perfil_id del token JWT

  try {
    // Obtén el ID del título basado en el nombre
    const titleQuery = 'SELECT titulo_id, movie_id FROM titulo WHERE nombre = $1';
    const titleResult = await pool.query(titleQuery, [nombre]);

    if (titleResult.rows.length === 0) {
      return res.status(404).json({ message: 'Título no encontrado' });
    }

    const { titulo_id, movie_id } = titleResult.rows[0];

    // Inserta el favorito en la base de datos con el poster URL
    const query = `
      INSERT INTO favoritos (perfil_id, titulo_id, movie_id, image_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (perfil_id, titulo_id) DO NOTHING
    `;
    const values = [perfil_id, titulo_id, movie_id, poster];
    await pool.query(query, values);
    res.status(201).json({ message: 'Favorito agregado' });
  } catch (err) {
    console.error('Error adding favorite:', err);
    res.status(500).json({ message: 'Error adding favorite' });
  }
};

// Eliminar un título de favoritos
const removeFavorite = async (req, res) => {
  const movieID = req.params.movieID; // Recibe el movieID como parámetro en la ruta
  const perfil_id = req.user.perfil_id; // Obtén perfil_id del token JWT

  try {
    // Obtén el ID del título basado en movieID
    const titleQuery = 'SELECT titulo_id FROM titulo WHERE movie_id = $1';
    const titleResult = await pool.query(titleQuery, [movieID]);

    if (titleResult.rows.length === 0) {
      return res.status(404).json({ message: 'Título no encontrado' });
    }

    const titulo_id = titleResult.rows[0].titulo_id;

    // Elimina el favorito de la base de datos
    const query = 'DELETE FROM favoritos WHERE titulo_id = $1 AND perfil_id = $2';
    const values = [titulo_id, perfil_id];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Favorito no encontrado' });
    }

    res.status(200).json({ message: 'Favorito eliminado' });
  } catch (err) {
    console.error('Error removing favorite:', err);
    res.status(500).json({ message: 'Error removing favorite' });
  }
};

export { getFavorites, addFavorite, removeFavorite };

