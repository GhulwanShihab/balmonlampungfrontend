// src/pages/GaleriVideo.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './GaleriVideo.css';

const GaleriVideo = () => {
  const videoData = [
    { id: 1, title: "Video 1", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 2, title: "Video 2", url: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
    { id: 3, title: "Video 3", url: "https://www.youtube.com/embed/tgbNymZ7vqY" },
    // Tambahkan data video lainnya sesuai kebutuhan
  ];

  return (
    <>
      <div>
        <div className="galeri-video-header mb-4">
          <h1 className="galeri-video-title">GALERI VIDEO</h1>
        </div>
      </div>
    <Container className="my-5 galeri-video">
      <Row>
        {videoData.map((video) => (
          <Col md={4} key={video.id}>
            <Card className="mb-4">
              <div className="card-video-wrapper">
                <iframe
                  width="100%"
                  height="200"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <Card.Body>
                <Card.Title>{video.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
    
  );
};

export default GaleriVideo;
