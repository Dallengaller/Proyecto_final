// // src/views/Carrito.jsx
// import React, { useEffect } from 'react';
// import { Container, Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
// import { useCart } from '../context/CartContext';

// const Carrito = () => {
//   const { cartItems, removeFromCart } = useCart();

//   const handleRemoveFromCart = (movieId) => {
//     removeFromCart(movieId);
//   };

//   useEffect(() => {
//     console.log('Cart items:', cartItems); // Verifica los datos aquí
//   }, [cartItems]);

//   return (
//     <Container className="py-4 d-flex justify-content-center align-items-center text-white">
//       <div style={{ maxWidth: '600px', width: '100%' }}>
//         <h1 className="text-center mb-4">Carrito de Compras</h1>
//         {cartItems.length === 0 ? (
//           <p className="text-center">Su carrito está vacío.</p>
//         ) : (
//           <Row>
//             <Col xs={12}>
//               <ListGroup>
//                 {cartItems.map((item) => (
//                   <ListGroup.Item
//                     key={item.imdbID} // Usa imdbID como clave
//                     className="d-flex justify-content-between align-items-center"
//                   >
//                     <div className="d-flex align-items-center">
//                       {item.Poster ? (
//                         <Image
//                           src={item.Poster}
//                           alt={item.Title}
//                           thumbnail
//                           style={{ maxHeight: '50px' }}
//                           className="me-3"
//                         />
//                       ) : (
//                         <div style={{ maxHeight: '50px', width: '50px', backgroundColor: 'gray' }} className="me-3"></div>
//                       )}
//                       <div>
//                         <span className="me-3">{item.Title}</span>
//                         <small className="text-muted">({item.Year})</small>
//                       </div>
//                     </div>
//                     <Button
//                       variant="danger"
//                       onClick={() => handleRemoveFromCart(item.imdbID)}
//                     >
//                       Eliminar
//                     </Button>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Col>
//           </Row>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default Carrito;

// // // src/views/Carrito.jsx
// import React from 'react';
// import { Container, Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
// import { useCart } from '../context/CartContext';

// const Carrito = () => {
//   const { cartItems, removeFromCart } = useCart();

//   const handleRemoveFromCart = (movieId) => {
//     removeFromCart(movieId);
//   };

//   console.log('Cart items:', cartItems); // Verifica los datos aquí

//   return (
//     <Container className="py-4 d-flex justify-content-center align-items-center text-white">
//       <div style={{ maxWidth: '600px', width: '100%' }}>
//         <h1 className="text-center mb-4">Carrito de Compras</h1>
//         {cartItems.length === 0 ? (
//           <p className="text-center">Su carrito está vacío.</p>
//         ) : (
//           <Row>
//             <Col xs={12}>
//               <ListGroup>
//                 {cartItems.map((item) => (
//                   <ListGroup.Item 
//                     key={item.imdbID} // Usa imdbID como clave
//                     className="d-flex justify-content-between align-items-center"
//                   >
//                     <div className="d-flex align-items-center">
//                       {item.Poster ? (
//                         <Image 
//                           src={item.Poster} 
//                           alt={item.Title} 
//                           thumbnail 
//                           style={{ maxHeight: '50px' }} 
//                           className="me-3" 
//                         />
//                       ) : (
//                         <div style={{ maxHeight: '50px', width: '50px', backgroundColor: 'gray' }} className="me-3"></div>
//                       )}
//                       <div>
//                         <span className="me-3">{item.Title}</span>
//                         <small className="text-muted">({item.Year})</small>
//                       </div>
//                     </div>
//                     <Button
//                       variant="danger"
//                       onClick={() => handleRemoveFromCart(item.imdbID)}
//                     >
//                       Eliminar
//                     </Button>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Col>
//           </Row>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default Carrito;



// ////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
// import { useCart } from '../context/CartContext';
// import axios from 'axios';

// const Carrito = () => {
//   const { cartItems, removeFromCart } = useCart();
//   const [prices, setPrices] = useState({});

//   useEffect(() => {
//     const fetchPrices = async () => {
//       const priceRequests = cartItems.map(item =>
//         axios.get(`http://localhost:3000/api/cart/precio/${item.titulo_id}`)
//       );
//       try {
//         const responses = await Promise.all(priceRequests);
//         const priceMap = responses.reduce((acc, response) => {
//           acc[response.data.id] = response.data.precio;
//           return acc;
//         }, {});
//         setPrices(priceMap);
//       } catch (error) {
//         console.error('Error al obtener los precios:', error);
//       }
//     };

