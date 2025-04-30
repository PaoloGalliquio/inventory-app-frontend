import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { usePropsInputs } from '../../hooks/useProps/usePropsInput.js';
import { usePropsSelect } from '../../hooks/useProps/usePropsSelect.js';

export default function Product({
  show,
  setShow,
  canEdit,
  categories,
  product,
  title,
  handleSubmit,
  formValues,
  setFormValues,
  isLoading,
  setIsLoading,
}) {
  const SECTION_NAME = "products";
  const KEYS = {
    name: "Name",
    description: "Description",
    price: "Price",
    quantity: "Quantity",
    idCategory: "IdCategory",
  };
  const [allDropdowns, setAllDropdowns] = useState([{ key: "categories", value: categories }]);
  const [commonProps] = usePropsInputs(formValues, setFormValues, SECTION_NAME);
  const [selectProps] = usePropsSelect(allDropdowns, formValues, setFormValues);

  return (
    <Modal show={show} onHide={() => setShow(true)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del producto"
              {...commonProps(KEYS.name)}
              disabled={!canEdit || isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción del producto"
              {...commonProps(KEYS.description)}
              disabled={!canEdit || isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio del producto"
              {...commonProps(KEYS.price)}
              disabled={!canEdit || isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicQuantity">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantidad del producto"
              {...commonProps(KEYS.quantity)}
              disabled={!canEdit || isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCategory">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...selectProps(KEYS.idCategory)}
              disabled={!canEdit || isLoading}>
              <option>Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.idCategory} value={category.idCategory}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
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
          <Button
            variant="primary"
            disabled={isLoading}
            onClick={() => handleSubmit()}>
            Guardar Producto
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
