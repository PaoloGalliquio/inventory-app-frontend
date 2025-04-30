import React from "react";
import { Col, Row } from "react-bootstrap";

export function Overall({ categories, products }) {
  const totalProducts = products.length;
  const totalCategories = categories.length;
  const lowStockProducts = products.filter(
    (product) => product.quantity < 5
  ).length;

  return (
    <Row>
      <Col className="border-end">
        <Row>
          <Col>
            <b>Categorías</b>
          </Col>
        </Row>
        <Row>
          <Col>{totalCategories}</Col>
        </Row>
      </Col>
      <Col className="border-end">
        <Row>
          <Col>
            <b>Total de productos</b>
          </Col>
        </Row>
        <Row>
          <Col>{totalProducts}</Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col>
            <b>Existencias bajas</b>
          </Col>
        </Row>
        <Row>
          <Col>{lowStockProducts}</Col>
        </Row>
      </Col>
    </Row>
  );
}
