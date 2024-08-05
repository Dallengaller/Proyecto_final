// src/controllers/comentariosController.js
import pool from '../database/dbconfig.js';

const agregarComentario = async (req, res) => {
  const { movie_id, comentario } = req.body;

  if (!movie_id || !comentario) {
    return res.status(400).json({ message: 'Movie ID y comentario son obligatorios' });
  }

  try {
    const query = 'INSERT INTO comentarios (movie_id, comentario, perfil_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [movie_id, comentario, req.user.perfil_id]; 
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al agregar el comentario:', err);
    res.status(500).json({ message: 'Error al agregar el comentario' });
  }
};

const obtenerComentarios = async (req, res) => {
  const { movie_id } = req.params;

  try {
    const query = 'SELECT * FROM comentarios WHERE movie_id = $1';
    const values = [movie_id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron comentarios' });
    }

    res.set("Content-Type", "application/json");
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener los comentarios:', err);
    res.status(500).json({ message: 'Error al obtener los comentarios' });
  }
};


export { agregarComentario, obtenerComentarios };
