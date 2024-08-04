// src/routes/usuarioRoutes.js
import express from 'express';
import { crearUsuario, obtenerUsuario, loginUsuario } from '../controllers/usuarioController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/', crearUsuario);
router.get('/', authenticateToken, obtenerUsuario);
router.post('/login', loginUsuario);

export default router;


////////////////////////////////////