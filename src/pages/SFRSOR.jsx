import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import './SFRSOR.css';

const SFRSOR = () => {
  const [selectedList, setSelectedList] = useState(null);
  const [expandedCards, setExpandedCards] = useState({}); // State untuk menyimpan kartu yang diperluas

  // Fungsi untuk menangani klik pada list
  const handleListClick = (index) => {
    setSelectedList(index);
    setExpandedCards({}); // Reset expanded cards when list changes
  };

  // Fungsi untuk menangani klik pada card
  const handleCardClick = (index) => {
    setExpandedCards((prevExpandedCards) => ({
      ...prevExpandedCards,
      [index]: !prevExpandedCards[index],
    }));
  };

  const cardsDataSFR = [
    {
      title: "Persyaratan SFR",
      description: (
        <ol>
          <li>Persyaratan 1 untuk SFR.</li>
          <li>Persyaratan 2 untuk SFR.</li>
          <li>Persyaratan 3 untuk SFR.</li>
        </ol>
      ),
    },
    {
      title: "Biaya SFR",
      description: <p>Informasi mengenai biaya untuk SFR.</p>,
    },
  ];

  const cardsDataSOR = [
    {
      title: "Persyaratan SOR",
      description: (
        <ol>
          <li>Persyaratan 1 untuk SOR.</li>
          <li>Persyaratan 2 untuk SOR.</li>
          <li>Persyaratan 3 untuk SOR.</li>
        </ol>
      ),
    },
    {
      title: "Biaya SOR",
      description: <p>Informasi mengenai biaya untuk SOR.</p>,
    },
  ];

  const renderCards = (cardsData) =>
    cardsData.map((card, index) => (
      <Col md={4} key={index} className="mb-4">
        <Card
          className="sfrsor-info-card"
          onClick={() => handleCardClick(index)}
        >
          <Card.Body className="sfrsor-card-body">
            <div className="sfrsor-card-title-wrapper">
              <Card.Title className="sfrsor-card-title">{card.title}</Card.Title>
            </div>
            {expandedCards[index] && (
              <Card.Text className="sfrsor-card-description">
                {card.description}
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      </Col>
    ));

  return (
    <Container>
      <div className="sfrsor-header mb-4">
        <h1 className="sfrsor-title">Layanan SFR dan SOR</h1>
      </div>
      <Row>
        <Col>
          <ListGroup horizontal>
            <ListGroup.Item action onClick={() => handleListClick(1)}>
              SFR
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => handleListClick(2)}>
              SOR
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {selectedList === 1 && (
            <>
              <h2>Informasi SFR</h2>
              <Row className="align-items-center mb-5">
                <Col md={6} className="text-md-left mb-4 mb-md-0">
                  <h2 className="sfrsor-title text-left">Langkah Permohonan SFR</h2>
                  <ol>
                    <li>Langkah 1 untuk permohonan SFR.</li>
                    <li>Langkah 2 untuk permohonan SFR.</li>
                    <li>Langkah 3 untuk permohonan SFR.</li>
                  </ol>
                </Col>
                <Col md={6} className="text-center">
                  <img />
                </Col>
              </Row>
              <Row className="justify-content-center mb-5">
                {renderCards(cardsDataSFR)}
              </Row>
            </>
          )}
          {selectedList === 2 && (
            <>
              <h2>Informasi SOR</h2>
              <Row className="align-items-center mb-5">
                <Col md={6} className="text-md-left mb-4 mb-md-0">
                  <h2 className="sfrsor-title text-left">Langkah Permohonan SOR</h2>
                  <ol>
                    <li>Langkah 1 untuk permohonan SOR.</li>
                    <li>Langkah 2 untuk permohonan SOR.</li>
                    <li>Langkah 3 untuk permohonan SOR.</li>
                  </ol>
                </Col>
                <Col md={6} className="text-center">
                  <img />
                </Col>
              </Row>
              <Row className="justify-content-center mb-5">
                {renderCards(cardsDataSOR)}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SFRSOR;
