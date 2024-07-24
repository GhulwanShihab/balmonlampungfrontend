// src/pages/GaleriFoto.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './GaleriFoto.css';
import galerifoto1 from '../assets/elon.png';

const GaleriFoto = () => {
  // Contoh data foto, Anda bisa menggantinya dengan data dari API atau sumber lain
  const fotoData = [
    { id: 1, title: "Foto 1", image: galerifoto1 },
    { id: 2, title: "Foto 2", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Foto 3", image: "https://via.placeholder.com/150" },
    // Tambahkan data foto lainnya
  ];

  return (
    <>
    <div>
      <div className="galeri-foto-header mb-4">
        <h1 className="galeri-foto-title">GALERI FOTO</h1>
      </div>
    </div>
    <Container className="my-5 galeri-foto">
      <Row>
        {fotoData.map((foto) => (
          <Col md={4} key={foto.id}>
            <Card className="mb-4">
              <div className="card-img-wrapper">
                <Card.Img variant="top" src={foto.image} />
              </div>
              <Card.Body>
                <Card.Title>{foto.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>

  );
};

export default GaleriFoto;