//     fetchPrices();
//   }, [cartItems]);

//   const handleRemoveFromCart = (movieId) => {
//     removeFromCart(movieId);
//   };

//   return (
//     <Container className="py-4 d-flex justify-content-center align-items-center text-white">
//       <div style={{ maxWidth: '600px', width: '100%' }}>
//         <h1 className="text-center mb-4">Carrito de Compras</h1>
//         {cartItems.length === 0 ? (
//           <p className="text-center">Su carrito está vacío.</p>
//         ) : (
//           <Row>
//             <Col xs={12}>
//               <ListGroup>
//                 {cartItems.map((item) => (
//                   <ListGroup.Item 
//                     key={item.imdbID}
//                     className="d-flex justify-content-between align-items-center"
//                   >
//                     <div className="d-flex align-items-center">
//                       {item.Poster ? (
//                         <Image 
//                           src={item.Poster} 
//                           alt={item.Title} 
//                           thumbnail 
//                           style={{ maxHeight: '50px' }} 
//                           className="me-3" 
//                         />
//                       ) : (
//                         <div style={{ maxHeight: '50px', width: '50px', backgroundColor: 'gray' }} className="me-3"></div>
//                       )}
//                       <div>
//                         <span className="me-3">{item.Title}</span>
//                         <small className="text-muted">({item.Year})</small>
//                       </div>
//                     </div>
//                     <div>
//                       <span>Precio: ${prices[item.titulo_id] || 'Cargando...'}</span>
//                     </div>
//                     <Button
//                       variant="danger"
//                       onClick={() => handleRemoveFromCart(item.imdbID)}
//                     >
//                       Eliminar
//                     </Button>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Col>
//           </Row>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default Carrito;

//// //////

// // src/views/Carrito.jsx
// import React from 'react';
// import { Container, Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
// import { useCart } from '../context/CartContext';

// const Carrito = () => {
//   const { cartItems, removeFromCart } = useCart();

//   const handleRemoveFromCart = (movieId) => {
//     removeFromCart(movieId);
//   };

//   console.log('Cart items:', cartItems); // Verifica los datos aquí

//   return (
//     <Container className="py-4 d-flex justify-content-center align-items-center text-white">
//       <div style={{ maxWidth: '600px', width: '100%' }}>
//         <h1 className="text-center mb-4">Carrito de Compras</h1>
//         {cartItems.length === 0 ? (
//           <p className="text-center">Su carrito está vacío.</p>
//         ) : (
//           <Row>
//             <Col xs={12}>
//               <ListGroup>
//                 {cartItems.map((item) => (
//                   <ListGroup.Item 
//                     key={item.imdbID} // Usa imdbID como clave
//                     className="d-flex justify-content-between align-items-center"
//                   >
//                     <div className="d-flex align-items-center">
//                       {item.Poster ? (
//                         <Image 
//                           src={item.Poster} 
//                           alt={item.Title} 
//                           thumbnail 
//                           style={{ maxHeight: '50px' }} 
//                           className="me-3" 
//                         />
//                       ) : (
//                         <div style={{ maxHeight: '50px', width: '50px', backgroundColor: 'gray' }} className="me-3"></div>
//                       )}
//                       <div>
//                         <span className="me-3">{item.Title}</span>
//                         <small className="text-muted">({item.Year})</small>
//                       </div>
//                     </div>
//                     <div>
//                       <span>Precio: ${item.precio}</span> {/* Muestra el precio aquí */}
//                     </div>
//                     <Button
//                       variant="danger"
//                       onClick={() => handleRemoveFromCart(item.imdbID)}
//                     >
//                       Eliminar
//                     </Button>
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Col>
//           </Row>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default Carrito;

///// //// ///
 ///// ESTA ES LA VISTA ORIGINAL ////
// // src/views/Carrito.jsx
// import React from 'react';
// import { Container, Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
// import { useCart } from '../context/CartContext';

// const Carrito = () => {
//   const { cartItems, removeFromCart } = useCart();

//   // Agrupar artículos por título y sumar las cantidades
//   const groupedItems = cartItems.reduce((acc, item) => {
//     const existingItem = acc.find((i) => i.Title === item.Title);
//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       acc.push({ ...item, quantity: 1 });
//     }
//     return acc;
//   }, []);

//   // Calcular el total del carrito
//   const total = groupedItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);

//   const handleRemoveFromCart = (movieId) => {
//     removeFromCart(movieId);
//   };

