// Codigo inicial sin opcion buscar
// //src/components/Navbar.jsx
// import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';


// const Navigation = () => {
//   return (
//     <Navbar bg="danger" variant="dark" expand="lg" className="bg-body-primary">
//       <Container fluid>
//         <Navbar.Brand as={Link} to="/">
//           Proyecto Final Logo
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="mx-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             <Nav.Link as={Link} to="/" className="text-white ms-3 text-decoration-none">
//               🏠 Home
//             </Nav.Link>
//             <Nav.Link as={Link} to="/favoritos" className="text-white ms-3 text-decoration-none">
//               Favoritos
//             </Nav.Link>
//             <Nav.Link as={Link} to="/categorias" className="text-white ms-3 text-decoration-none">
//               Categorías
//             </Nav.Link>
//             <Nav.Link as={Link} to="/carrito" className="text-white ms-3 text-decoration-none">
//               Carrito
//             </Nav.Link>
//           </Nav>
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Buscar"
//               className="me-2"
//               aria-label="Buscar"
//             />
//             <Button variant="outline-light">Buscar</Button>
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navigation;


//  Codigo funcional al realizar las busquedas.
// // //src/components/Navbar.jsx
// import React, { useState } from 'react';
// import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { fetchMovies } from '../services/movieApi'; // Importa la función fetchMovies

// const Navigation = () => {
//   const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
//   const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de búsqueda

//   const handleSearch = async (event) => {
//     event.preventDefault();
//     if (!searchTerm.trim()) {
//       // Si no se ingresa ningún término, no realizamos la búsqueda
//       return;
//     }

//     try {
//       // Realiza la búsqueda utilizando fetchMovies
//       const results = await fetchMovies(searchTerm); // Llama a la función fetchMovies con el término de búsqueda
//       setSearchResults(results); // Actualiza los resultados de búsqueda con los resultados obtenidos
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Navbar bg="danger" variant="dark" expand="lg" className="bg-body-primary">
//       <Container fluid>
//         <Navbar.Brand as={Link} to="/">
//           Proyecto Final Logo
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="mx-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             <Nav.Link as={Link} to="/" className="text-white ms-3 text-decoration-none">
//               🏠 Home
//             </Nav.Link>
//             <Nav.Link as={Link} to="/favoritos" className="text-white ms-3 text-decoration-none">
//               Favoritos
//             </Nav.Link>
//             <Nav.Link as={Link} to="/categorias" className="text-white ms-3 text-decoration-none">
//               Categorías
//             </Nav.Link>
//             <Nav.Link as={Link} to="/carrito" className="text-white ms-3 text-decoration-none">
//               Carrito
//             </Nav.Link>
//           </Nav>
//           <Form onSubmit={handleSearch} className="d-flex">
//             <Form.Control
//               type="search"
//               name="search"
//               value={searchTerm}
//               onChange={handleChange}
//               placeholder="Buscar"
//               className="me-2"
//               aria-label="Buscar"
//             />
//             <Button type="submit" variant="outline-light">
//               Buscar
//             </Button>
//           </Form>
//           {/* Mostrar los resultados de búsqueda aquí */}
//           {searchResults.length > 0 && (
//             <div className="mt-2">
//               <h5>Resultados de búsqueda:</h5>
//               <ul>
//                 {searchResults.map((movie) => (
//                   <li key={movie.imdbID}>
//                     {movie.Title} ({movie.Year})
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navigation;


/////// Dropdown

// src/components/Navbar.jsx
// src/components/Navbar.jsx// src/components/Navbar.jsx
// // src/components/Navbar.jsx
// import React, { useState, useEffect } from 'react';
// import { Container, Navbar, Nav, Form, Dropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { fetchMovies } from '../services/movieApi'; // Importa la función fetchMovies

// const Navigation = () => {
//   const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
//   const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de búsqueda

