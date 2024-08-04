// src/controllers/tituloController.js
import pool from '../database/dbconfig.js';

// Función para crear un nuevo título
const crearTitulo = async (req, res) => {
  const { nombre, precio, movie_id } = req.body;  // Agregar movie_id

  if (!nombre || !precio || !movie_id) {  // Validar movie_id
    return res.status(400).json({ message: 'Nombre, precio y movie_id son obligatorios' });
  }

  try {
    const query = 'INSERT INTO titulo (nombre, precio, movie_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [nombre, precio, movie_id];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al guardar el título:', err);
    res.status(500).json({ message: 'Error al guardar el título' });
  }
};

// Función para obtener un título por su nombre
const obtenerTitulo = async (req, res) => {
  const { nombre } = req.params;

  try {
    const query = 'SELECT * FROM titulo WHERE nombre = $1';
    const values = [nombre];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Título no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener el título:', err);
    res.status(500).json({ message: 'Error al obtener el título' });
  }
};

export { crearTitulo, obtenerTitulo };

////////// ESTE CODIGO DE ARRIBA FUNCIONA //////
