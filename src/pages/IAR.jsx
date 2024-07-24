import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./IAR.css";
import iarimg from '../assets/iar.png';
import ikrapimg from '../assets/ikrap.png';
import perpanjanganimg from '../assets/perpanjangan.png';

const IAR = () => {
  return (
    <Container className="iar-section">
      <div>
        <div className="iar-header mb-4">
          <h1 className="iar-bg-title">IZIN AMATIR RADIO & IKRAP</h1>
        </div>
      </div>
      <Row className="align-items-center mb-5">
        <Col md={6} className="text-md-left mb-4 mb-md-0">
          <h2 className="iar-title text-left">Izin Amatir Radio</h2>
          <p className="iar-description text-left">Izin untuk mendirikan, memiliki, mengoperasikan stasiun amatir radio dan menggunakan frekuensi radio pada alokasi yang telah ditentukan untuk radio amatir di Indonesia</p>
          <Button className="iar-button">Lihat Selengkapnya &gt; </Button>
        </Col>
        <Col md={6} className="text-center">
          <img
            src={iarimg}
            alt="IAR"
            className="img-fluid"
          />
        </Col>
      </Row>
      <Row className="align-items-center mb-5">
        <Col md={6} className="order-md-2 text-md-right mb-4 mb-md-0">
          <h2 className="iar-title text-right">Izin Komunikasi Radio Antar Penduduk</h2>
          <p className="iar-description text-right">Izin untuk mendirikan, memiliki, mengoperasikan stasiun radio antar penduduk</p>
          <Button className="iar-button">Lihat Selengkapnya &gt; </Button>
        </Col>
        <Col md={6} className="order-md-1 text-center">
          <img
            src={ikrapimg}
            alt="IKRAP"
            className="img-fluid"
          />
        </Col>
      </Row>
      <Row className="text-center mb-5">
        <Col>
          <h2 className="iar-title text-center">Perpanjangan IAR dan IKRAP</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <img
            src={perpanjanganimg}
            alt="Perpanjangan"
            className="img-fluid iar-bottom-image"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default IAR;
