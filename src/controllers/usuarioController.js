// src/controllers/usuarioController.js
import pool from '../database/dbconfig.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verificarCredenciales } from '../middleware/verificarCredenciales.js';

const SECRET_KEY = 'secret_key_jwt';

export const crearUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const userCheck = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userCheck.rowCount > 0) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [nombre, email, hashedPassword];
    const result = await pool.query(query, values);
    
    const newUser = result.rows[0];

    const perfilQuery = 'INSERT INTO perfil (user_id) VALUES ($1) RETURNING *';
    await pool.query(perfilQuery, [newUser.id]);

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error al registrar el usuario:', err);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const values = [req.user.email];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener el usuario:', err);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await verificarCredenciales(email, password);

    const perfilIdQuery = 'SELECT perfil_id FROM perfil WHERE user_id = $1';
    const perfilIdResult = await pool.query(perfilIdQuery, [user.id]);
    const perfil_id = perfilIdResult.rows[0]?.perfil_id || null;

    const token = jwt.sign(
      { email: user.email, id: user.id, perfil_id },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send({ message: error.message });
  }
};
