// src/routes/favoritesRoutes.js
import express from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favoritesController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.get('/', authenticateToken, getFavorites); 
router.post('/', authenticateToken, addFavorite); 
router.delete('/:movieID', authenticateToken, removeFavorite); 

export default router;