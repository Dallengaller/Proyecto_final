// // src/index.js
// import express from 'express';
// import cors from 'cors';
// import usuarioRoutes from './src/routes/usuarioRoutes.js';
// import tituloRoutes from './src/routes/tituloRoutes.js';
// import favoritesRoutes from './src/routes/favoritesRoutes.js';
// import cartRoutes from './src/routes/cartRoutes.js';
// import { authenticateToken } from '../Proyecto_final/src/middleware/authenticateToken.js'; // Eliminar si no funciona

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/usuarios', usuarioRoutes);
// app.use('/api/titulo', tituloRoutes);
// app.use('/favorites', authenticateToken, favoritesRoutes);
// app.use('/cart', cartRoutes);

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`¡Servidor encendido en el puerto ${port}!`);
// });


// ////////////////////////////////////

// src/index.js
import express from 'express';
import cors from 'cors';
import usuarioRoutes from './src/routes/usuarioRoutes.js';
import tituloRoutes from './src/routes/tituloRoutes.js';
import favoritesRoutes from './src/routes/favoritesRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import comentariosRouter from './src/routes/comentariosRoutes.js'; /// Ruta comentarios
import { authenticateToken } from '../Proyecto_final/src/middleware/authenticateToken.js';

const app = express();

app.use(cors());
app.use(express.json());

// Define las rutas para cada recurso
app.use('/usuarios', usuarioRoutes);
app.use('/api/titulo', tituloRoutes);
app.use('/favorites', authenticateToken, favoritesRoutes);
app.use('/cart', cartRoutes);
app.use('/api/comentarios', comentariosRouter);  // Nueva ruta para comentarios

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`¡Servidor encendido en el puerto ${port}!`);
});
