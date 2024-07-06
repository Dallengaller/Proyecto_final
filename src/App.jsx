// src/App.jsx
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navbar';
import HomePage from './views/HomePage';
import Favoritos from './views/Favoritos';
import Categorias from './views/Categorias';
import Carrito from './views/Carrito';
import NotFound from './views/NotFound';
import TitleDetails from './views/TitleDetails';
import { FavoritesProvider } from './context/FavoritesContext'; // Importa el FavoritesProvider

const App = () => {
  return (
    <FavoritesProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/title/:id" element={<TitleDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </FavoritesProvider>
  );
};

export default App;
