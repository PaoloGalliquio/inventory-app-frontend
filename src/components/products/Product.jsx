import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { usePropsInputs } from '../../hooks/useProps/usePropsInput.js';
import { initialAllOptionPromises } from '../../helper/utils.js';
import { usePropsSelect } from '../../hooks/useProps/usePropsSelect.js';

export default function Product({ show, setShow, canEdit, product, categories  }) {
  const SECTION_NAME = "products";
  const KEYS = {
    name: "name",
    description: "description",
    price: "price",
    quantity: "quantity",
    categoryId: "categoryId",
  }
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [commonProps] = usePropsInputs(formValues, setFormValues, SECTION_NAME);
  const [selectProps] = usePropsSelect(categories, formValues, setFormValues, SECTION_NAME);
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
        <Modal.Title>Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del producto"
              {...commonProps(KEYS.name)}
              disabled={!canEdit}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción del producto"
              {...commonProps(KEYS.description)}
              disabled={!canEdit}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio del producto"
              {...commonProps(KEYS.price)}
              disabled={!canEdit}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicQuantity">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantidad del producto"
              {...commonProps(KEYS.quantity)}
              disabled={!canEdit}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCategory">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              aria-label="Default select example"
              disabled={!canEdit}>
              <option>Seleccionar categoría</option>
              <option value="1">Categoría 1</option>
              <option value="2">Categoría 2</option>
              <option value="3">Categoría 3</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={canEdit ? "secondary" : "primary"} onClick={() => setShow(false)}>
          Cerrar
        </Button>
        {canEdit && (
          <Button variant="primary" onClick={() => console.log(formValues)}>
            Guardar Producto
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
