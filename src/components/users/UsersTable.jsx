import React, { useCallback, useState } from "react";
import { Button, Table, Collapse, Row, Col, Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import arrow from "../../assets/icons/Arrow.svg";

export function UsersTable({ users }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [openRows, setOpenRows] = useState(new Set());
  const toggleRow = useCallback((productId) => {
    setOpenRows((prev) => {
      const newSet = new Set(prev);
      newSet.has(productId) ? newSet.delete(productId) : newSet.add(productId);
      return newSet;
    });
  }, []);

  if (!isMobile) {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="outline-info" size="sm" className="me-2">
                  Detalle
                </Button>
                <Button variant="outline-primary" size="sm" className="me-2">
                  Editar
                </Button>
                <Button variant="outline-danger" size="sm">
                  Desactivar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  const UserRow = React.memo(({ user }) => {
    const isOpen = openRows.has(user.id);

    return (
      <React.Fragment key={user.id}>
        <tr>
          <td className="text-center fw-bold">
            <Container>
              <Row>
                <Col xs={1} className="text-center p-0">
                  <Button
                    onClick={() => toggleRow(user.id)}
                    className="rounded-circle p-0 d-flex align-items-center justify-content-center"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    aria-expanded={isOpen}>
                    <img
                      src={arrow}
                      alt="Desplegar"
                      style={{
                        transform: isOpen ? "rotate(270deg)" : "rotate(90deg)",
                        transition: "transform 0.2s ease",
                      }}
                      width={7}
                      height={7}
                    />
                  </Button>
                </Col>
                <Col xs={11} className="text-start p-0">
                  {user.name}
                </Col>
              </Row>
            </Container>
          </td>
        </tr>
        <Collapse in={isOpen}>
          <tr>
            <td className="p-0">
              <table className="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <td>
                      <b>Nombre</b>
                    </td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Email</b>
                    </td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Acciones</b>
                    </td>
                    <td>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="me-2 mb-1">
                        Detalle
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2 mb-1">
                        Editar
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="mb-1">
                        Desactivar
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </Collapse>
      </React.Fragment>
    );
  });

  return (
    <Table responsive bordered className="mobile-user-table">
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </Table>
  );
}
