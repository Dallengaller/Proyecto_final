// src/routes/comentariosRouter.js
import express from 'express';
import { agregarComentario, obtenerComentarios } from '../controllers/comentariosController.js';

const router = express.Router();

// router.post('/', agregarComentario);
router.post('/:id', agregarComentario);
router.get('/:id', obtenerComentarios);

export default router;
