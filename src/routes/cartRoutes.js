// src/routes/cartRoutes.js
import express from 'express';
const router = express.Router();


router.post('/', (req, res) => {
  const { movie } = req.body;
 
  const addedMovie = { ...movie, addedAt: new Date() }; 
  res.status(200).send(addedMovie);
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  res.status(200).send({ message: 'Ítem eliminado del carrito', id });
});

export default router;


////////////////////////////////////

