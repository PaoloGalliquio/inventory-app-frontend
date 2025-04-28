import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { usePropsInputs } from "../../hooks/useProps/usePropsInput.js";
import { initialAllOptionPromises } from "../../helper/utils.js";

export default function User({
  show,
  setShow,
  canEdit,
  user = null,
}) {
  const SECTION_NAME = "Users";
  const KEYS = {
    name: "name",
    email: "email",
  };
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState(user || {});
  const [commonProps] = usePropsInputs(formValues, setFormValues, SECTION_NAME);
  // const [getOptions] = useGetOptionsSelect();

  const initialPromises = () => {
    // return [getOptions("")];
  };

  const init = async () => {
    setIsLoading(true);
    try {
      await initialAllOptionPromises(
        initialPromises,
        Object.values(KEYS),
        // setAllDropdowns
        () => {}
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(true)}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              {...commonProps(KEYS.name)}
              disabled={!canEdit}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="number"
              placeholder="Email"
              {...commonProps(KEYS.email)}
              disabled={!canEdit}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="number"
              placeholder="Contraseña"
              {...commonProps(KEYS.password)}
              disabled={!canEdit}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={canEdit ? "secondary" : "primary"}
          onClick={() => setShow(false)}>
          Cerrar
        </Button>
        {canEdit && (
          <Button variant="primary" onClick={() => console.log(formValues)}>
            Guardar Usuario
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
