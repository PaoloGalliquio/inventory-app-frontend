import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Overall } from "../components/products/Overall";
import Product from "../components/products/Product";
import { ProductsTable } from "../components/products/ProductsTable";
import NavBar from '../components/navBar/NavBar';
import { useManageGetRequest } from '../hooks/useManageRequest/useManageRequest';
import CreateProduct from '../components/products/CreateProduct';
import EditProduct from '../components/products/EditProduct';
import DetailProduct from '../components/products/DetailProduct';

function Inventory() {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [executeGet] = useManageGetRequest();

  const createModal = (
    <CreateProduct
      show={showCreate}
      setShow={setShowCreate}
      categories={categories}
    />
  );

  const editModal = (
    <EditProduct
      show={showEdit}
      setShow={setShowEdit}
      categories={categories}
      product={product}
      setProduct={setProduct}
    />
  );

  const detailModal = (
    <DetailProduct
      show={showDetail}
      setShow={setShowDetail}
      categories={categories}
      product={product}
      setProduct={setProduct}
    />
  );

  const deleteModal = (
    <></>
  );

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

  return (
    <>
      <NavBar />
      <Container className="py-2 px-3">
        <Row className="card py-3 px-2 mt-3">
          <Overall categories={categories} products={categories} />
        </Row>
        <Row className="card py-3 px-2 mt-3">
          <Col xs={12} className="mb-3">
            <Row>
              <Col>
                <b>Productos</b>
              </Col>
              <Col className="text-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowCreate(true)}>
                  Agregar producto
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <ProductsTable
              products={products}
              setProduct={setProduct}
              setShowDetail={setShowDetail}
              setShowEdit={setShowEdit}
              setShowDelete={setShowDelete}
            />
          </Col>
        </Row>
      </Container>
      {createModal}
      {editModal}
      {detailModal}
      {deleteModal}
    </>
  );
}

export default Inventory