import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/inventory">Sistema</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/inventory">Inventario</Nav.Link>
            <Nav.Link href="/users">Usuarios</Nav.Link>
            <Nav.Link href="/reports">Reportes</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/logout">Cerrar sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar