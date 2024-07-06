// import { Route, Routes } from 'react-router-dom';
// import Navigation from './components/Navbar';
// import HomePage from './views/HomePage';
// import Favoritos from './views/Favoritos';
// import Categorias from './views/Categorias';
// import Carrito from './views/Carrito';
// import NotFound from './views/NotFound';

// const App = () => {
//   return (
//     <div>
//       <Navigation />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/favoritos" element={<Favoritos />} />
//         <Route path="/categorias" element={<Categorias />} />
//         <Route path="/carrito" element={<Carrito />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;


// src/App.jsx
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navbar';
import HomePage from './views/HomePage';
import Favoritos from './views/Favoritos';
import Categorias from './views/Categorias';
import Carrito from './views/Carrito';
import NotFound from './views/NotFound';
import TitleDetails from './views/TitleDetails';

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/title/:id" element={<TitleDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;


