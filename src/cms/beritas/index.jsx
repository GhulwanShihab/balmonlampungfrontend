import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import ConfirmationModal from '../../components/ConfirmationModal';
import Toast from '../../components/Toast';
import Loading from '../../components/Loading';

const BeritasTable = () => {
    const [beritas, setBeritas] = useState([]);
    const { token } = useContext(AuthContext);
    const [selectedBerita, setSelectedBerita] = useState(null);
    const [toast, setToast] = useState({ show: false, type: '', message: '' });
    const [modalShow, setModalShow] = useState(false);
    const [toBeDeletedId, setToBeDeletedId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState({
        page: 1,
        limit: 10,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBeritas = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/beritas', { params: query });
                setBeritas(response.data.data);
            } catch (error) {
                console.error('Error fetching beritas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBeritas();
    }, [query]);

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:3000/beritas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const response = await axios.get('http://localhost:3000/beritas', { params: query });
            setBeritas(response.data.data);
            setToast({ show: true, type: 'success', message: 'Berita deleted successfully!' });
            setModalShow(false);
        } catch (error) {
            console.error('Error deleting berita:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteConfirmation = (id) => {
        setToBeDeletedId(id);
        setModalShow(true);
    };

    const handleCancelDelete = () => {
        setModalShow(false);
    };

    const handleRowClick = (berita) => {
        setSelectedBerita(berita);
    };

    const handleCloseDetail = () => {
        setSelectedBerita(null);
    };

    const handleCreateNew = () => {
        navigate('/admin/berita/create');
    };

    const handleEdit = (id) => {
        navigate(`/admin/berita/edit/${id}`);
    };

    const handleSearchChange = (event) => {
        setQuery({ ...query, search: event.target.value });
    };

    const handleSortChange = (event) => {
        setQuery({ ...query, sort: event.target.value });
    };

    const handleOrderChange = (event) => {
        setQuery({ ...query, order: event.target.value });
    };

    const handlePageChange = (newPage) => {
        setQuery({ ...query, page: newPage });
    };

    return (
        <>
            {loading && <Loading />}
            <div className="container my-4">
                <div className="d-flex justify-content-between mb-3">
                    <h2 className="h4">Beritas</h2>
                    <button
                        onClick={handleCreateNew}
                        className="btn btn-primary"
                    >
                        Create New
                    </button>
                </div>
                <div className="mb-3 d-flex">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query.search || ''}
                        onChange={handleSearchChange}
                        className="form-control me-2"
                    />
                    <select
                        value={query.sort || ''}
                        onChange={handleSortChange}
                        className="form-select me-2"
                    >
                        <option value="">Sort By...</option>
                        <option value="judulBerita">Judul</option>
                        <option value="tanggalBerita">Tanggal</option>
                        <option value="authorBerita">Author</option>
                        <option value="editorBerita">Editor</option>
                    </select>
                    <select
                        value={query.order || ''}
                        onChange={handleOrderChange}
                        className="form-select"
                    >
                        <option value="">Order...</option>
                        <option value="ASC">ASC</option>
                        <option value="DESC">DESC</option>
                    </select>
                </div>
                <table className="table table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Judul</th>
                            <th>Tanggal</th>
                            <th>Author</th>
                            <th>Editor</th>
                            <th>Foto Berita</th>
                            <th>Foto Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {beritas.map((berita) => (
                            <React.Fragment key={berita.id}>
                                <tr onClick={() => handleRowClick(berita)} style={{ cursor: 'pointer' }}>
                                    <td>{berita.judulBerita}</td>
                                    <td>{new Date(berita.tanggalBerita).toLocaleDateString()}</td>
                                    <td>{berita.authorBerita}</td>
                                    <td>{berita.editorBerita}</td>
                                    <td>
                                        <img src={`http://localhost:3000${berita.fotoBerita}`} alt="foto" className="img-thumbnail" style={{ width: '50px', height: '50px' }} />
                                    </td>
                                    <td>
                                        <img src={`http://localhost:3000${berita.fotoContent}`} alt="content" className="img-thumbnail" style={{ width: '50px', height: '50px' }} />
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteConfirmation(berita.id)}
                                            className="btn btn-danger btn-sm me-2"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleEdit(berita.id)}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                                {selectedBerita && selectedBerita.id === berita.id && (
                                    <tr className="table-secondary">
                                        <td colSpan="7">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h5>Details</h5>
                                                    <p><strong>Judul:</strong> {berita.judulBerita}</p>
                                                    <p><strong>Tanggal:</strong> {new Date(berita.tanggalBerita).toLocaleString()}</p>
                                                    <p><strong>Author:</strong> {berita.authorBerita}</p>
                                                    <p><strong>Editor:</strong> {berita.editorBerita}</p>
                                                    <ul>
                                                        {berita.deskripsiBerita.map((deskripsi, index) => (
                                                            <li key={index}>{deskripsi.str}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <button
                                                    onClick={handleCloseDetail}
                                                    className="btn btn-link text-decoration-none"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end mt-3">
                    <button
                        onClick={() => handlePageChange(query.page - 1)}
                        disabled={query.page <= 1}
                        className="btn btn-secondary me-2"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(query.page + 1)}
                        disabled={beritas.length < query.limit}
                        className="btn btn-secondary"
                    >
                        Next
                    </button>
                </div>
                <ConfirmationModal
                    show={modalShow}
                    title="Delete Berita"
                    message="Are you sure you want to delete this berita?"
                    onConfirm={() => handleDelete(toBeDeletedId)}
                    onCancel={handleCancelDelete}
                />
                <Toast
                    show={toast.show}
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast({ show: false, type: '', message: '' })}
                />
            </div>
        </>
    );
};

export default BeritasTable;
