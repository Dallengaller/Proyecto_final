// // src/controllers/cartController.js
import pool from '../database/dbconfig.js';

// Función para obtener el precio de un título por su ID
const obtenerPrecioPorId = async (req, res) => {
  const { id } = req.params;  // ID del título

  try {
    // Consulta para obtener el precio del título
    const query = 'SELECT precio FROM titulo WHERE titulo_id = $1';
    const values = [id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Título no encontrado' });
    }

    // Responde con el precio del título
    res.json({ precio: result.rows[0].precio });
  } catch (err) {
    console.error('Error al obtener el precio del título:', err);
    res.status(500).json({ message: 'Error al obtener el precio del título' });
  }
};

export { obtenerPrecioPorId };
