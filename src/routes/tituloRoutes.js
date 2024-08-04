// src/routes/tituloRoutes.js
import express from 'express';
import { crearTitulo, obtenerTitulo } from '../controllers/tituloController.js';

const router = express.Router();

router.post('/', crearTitulo);
router.get('/:nombre', obtenerTitulo);

export default router;


////////////////////////////////////