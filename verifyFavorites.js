import pool from '/Users/denial/Desktop/Prueba_Proyecto/Proyecto_final/src/database/dbconfig.js';


const verifyFavorites = async () => {
  const perfil_id = 1;

  try {
    const query = 'SELECT t.* FROM favoritos f JOIN titulo t ON f.titulo_id = t.titulo_id WHERE f.perfil_id = $1';
    const values = [perfil_id];
    const result = await pool.query(query, values);

  
    console.log('Resultados de la consulta:', result.rows);
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
  }
};

verifyFavorites();
