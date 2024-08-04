// src/database/dbconfig.js
// import pkg from 'pg';
// const { Pool } = pkg;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'proyectofinal_db',
//   password: '123',
//   port: 5432,
// });

// export default pool;

// conexion base orinal

// Conexion base de prueba
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Proyecto_DB',
  password: '123',
  port: 5432,
});

export default pool;