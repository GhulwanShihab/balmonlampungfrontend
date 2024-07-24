import React, { useState, useEffect } from "react";
import Header from '../assets/carousel1.png';
import { Link } from "react-router-dom";
import FloatingMenu from "../components/FloatingMenu";
import 'bootstrap/dist/css/bootstrap.min.css';

const ITEMS_PER_PAGE = 2;

const DaftarBerita = () => {
    const [datas, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/beritas')
            if (!response.ok) {
                throw new Error('Gagal mengambil data berita');
            }
            const data = await response.json();
            const newsData = data.data;
            setData(newsData);
        } catch (error) {
            console.error('Error fetching news:', error);
            setData([]);
        }
    };

    // Fungsi untuk menangani perubahan halaman
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Hitung total halaman
    const totalPages = Math.ceil(datas.length / ITEMS_PER_PAGE);

    // Hitung index item yang harus ditampilkan pada halaman saat ini
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = datas.slice(startIndex, endIndex);

    return (
        <>
            <div className="bg-light">
                <div className="container mt-5 pt-5">
                    <img className="img-fluid border border-white rounded mx-auto d-block" src={Header} alt="Header" />
                </div>
                <div className="container mt-5">
                    <div className="row">
                        {currentItems.map((data, index) => (
                            <div key={index} className="col-lg-4 col-md-6 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img className="card-img-top" src={`http://localhost:3000${data.fotoBerita}`} alt="Berita" />
                                    <div className="card-body">
                                        <h5 className="card-title text-truncate" title={data.judulBerita}>{data.judulBerita}</h5>
                                        <p className="card-text">Author: {data.authorBerita}</p>
                                        <p className="card-text">Tanggal Publish: {data.tanggalBerita}</p>
                                        <Link to={`/daftarberita/${data.id}`} className="btn btn-primary">Read more</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Pagination Controls */}
                <div className="d-flex justify-content-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn btn-primary mx-1"
                    >
                        Sebelumnya
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="btn btn-primary mx-1"
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>
            <FloatingMenu />
        </>
    );
};

export default DaftarBerita;
