import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import iconCal from "../assets/calendar.png";
import iconAuth from "../assets/writer.png";
import FloatingMenu from '../components/FloatingMenu';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

const BeritaDetail = () => {
    const { id } = useParams();
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/beritas/${id}`);
                if (!response.ok) {
                    throw new Error('Gagal mengambil data berita');
                }
                const data = await response.json();
                setNewsData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!newsData) {
        return <p>Event tidak ditemukan</p>;
    }

    return (
        <>
            <div className="bg-gray-200">
                <Container className="mt-5">
                    <Card className="shadow-lg p-4 mb-4">
                        <Card.Body>
                            <h1 className="font-weight-bold mb-3">{newsData.judulBerita}</h1>
                            <Row className="mb-4">
                                <Col xs={6} className="d-flex align-items-center">
                                    <Image src={iconCal} alt="calendar icon" className="mr-2" />
                                    <span>{newsData.tanggalBerita}</span>
                                </Col>
                                <Col xs={6} className="d-flex align-items-center">
                                    <Image src={iconAuth} alt="author icon" className="mr-2" />
                                    <span>{newsData.authorBerita}</span>
                                </Col>
                            </Row>
                            <Image src={`http://localhost:3000${newsData.fotoBerita}`} className="w-100 mb-4" alt="news" />
                            <div>
                                {newsData.deskripsiBerita.map((item, index) => (
                                    <p key={index} className="text-justify mb-3">{item.str}</p>
                                ))}
                                <Image src={`http://localhost:3000${newsData.fotoContent}`} className="w-100 mb-4" alt="content" />
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
            <FloatingMenu />
        </>
    );
};

export default BeritaDetail;
