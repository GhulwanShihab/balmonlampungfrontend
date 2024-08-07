import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo1 from '../assets/logo-kominfo.png';
import logo2 from '../assets/logo-sdppi.png';
import logo3 from '../assets/logo.png';

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <Row className="py-3 align-items-center">
          <Col md={4} className="d-flex align-items-center">
            <img
              src={logo1}
              alt="Logo 1"
              style={{ width: '100px', height: 'auto', marginRight: '10px' }}
            />
            <img
              src={logo2}
              alt="Logo 2"
              style={{ width: '140px', height: 'auto', marginRight: '10px' }}
            />
            <img
              src={logo3}
              alt="Logo 3"
              style={{ width: '130px', height: 'auto', marginRight: '10px' }}
            />
          </Col>
          <Col md={5} className="text-center">
            <h5 style={{ fontWeight: 'bold' }}>About Us</h5>
            <p style={{ textAlign: 'justify', fontSize: '0.875rem' }}>
              Bantu Kami Untuk Mewujudkan Zona Integritas menuju Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi dan Bersih Melayani (WBBM) di wilayah Balai Monitoring Spektrum Frekuensi Radio Kelas II Lampung
            </p>
          </Col>
          <Col md={3} className="text-end">
            <h5 style={{ marginBottom: '1rem' }}>Follow Us</h5>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook" style={{ fontSize: '20px', marginRight: '10px', color: '#007bff' }}></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-twitter" style={{ fontSize: '20px', marginRight: '10px', color: '#007bff' }}></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram" style={{ fontSize: '20px', marginRight: '10px', color: '#007bff' }}></i>
            </a>
          </Col>
        </Row>
      </Container>
      <div style={{ backgroundColor: 'darkblue', color: 'white', padding: '10px 0' }}>
        <Container>
          <Row>
            <Col className="text-center" style={{ fontSize: '0.875rem' }}>
              &copy; {new Date().getFullYear()} Balai Monitor Spektrum Frekuensi Kelas 2 Lampung
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
