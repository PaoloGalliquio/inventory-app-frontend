import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { usePropsInputs } from '../../hooks/useProps/usePropsInput.js';
import { usePropsSelect } from '../../hooks/useProps/usePropsSelect.js';

export default function Product({
  closeModal,
  title,
  canEdit,
  categories,
  handleSubmit,
  formValues,
  setFormValues,
  isLoading
}) {
  const SECTION_NAME = "products";
  const KEYS = {
    name: "Name",
    description: "Description",
    price: "Price",
    quantity: "Quantity",
    idCategory: "IdCategory",
  };
  const [allDropdowns, setAllDropdowns] = useState([
    { key: "IdCategory", value: categories },
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
          <Form.Group className="mb-3" controlId={[KEYS.name]}>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del producto"
              {...commonProps(KEYS.name)}
              disabled={!canEdit || isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={[KEYS.description]}>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción del producto"
              {...commonProps(KEYS.description)}
              disabled={!canEdit || isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={[KEYS.price]}>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio del producto"
              {...commonProps(KEYS.price)}
              disabled={!canEdit || isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={[KEYS.quantity]}>
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantidad del producto"
              {...commonProps(KEYS.quantity)}
              disabled={!canEdit || isLoading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={[KEYS.idCategory]}>
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...selectProps(KEYS.idCategory)}
              disabled={!canEdit || isLoading}>
              <option>Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.IdCategory} value={category.IdCategory}>
                  {category.Name}
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
          Cancelar
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
    </>
  );
}
