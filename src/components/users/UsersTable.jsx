import React, { useCallback, useState } from "react";
import { Button, Table, Collapse, Row, Col, Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import EditUser from "./EditUser";
import DetailUser from "./DetailUser";
import DeactivateUser from "./DeactivateUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export function UsersTable({ users, roles, setModalEnabled }) {
  const KEYS = {
    idUser: "IdUser",
    name: "Name",
    email: "Email",
    password: "Password",
    idRole: "IdRole",
    roleName: "RoleName",
  };
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [openRows, setOpenRows] = useState(new Set());
  const toggleRow = useCallback((productId) => {
    setOpenRows((prev) => {
      const newSet = new Set(prev);
      newSet.has(productId) ? newSet.delete(productId) : newSet.add(productId);
      return newSet;
    });
  }, []);

  const buttons = (user) => {
    return (
      <>
        <Button
          variant="outline-info"
          size="sm"
          className="me-2"
          onClick={() => {
            setModalEnabled({
              isEnable: true,
              component: DetailUser,
              props: {
                user,
                roles,
              },
            });
          }}>
          Detalle
        </Button>
        <Button
          variant="outline-primary"
          size="sm"
          className="me-2"
          onClick={() => {
            setModalEnabled({
              isEnable: true,
              component: EditUser,
              props: {
                user,
                roles,
              },
            });
          }}>
          Editar
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => {
            setModalEnabled({
              isEnable: true,
              component: DeactivateUser,
              props: {
                user,
              },
            });
          }}>
          Desactivar
        </Button>
      </>
    );
  };

  if (!isMobile) {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user[KEYS.idUser]}>
              <td>{index + 1}</td>
              <td>{user[KEYS.name]}</td>
              <td>{user[KEYS.email]}</td>
              <td>{user[KEYS.roleName]}</td>
              <td>{buttons(user)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  const UserRow = React.memo(({ user }) => {
    const isOpen = openRows.has(user[KEYS.idUser]);

    return (
      <React.Fragment key={user[KEYS.idUser]}>
        <tr>
          <td className="text-center fw-bold">
            <Container>
              <Row>
                <Col xs={1} className="text-center p-0">
                  <Button
                    onClick={() => toggleRow(user[KEYS.idUser])}
                    className="rounded-circle p-0 d-flex align-items-center justify-content-center"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    aria-expanded={isOpen}>
                      <FontAwesomeIcon
                        icon={isOpen ? faChevronUp : faChevronDown}
                        size="xs"
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
                    <td>{user[KEYS.name]}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Email</b>
                    </td>
                    <td>{user[KEYS.email]}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Rol</b>
                    </td>
                    <td>{user[KEYS.roleName]}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Acciones</b>
                    </td>
                    <td>{buttons(user)}</td>
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
          <UserRow key={user[KEYS.idRole]} user={user} />
        ))}
      </tbody>
    </Table>
  );
}
