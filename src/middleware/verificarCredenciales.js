// src/middleware/verificarCredenciales.js
import pool from '../database/dbconfig.js';
import bcrypt from 'bcrypt';

export const verificarCredenciales = async (email, password) => {
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const values = [email];
  const result = await pool.query(consulta, values);

  if (result.rowCount === 0) {
    throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" };
  }

  const user = result.rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" };
  }

  return user;
};

////////////////////////////////////