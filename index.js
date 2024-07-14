// index.js
import express from 'express';
import cors from 'cors';
import pool from './src/database/dbconfig.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crearTitulo from './src/controllers/tituloController.js'; 
const app = express();
const SECRET_KEY = 'secret_key_jwt';

app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const verificarCredenciales = async (email, password) => {
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

app.post('/usuarios', async (req, res) => {
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
});

app.get('/usuarios', authenticateToken, async (req, res) => {
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
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await verificarCredenciales(email, password);
    const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send({ message: error.message });
  }
});

app.post('/api/titulo', crearTitulo); 


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`¡Servidor encendido en el puerto ${port}!`);
});
