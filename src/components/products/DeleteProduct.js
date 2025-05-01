import React, { useState } from "react";
import { useManageDeleteRequest } from "../../hooks/useManageRequest/useManageRequest";
import { Button, Modal } from "react-bootstrap";

function DeleteProduct({ closeModal, refreshPage, product }) {
  const [executeDelete] = useManageDeleteRequest();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await executeDelete(
      `/api/Product/${product.IdProduct}`,
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
        <Modal.Title>Eliminar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro de que desea eliminar el producto <b>{product.Name}</b>?
        </p>
        <p>Esta acción no se puede deshacer.</p>
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
          Eliminar
        </Button>
      </Modal.Footer>
    </>
  );
}

export default DeleteProduct;
