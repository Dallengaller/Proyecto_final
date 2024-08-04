// src/controllers/comentariosController.js
import pool from '../database/dbconfig.js';

// Función para agregar un nuevo comentario
const agregarComentario = async (req, res) => {
  const { titulo_id, comentario } = req.body;

  if (!titulo_id || !comentario) {
    return res.status(400).json({ message: 'Título ID y comentario son obligatorios' });
  }

  try {
    const query = 'INSERT INTO comentarios (titulo_id, comentario) VALUES ($1, $2) RETURNING *';
    const values = [titulo_id, comentario];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al agregar el comentario:', err);
    res.status(500).json({ message: 'Error al agregar el comentario' });
  }
};

// Función para obtener comentarios de un título
const obtenerComentarios = async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM comentarios WHERE titulo_id = $1';
    const values = [id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron comentarios' });
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener los comentarios:', err);
    res.status(500).json({ message: 'Error al obtener los comentarios' });
  }
};

export { agregarComentario, obtenerComentarios };
