import React, { useState, useEffect } from "react";
import NavBar from '../components/navBar/NavBar';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { UsersTable } from "../components/users/UsersTable";
import CreateUser from "../components/users/CreateUser";
import { useManageGetRequest } from "../hooks/useManageRequest/useManageRequest";
import ModalEnabled from "../components/modalEnabled/ModalEnabled";

function Users() {
  const [modalEnabled, setModalEnabled] = useState({ isEnable: false, component: React.Fragment });
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [executeGet] = useManageGetRequest();

  const init = async () => {
    await executeGet("/api/User", (response) => {
      setUsers(response.data);
    });
    await executeGet("/api/Role", (response) => {
      setRoles(response.data);
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <NavBar />
      <ModalEnabled
        modalEnabled={modalEnabled}
        setModalEnabled={setModalEnabled}
        refreshPage={init}
      />
      <Container className="py-2 px-3">
        <Row className="card py-3 px-2 mt-3">
          <Col xs={12} className="mb-3">
            <Row>
              <Col>
                <b>Usuarios</b>
              </Col>
              <Col className="text-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setModalEnabled({
                      isEnable: true,
                      component: CreateUser,
                      props: {
                        roles,
                      },
                    });
                  }}>
                  Agregar usuario
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <UsersTable
              users={users}
              roles={roles}
              setModalEnabled={setModalEnabled}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Users