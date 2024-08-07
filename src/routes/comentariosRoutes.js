// src/routes/comentariosRouter.js
import express from 'express';
import { agregarComentario, obtenerComentarios } from '../controllers/comentariosController.js';

const router = express.Router();


const validarId = (req, res, next) => {
  const id = req.params.id;
  if (!id || isNaN(id) || id <= 0) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  next();
};

router.post('/:id', validarId, agregarComentario);
router.get('/:id', validarId, obtenerComentarios);
router.get('/:id/comentario/:comentarioId', validarId, obtenerComentarios);

export default router;