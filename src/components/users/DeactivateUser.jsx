import React, { useState } from "react";
import { useManageDeleteRequest } from "../../hooks/useManageRequest/useManageRequest";
import { Button, Modal } from "react-bootstrap";

function DeleteUser({ closeModal, refreshPage, user }) {
  const [executeDelete] = useManageDeleteRequest();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await executeDelete(
      `/api/User/${user.IdUser}`,
      successSubmitCallback
    );
    setIsLoading(false);
  };

  const successSubmitCallback = async () => {
    closeModal();
    await refreshPage();
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro de que desea desactivar al usuario <b>{user.Name}</b>?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
        <Button
          variant="danger"
          disabled={isLoading}
          onClick={() => {
            handleDelete();
          }}>
          Desactivar
        </Button>
      </Modal.Footer>
    </>
  );
}

export default DeleteUser;
