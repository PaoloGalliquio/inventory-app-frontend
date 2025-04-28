import React, { useState } from 'react'
import NavBar from '../components/navBar/NavBar';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { UsersTable } from "../components/users/UsersTable";
import User from '../components/users/User';

function Users() {
  const [showCreate, setShowCreate] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "User 1",
      email: "user@gmail.com",
    },
    {
      id: 2,
      name: "User 2",
      email: "user2@gmail.com",
    },
    {
      id: 3,
      name: "User 3",
      email: "user3@gmail.com",
    },
  ]);
  
  const modalCreate = (
    <User
      show={showCreate}
      setShow={setShowCreate}
      canEdit={true}
    />
  );

  return (
    <>
      <NavBar />
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
                  onClick={() => setShowCreate(true)}>
                  Agregar usuario
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <UsersTable users={users} />
          </Col>
        </Row>
      </Container>
      {modalCreate}
    </>
  );
}

export default Users