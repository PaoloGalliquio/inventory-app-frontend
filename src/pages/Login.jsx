import React, { useContext, useState } from 'react'
import { Container, Button, Form } from "react-bootstrap";
import { usePropsInputs } from '../hooks/useProps/usePropsInput';
import { AuthContext } from '../hooks/context/authContext';
import { validateLogin } from '../consumers/backendConsumer';
import { Navigate } from "react-router-dom";

function Login({url}) {
  const SECTION_NAME = "Login";
  const KEYS = {
    email: "email",
    password: "password",
  };
  const { dispatch, state } = useContext(AuthContext);
  const [formValues, setFormValues] = useState({});
  const [commonProps] = usePropsInputs(formValues, setFormValues, SECTION_NAME);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await validateLogin(formValues.email, formValues.password);
    if (response.status === 200) {
      return await dispatch({
        type: "LOGIN",
        payload: {
          isLoggedIn: true,
          email: response.data.Email,
          userId: response.data.IdUser,
          userEmail: response.data.Email,
          userName: response.data.Name,
          token: response.data.Token,
          role: response.data.UserRoleName,
          roleId: response.data.IdUserRole,
        },
      });
    } else {
      console.error("Login failed:", response.statusText);
    }
  }

  if (state.isLoggedIn) {
    return (
      <Navigate to="/"/>
    );
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