//   useEffect(() => {
//     const delayedSearch = setTimeout(() => {
//       if (searchTerm.trim()) {
//         fetchResults(searchTerm);
//       } else {
//         setSearchResults([]);
//       }
//     }, 300); // Retardo de 300ms para evitar búsquedas excesivas al escribir
//     return () => clearTimeout(delayedSearch);
//   }, [searchTerm]);

//   const fetchResults = async (term) => {
//     try {
//       const results = await fetchMovies(term); // Llama a la función fetchMovies con el término de búsqueda
//       setSearchResults(results); // Actualiza los resultados de búsqueda con los resultados obtenidos
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//       setSearchResults([]);
//     }
//   };

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Navbar bg="danger" variant="dark" expand="lg" className="bg-body-primary position-relative">
//       <Container fluid>
//         <Navbar.Brand as={Link} to="/">
//           Proyecto Final Logo
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="mx-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             <Nav.Link as={Link} to="/" className="text-white ms-3 text-decoration-none">
//               🏠 Home
//             </Nav.Link>
//             <Nav.Link as={Link} to="/favoritos" className="text-white ms-3 text-decoration-none">
//               Favoritos
//             </Nav.Link>
//             <Nav.Link as={Link} to="/categorias" className="text-white ms-3 text-decoration-none">
//               Categorías
//             </Nav.Link>
//             <Nav.Link as={Link} to="/carrito" className="text-white ms-3 text-decoration-none">
//               Carrito
//             </Nav.Link>
//           </Nav>
//           <Form className="position-relative">
//             <Form.Control
//               type="search"
//               name="search"
//               value={searchTerm}
//               onChange={handleChange}
//               placeholder="Buscar"
//               className="me-2"
//               aria-label="Buscar"
//             />
//             {/* Mostrar los resultados de búsqueda aquí como lista desplegable */}
//             {searchResults.length > 0 && (
//               <ul className="list-group position-absolute bg-white w-100 rounded shadow mt-1" style={{ zIndex: 100 }}>
//                 {searchResults.map((movie) => (
//                   <li key={movie.imdbID} className="list-group-item">
//                     {movie.Title} ({movie.Year})
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navigation;

// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMovies } from '../services/movieApi'; // Importa la función fetchMovies

const Navigation = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de búsqueda
  const navigate = useNavigate();

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchResults(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 300); // Retardo de 300ms para evitar búsquedas excesivas al escribir
    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const fetchResults = async (term) => {
    try {
      const results = await fetchMovies(term); // Llama a la función fetchMovies con el término de búsqueda
      setSearchResults(results); // Actualiza los resultados de búsqueda con los resultados obtenidos
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultClick = (id) => {
    navigate(`/title/${id}`);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <Navbar bg="danger" variant="dark" expand="lg" className="bg-body-primary position-relative">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Proyecto Final Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/" className="text-white ms-3 text-decoration-none">
              🏠 Home
            </Nav.Link>
            <Nav.Link as={Link} to="/favoritos" className="text-white ms-3 text-decoration-none">
              Favoritos
            </Nav.Link>
            <Nav.Link as={Link} to="/categorias" className="text-white ms-3 text-decoration-none">
              Categorías
            </Nav.Link>
            <Nav.Link as={Link} to="/carrito" className="text-white ms-3 text-decoration-none">
              Carrito
            </Nav.Link>
          </Nav>
          <Form className="position-relative">
            <Form.Control
              type="search"
              name="search"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Buscar"
              className="me-2"
              aria-label="Buscar"
            />
            {/* Mostrar los resultados de búsqueda aquí como lista desplegable */}
            {searchResults.length > 0 && (
              <ul className="list-group position-absolute bg-white w-100 rounded shadow mt-1" style={{ zIndex: 100 }}>
                {searchResults.map((movie) => (
                  <li key={movie.imdbID} className="list-group-item cursor-pointer" onClick={() => handleResultClick(movie.imdbID)}>
                    {movie.Title} ({movie.Year})
                  </li>
                ))}
              </ul>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
