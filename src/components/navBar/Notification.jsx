import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useManagePutRequest } from "../../hooks/useManageRequest/useManageRequest";

function Notification({ notifications, refreshNotifications }) {
  const [executePut] = useManagePutRequest();

  const handleCloseNotification = async (notification) => {
    await executePut(
      `/api/Notification/${notification.IdNotification}`,
      {},
      refreshNotifications
    );
  };

  return (
    <Container
      className="border rounded position-absolute bg-white"
      style={{ width: "300px", right: "10px", borderColor: "#dee2e6" }}>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <Row key={index} className="p-2 border-bottom">
            <Col xs={10} className="text-dark">
              <p className="mb-0">
                <b>{notification.Title}</b>
              </p>
              <small>{notification.Description}</small>
            </Col>
            <Col
              xs={2}
              className="text-end  d-flex align-items-center justify-content-center">
              <FontAwesomeIcon
                icon={faCircleXmark}
                size="xd"
                className="text-dark"
                onClick={() => handleCloseNotification(notification)}
              />
            </Col>
          </Row>
        ))
      ) : (
        <Row>
          <Col className="p-2 text-center text-dark">No hay notificaciones</Col>
        </Row>
      )}
    </Container>
  );
}

export default Notification;
