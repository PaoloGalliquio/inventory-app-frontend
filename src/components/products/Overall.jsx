import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { formatCurrency } from "../../helper/utils";
import { useManagePostRequest } from "../../hooks/useManageRequest/useManageRequest";

export function Overall({ categories, products }) {
  const [isLoading, setIsLoading] = useState(false);
  const [executePost] = useManagePostRequest();

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const lowStockProducts = products.filter(
    (product) => product.Quantity < 5
  ).length;
  const totalStockValue = formatCurrency(products.reduce(
    (acc, product) => acc + product.Quantity * product.Price,
    0
  ));

  const onNotify = async () => {
    setIsLoading(true);
    await executePost(
      "/api/Notification/SendLowStockNotification",
      {},
      () => {}
    );
  };

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
          <Col className="border-end">{totalProducts}</Col>
          <Col>S/ {totalStockValue}</Col>
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
          <Col>
            {lowStockProducts > 1 && (
              <Button
                disabled={isLoading}
                onClick={() => {
                  onNotify();
                }}>
                Notificar
              </Button>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
