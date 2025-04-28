import React, { useState } from 'react'
import { Container, Button, Form } from "react-bootstrap";
import { usePropsInputs } from '../hooks/useProps/usePropsInput';

function Login() {
  const SECTION_NAME = "Login";
  const KEYS = {
    email: "email",
    password: "password",
  };
  const [formValues, setFormValues] = useState({});
  const [commonProps] = usePropsInputs(formValues, setFormValues, SECTION_NAME);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Container className="w-25 mt-5 p-4 border rounded shadow">
      <h2 className="text-center">Iniciar Sesión</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Correo"
            {...commonProps(KEYS.email)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            {...commonProps(KEYS.password)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-3" onClick={handleSubmit}>
          Iniciar Sesión
        </Button>
      </Form>
    </Container>
  );
}

export default Login;