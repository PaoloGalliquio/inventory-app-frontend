import { Button, Form, Modal } from "react-bootstrap";
import { usePropsInputs } from "../../hooks/useProps/usePropsInput.js";
import { usePropsSelect } from "../../hooks/useProps/usePropsSelect.js";
import { useState } from "react";

export default function User({
  closeModal,
  title,
  canEdit,
  roles,
  handleSubmit,
  formValues,
  setFormValues,
  isLoading,
}) {
  const SECTION_NAME = "Users";
  const KEYS = {
    name: "Name",
    email: "Email",
    password: "Password",
    idRole: "IdRole"
  };
  const [allDropdowns, setAllDropdowns] = useState([
    { key: "IdRole", value: roles },
  ]);
  const [commonProps] = usePropsInputs(formValues, setFormValues, SECTION_NAME);
  const [selectProps] = usePropsSelect(allDropdowns, formValues, setFormValues, SECTION_NAME);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              {...commonProps(KEYS.name)}
              disabled={!canEdit || isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              {...commonProps(KEYS.email)}
              disabled={!canEdit || isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              {...commonProps(KEYS.password)}
              disabled={!canEdit || isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...selectProps(KEYS.idRole)}
              disabled={!canEdit || isLoading}>
              <option>Seleccionar rol</option>
              {roles.map((role) => (
                <option key={role.IdRole} value={role.IdRole}>
                  {role.Name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={canEdit ? "secondary" : "primary"}
          onClick={closeModal}>
          Cerrar
        </Button>
        {canEdit && (
          <Button variant="primary" onClick={() => handleSubmit()}>
            Guardar Usuario
          </Button>
        )}
      </Modal.Footer>
    </>
  );
}
