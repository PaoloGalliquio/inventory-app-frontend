import React from "react";
import { Col, Row } from "react-bootstrap";

export function Overall() {
  return (
    <Row>
      <Col className="border-end">
        <Row>
          <Col>
            <b>Categorías</b>
          </Col>
        </Row>
        <Row>
          <Col>3</Col>
        </Row>
      </Col>
      <Col className="border-end">
        <Row>
          <Col>
            <b>Total de productos</b>
          </Col>
        </Row>
        <Row>
          <Col>10</Col>
          <Col>S/ 5000</Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col>
            <b>Existencias bajas</b>
          </Col>
        </Row>
        <Row>
          <Col>3</Col>
        </Row>
      </Col>
    </Row>
  );
}
