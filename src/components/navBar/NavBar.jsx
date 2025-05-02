import React, { useContext, useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { AuthContext } from '../../hooks/context/authContext';
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useManageGetRequest } from '../../hooks/useManageRequest/useManageRequest';
import Notification from './Notification';

function NavBar() {
  const { state, dispatch } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [executeGet] = useManageGetRequest();

  const logOut = () => {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/login";
  };

  const getNotifications = async () => {
    await executeGet(`/api/Notification/${state.userId}`, (response) => {
      setNotifications(response.data);
    });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/inventory">Sistema</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/inventory">Inventario</Nav.Link>
            {state.roleId == 1 && <Nav.Link href="/users">Usuarios</Nav.Link>}
            <Nav.Link href="/reports">Reportes</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              className="position-relative"
              onClick={() => setShowNotifications(!showNotifications)}>
              <FontAwesomeIcon icon={faBell} />
              {notifications.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notifications.length}
                </span>
              )}
              {showNotifications && (
                <div onClick={(e) => e.stopPropagation()}>
                  <Notification
                    notifications={notifications}
                    refreshNotifications={getNotifications}
                  />
                </div>
              )}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                logOut();
              }}>
              Cerrar sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar