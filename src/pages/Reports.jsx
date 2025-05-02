import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useManageDownloadRequest } from '../hooks/useManageRequest/useManageRequest';
import NavBar from '../components/navBar/NavBar';

function Reports() {
  const [executeDownload] = useManageDownloadRequest();

  const onReportExistenciasBajasExcel = async () => {
    await executeDownload(
      "/api/Product/GetProductsLowStockReportExcel",
      "ProductosBajoStock.xlsx",
      () => {}
    );
  };

  const onReportExistenciasBajasPDF = async () => {
    await executeDownload(
      "/api/Product/GetProductsLowStockReportPdf",
      "ProductosBajoStock.pdf",
      () => {}
    );
  };

  return (
    <>
      <NavBar />
      <Container className="py-2 px-3">
        <Row className="border rounded py-3 px-2 mt-3">
          <Col xs={12} className="mb-3">
            <Row>
              <Col>
                <h4>Reportes</h4>
              </Col>
            </Row>
          </Col>
          <Col xs={3}>
            <Card>
              <Card.Body>
                <Card.Title>Reporte de Existencias Bajas xlsx</Card.Title>
                <Card.Text>
                  Genera un reporte de los productos con existencias mejor a 5
                  en el inventario en Excel.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => onReportExistenciasBajasExcel()}>
                  Generar Reporte Excel
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={3}>
            <Card>
              <Card.Body>
                <Card.Title>Reporte de Existencias Bajas PDF</Card.Title>
                <Card.Text>
                  Genera un reporte de los productos con existencias mejor a 5
                  en el inventario en PDF.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => onReportExistenciasBajasPDF()}>
                  Generar Reporte PDF
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Reports