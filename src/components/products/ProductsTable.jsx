import React, { useCallback, useState } from "react";
import { Button, Table, Collapse, Row, Col, Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import DetailProduct from "./DetailProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export function ProductsTable({ products, categories, setModalEnabled }) {
  const KEYS = {
    name: "Name",
    description: "Description",
    price: "Price",
    quantity: "Quantity",
    category: "Category",
    idCategory: "IdCategory",
  };
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [openRows, setOpenRows] = useState(new Set());
  const toggleRow = useCallback((productId) => {
    setOpenRows((prev) => {
      const newSet = new Set(prev);
      newSet.has(productId) ? newSet.delete(productId) : newSet.add(productId);
      return newSet;
    });
  }, []);

  const buttons = (product) => {
    return (
      <>
        <Button
          variant="outline-info"
          size="sm"
          className="me-2"
          onClick={() => {
            setModalEnabled({
              isEnable: true,
              component: DetailProduct,
              props: {
                product,
                categories,
              },
            });
          }}>
          Detalle
        </Button>
        <Button
          variant="outline-primary"
          size="sm"
          className="me-2"
          onClick={() => {
            setModalEnabled({
              isEnable: true,
              component: EditProduct,
              props: {
                product,
                categories,
              },
            });
          }}>
          Editar
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => {
            setModalEnabled({
              isEnable: true,
              component: DeleteProduct,
              props: {
                product,
              },
            });
          }}>
          Eliminar
        </Button>
      </>
    );
  };

  if (!isMobile) {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product[KEYS.name]}</td>
              <td>{product[KEYS.description]}</td>
              <td>S/ {product[KEYS.price]}</td>
              <td>{product[KEYS.quantity]}</td>
              <td>{product[KEYS.category]?.[KEYS.name]}</td>
              <td>{buttons(product)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  const ProductRow = React.memo(({ product }) => {
    const isOpen = openRows.has(product.id);

    return (
      <React.Fragment key={product.id}>
        <tr>
          <td className="text-center fw-bold">
            <Container>
              <Row>
                <Col xs={1} className="text-center p-0">
                  <Button
                    onClick={() => toggleRow(product.id)}
                    className="rounded-circle p-0 d-flex align-items-center justify-content-center"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    aria-expanded={isOpen}>
                      <FontAwesomeIcon
                        icon={isOpen ? faChevronUp : faChevronDown}
                        size="xs"
                      />
                  </Button>
                </Col>
                <Col xs={11} className="text-start p-0">
                  {product.name}
                </Col>
              </Row>
            </Container>
          </td>
        </tr>
        <Collapse in={isOpen}>
          <tr>
            <td className="p-0">
              <table className="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <td>
                      <b>Nombre</b>
                    </td>
                    <td>{product[KEYS.name]}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Descripción</b>
                    </td>
                    <td>{product[KEYS.description]}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Precio</b>
                    </td>
                    <td>{product[KEYS.price]}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Cantidad</b>
                    </td>
                    <td>{product[KEYS.quantity]}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Categoría</b>
                    </td>
                    <td>{product[KEYS.category]?.[KEYS.name]}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Acciones</b>
                    </td>
                    <td>
                      <td>{buttons(product)}</td>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </Collapse>
      </React.Fragment>
    );
  });

  return (
    <Table responsive bordered className="mobile-product-table">
      <tbody>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </tbody>
    </Table>
  );
}