//   const handleBuyNow = () => {
//     alert('Compra realizada. ¡Gracias por su compra!');
//     // Aquí podrías agregar lógica para procesar la compra.
//   };

//   return (
//     <Container className="py-4 d-flex justify-content-center align-items-center text-white">
//       <div style={{ maxWidth: '800px', width: '100%' }}> {/* Aumenta el ancho de la caja */}
//         <h1 className="text-center mb-4">Carrito de Compras</h1>
//         {groupedItems.length === 0 ? (
//           <p className="text-center">Su carrito está vacío.</p>
//         ) : (
//           <>
//             <Row>
//               <Col xs={12}>
//                 <ListGroup>
//                   {groupedItems.map((item) => (
//                     <ListGroup.Item
//                       key={item.imdbID} // Usa imdbID como clave
//                       className="d-flex justify-content-between align-items-center"
//                     >
//                       <div className="d-flex align-items-center">
//                         {item.Poster ? (
//                           <Image
//                             src={item.Poster}
//                             alt={item.Title}
//                             thumbnail
//                             style={{ maxHeight: '50px' }}
//                             className="me-3"
//                           />
//                         ) : (
//                           <div style={{ maxHeight: '50px', width: '50px', backgroundColor: 'gray' }} className="me-3"></div>
//                         )}
//                         <div>
//                           <span className="me-3">{item.Title}</span>
//                           <small className="text-muted">({item.Year})</small>
//                           <div>
//                             <span className="text-muted">Cantidad: {item.quantity}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div>
//                         <span>Precio: ${item.precio}</span>
//                       </div>
//                       <Button
//                         variant="danger"
//                         onClick={() => handleRemoveFromCart(item.imdbID)}
//                       >
//                         Eliminar
//                       </Button>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </Col>
//             </Row>
//             <Row className="mt-4">
//               <Col xs={12} className="d-flex justify-content-between align-items-center">
//                 <h3>Total: ${total}</h3>
//                 <Button variant="success" onClick={handleBuyNow}>
//                   Comprar
//                 </Button>
//               </Col>
//             </Row>
//           </>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default Carrito;


////////// vista modificada ///
// src/views/Carrito.jsx
// src/views/Carrito.jsx
import React from 'react';
import { Container, Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const Carrito = () => {
  const { cartItems, removeFromCart } = useCart();

  // Agrupar artículos por título y sumar las cantidades
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.Title === item.Title);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Calcular el total del carrito
  const total = groupedItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);

  const handleRemoveFromCart = (movieId) => {
    removeFromCart(movieId);
  };

  const handleBuyNow = () => {
    alert('Compra realizada. ¡Gracias por su compra!');
    // Aquí podrías agregar lógica para procesar la compra.
  };

  return (
    <Container className="py-4 d-flex justify-content-center align-items-center text-white">
      <div style={{ maxWidth: '1000px', width: '100%' }}> {/* Aumenta el ancho de la caja */}
        <h1 className="text-center mb-4">Carrito de Compras</h1>
        {groupedItems.length === 0 ? (
          <p className="text-center">Su carrito está vacío.</p>
        ) : (
          <>
            <Row>
              <Col xs={12}>
                <ListGroup>
                  {groupedItems.map((item) => (
                    <ListGroup.Item
                      key={item.imdbID} // Usa imdbID como clave
                      className="d-flex align-items-start mb-3"
                    >
                      <Row className="w-100 align-items-center">
                        <Col xs={12} md={4} className="d-flex align-items-center">
                          {item.Poster ? (
                            <Image
                              src={item.Poster}
                              alt={item.Title}
                              thumbnail
                              style={{ maxHeight: '75px' }}
                              className="me-3"
                            />
                          ) : (
                            <div style={{ maxHeight: '75px', width: '75px', backgroundColor: 'gray' }} className="me-3"></div>
                          )}
                          <div className="flex-grow-1">
                            <span className="d-block text-truncate">{item.Title}</span>
                            <small className="text-muted">({item.Year})</small>
                            <div>
                              <span className="text-muted">Cantidad: {item.quantity}</span>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
                          <span>Precio: ${item.precio}</span>
                        </Col>
                        <Col xs={12} md={4} className="d-flex justify-content-end align-items-center">
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveFromCart(item.imdbID)}
                          >
                            Eliminar
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col xs={12} className="d-flex justify-content-between align-items-center">
                <h3>Total: ${total}</h3>
                <Button variant="success" onClick={handleBuyNow}>
                  Comprar
                </Button>
              </Col>
            </Row>
          </>
        )}
      </div>
    </Container>
  );
};

export default Carrito;
