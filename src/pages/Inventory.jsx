import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Overall } from "../components/products/Overall";
import Product from "../components/products/Product";
import { Products } from "../components/products/Products";
import NavBar from '../components/navBar/NavBar';

function Inventory() {
  const [showCreate, setShowCreate] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "Description 1",
      price: 10.0,
      quantity: 20,
      categoryId: 1,
      categoryName: "Category 1",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description 2",
      price: 20.0,
      quantity: 15,
      categoryId: 2,
      categoryName: "Category 2",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description 3",
      price: 30.0,
      quantity: 10,
      categoryId: 3,
      categoryName: "Category 3",
    },
  ]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
  ]);

  const modalCreate = (
    <Product
      show={showCreate}
      setShow={setShowCreate}
      canEdit={true}
      categories={categories}
    />
  );

  return (
    <>
      <NavBar />
      <Container className="py-2 px-3">
        <Row className="card py-3 px-2 mt-3">
          <Overall />
        </Row>
        <Row className="card py-3 px-2 mt-3">
          <Col xs={12} className="mb-3">
            <Row>
              <Col>
                <b>Productos</b>
              </Col>
              <Col className="text-end">
                <Button variant="primary" size="sm" onClick={() => setShowCreate(true)}>
                  Agregar producto
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Products products={products} />
          </Col>
        </Row>
      </Container>
      {modalCreate}
    </>
  );
}

export default Inventory