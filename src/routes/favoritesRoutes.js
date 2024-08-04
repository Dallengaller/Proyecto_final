// src/routes/favoritesRoutes.js
import express from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favoritesController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/', authenticateToken, getFavorites); // Obtener favoritos
router.post('/', authenticateToken, addFavorite); // Agregar favorito
router.delete('/:movieID', authenticateToken, removeFavorite); // Eliminar favorito

export default router;