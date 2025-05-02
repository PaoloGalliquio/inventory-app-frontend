import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Overall } from "../components/products/Overall";
import { ProductsTable } from "../components/products/ProductsTable";
import { useManageGetRequest } from '../hooks/useManageRequest/useManageRequest';
import CreateProduct from '../components/products/CreateProduct';
import ModalEnabled from '../components/modalEnabled/ModalEnabled';
import NavBar from '../components/navBar/NavBar';

function Inventory() {
  const [modalEnabled, setModalEnabled] = useState({ isEnable: false, component: React.Fragment });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [executeGet] = useManageGetRequest();

  const init = async () => {
    await executeGet("/api/Product", (response) => {
      setProducts(response.data);
    });
    await executeGet("/api/Category", (response) => {
      setCategories(response.data);
    });
  }

  useEffect(() => {
    init();
  }, []);

  const inventoryHeader = <Col xs={12} className="mb-3">
    <Row>
      <Col>
        <h4>Productos</h4>
      </Col>
      <Col className="text-end">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setModalEnabled({
              isEnable: true,
              component: CreateProduct,
              props: {
                categories,
              },
            });
          } }>
          Agregar producto
        </Button>
      </Col>
    </Row>
  </Col>;

  return (
    <>
      <NavBar />
      <ModalEnabled
        modalEnabled={modalEnabled}
        setModalEnabled={setModalEnabled}
        refreshPage={init}
      />
      <Container className="py-2 px-3">
        <Row className="border rounded py-3 px-2 mt-3">
          <Overall categories={categories} products={products} />
        </Row>
        <Row className="border rounded py-3 px-2 mt-3">
          {inventoryHeader}
          <Col>
            <ProductsTable
              products={products}
              categories={categories}
              setModalEnabled={setModalEnabled}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Inventory