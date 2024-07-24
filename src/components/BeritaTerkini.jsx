import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BeritaTerkini = () => {
  const beritaData = [
    { id: 1, title: "Berita 1", date: "2023-07-01", text: "Deskripsi singkat tentang berita 1.", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Berita 2", date: "2023-07-02", text: "Deskripsi singkat tentang berita 2.", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Berita 3", date: "2023-07-03", text: "Deskripsi singkat tentang berita 3.", image: "https://via.placeholder.com/150" }
  ];

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h2>Berita Terkini</h2>
          <p>Deskripsi singkat tentang berita terkini.</p>
        </Col>
        <Col className="text-end">
          <Link to="/all-news">
            <Button variant="primary">Lihat Semua</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {beritaData.map((berita) => (
          <Col md={4} key={berita.id}>
            <Card className="mb-4">
              <Card.Img variant="top" src={berita.image} />
              <Card.Body>
                <Card.Title>
                  <Link to={`/news/${berita.id}`}>{berita.title}</Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{berita.date}</Card.Subtitle>
                <Card.Text>{berita.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BeritaTerkini;
