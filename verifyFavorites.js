import pool from '/Users/denial/Desktop/Prueba_Proyecto/Proyecto_final/src/database/dbconfig.js';

// Función para verificar los datos de los favoritos
const verifyFavorites = async () => {
  const perfil_id = 1; // Reemplaza con un valor de perfil_id válido para pruebas

  try {
    const query = 'SELECT t.* FROM favoritos f JOIN titulo t ON f.titulo_id = t.titulo_id WHERE f.perfil_id = $1';
    const values = [perfil_id];
    const result = await pool.query(query, values);

    // Imprime los resultados de la consulta
    console.log('Resultados de la consulta:', result.rows);
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
  }
};

// Llama a la función para realizar la verificación
verifyFavorites();
