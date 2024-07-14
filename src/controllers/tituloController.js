// src/controllers/tituloController.js
import pool from '../database/dbconfig.js';

const crearTitulo = async (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ message: 'Nombre y precio son obligatorios' });
  }

  try {
    const query = 'INSERT INTO titulo (nombre, precio) VALUES ($1, $2) RETURNING *';
    const values = [nombre, precio];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al guardar el título:', err);
    res.status(500).json({ message: 'Error al guardar el título' });
  }
};

export default crearTitulo;
