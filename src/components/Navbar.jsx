import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Navigation = () => {
  return (
    <Navbar bg="danger" variant="dark" expand="lg" className="bg-body-primary">
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
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Buscar"
            />
            <Button variant="outline-light">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
