import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import Toast from '../../components/Toast';
import ConfirmationModal from '../../components/ConfirmationModal';
import Loading from '../../components/Loading';

const CreateBerita = () => {
    const { userId, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        judulBerita: '',
        tanggalBerita: '',
        authorBerita: '',
        editorBerita: '',
        deskripsiBerita: [],
        file: null,
        file2: null,
        publishedAt: new Date().toISOString().slice(0, 16),
    });

    const [formErrors, setFormErrors] = useState({
        judulBerita: '',
        tanggalBerita: '',
        authorBerita: '',
        editorBerita: '',
        deskripsiBerita: '',
    });

    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalAction, setModalAction] = useState(null);
    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({ show: false, type: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setFormErrors({
            ...formErrors,
            [name]: '',
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
        setFormErrors({
            ...formErrors,
            [name]: '',
        });
    };

    const handleAddDescription = () => {
        const updatedDescriptions = [...formData.deskripsiBerita, ''];
        setFormData({
            ...formData,
            deskripsiBerita: updatedDescriptions,
        });
    };

    const handleDescriptionChange = (index, value) => {
        const updatedDescriptions = [...formData.deskripsiBerita];
        updatedDescriptions[index] = value;
        setFormData({
            ...formData,
            deskripsiBerita: updatedDescriptions,
        });
    };

    const handleRemoveDescription = (index) => {
        const updatedDescriptions = [...formData.deskripsiBerita];
        updatedDescriptions.splice(index, 1);
        setFormData({
            ...formData,
            deskripsiBerita: updatedDescriptions,
        });
    };

    const validateForm = () => {
        let valid = true;
        const errors = {
            judulBerita: '',
            tanggalBerita: '',
            authorBerita: '',
            editorBerita: '',
            deskripsiBerita: '',
        };

        if (!formData.judulBerita.trim()) {
            errors.judulBerita = 'Judul Berita harus diisi';
            valid = false;
        }
        if (!formData.tanggalBerita) {
            errors.tanggalBerita = 'Tanggal Berita harus diisi';
            valid = false;
        }
        if (!formData.authorBerita.trim()) {
            errors.authorBerita = 'Author Berita harus diisi';
            valid = false;
        }
        if (!formData.editorBerita.trim()) {
            errors.editorBerita = 'Editor Berita harus diisi';
            valid = false;
        }
        if (formData.deskripsiBerita.length === 0) {
            errors.deskripsiBerita = 'Deskripsi Berita harus diisi';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        setModalAction(() => async () => {
            try {
                setLoading(true);
                const formDataToSend = new FormData();
                formDataToSend.append('judulBerita', formData.judulBerita);
                formDataToSend.append('tanggalBerita', formData.tanggalBerita);
                formDataToSend.append('authorBerita', formData.authorBerita);
                formDataToSend.append('editorBerita', formData.editorBerita);
                formData.deskripsiBerita.forEach((deskripsi, index) => {
                    formDataToSend.append(`deskripsiBerita[${index}]`, deskripsi);
                });
                formDataToSend.append('file', formData.file);
                formDataToSend.append('file2', formData.file2);
                formDataToSend.append('publishedAt', formData.publishedAt);

                await axios.post(`http://localhost:3000/beritas/${userId}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });

                navigate('/admin/berita');
                setToast({ show: true, type: 'success', message: 'Berita berhasil dibuat' });
            } catch (error) {
                console.error('Error creating news article:', error);
                setToast({ show: true, type: 'error', message: 'Terjadi kesalahan saat membuat berita' });
            }
            finally {
                setLoading(false);
            }
        });
        setModalTitle('Konfirmasi');
        setModalMessage('Apakah Anda yakin ingin membuat berita ini?');
        setModalShow(true);
    };

    return (<>
        {loading && <Loading />}
        <div className="container py-5 mt-5">
            <h1 className="text-center mb-4">Create News Article</h1>
            <form onSubmit={handleSubmit} className="mx-auto p-4 bg-white rounded-lg shadow-sm border" style={{ maxWidth: '600px' }}>
                <div className="mb-3">
                    <label htmlFor="judulBerita" className="form-label">Judul Berita</label>
                    <input
                        type="text"
                        id="judulBerita"
                        name="judulBerita"
                        value={formData.judulBerita}
                        onChange={handleChange}
                        className={`form-control ${formErrors.judulBerita ? 'is-invalid' : ''}`}
                        placeholder="Masukkan judul"
                    />
                    {formErrors.judulBerita && <div className="invalid-feedback">{formErrors.judulBerita}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="tanggalBerita" className="form-label">Tanggal Berita</label>
                    <input
                        type="date"
                        id="tanggalBerita"
                        name="tanggalBerita"
                        value={formData.tanggalBerita}
                        onChange={handleChange}
                        className={`form-control ${formErrors.tanggalBerita ? 'is-invalid' : ''}`}
                    />
                    {formErrors.tanggalBerita && <div className="invalid-feedback">{formErrors.tanggalBerita}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="authorBerita" className="form-label">Author Berita</label>
                    <input
                        type="text"
                        id="authorBerita"
                        name="authorBerita"
                        value={formData.authorBerita}
                        onChange={handleChange}
                        className={`form-control ${formErrors.authorBerita ? 'is-invalid' : ''}`}
                        placeholder="Masukkan nama author"
                    />
                    {formErrors.authorBerita && <div className="invalid-feedback">{formErrors.authorBerita}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="editorBerita" className="form-label">Editor Berita</label>
                    <input
                        type="text"
                        id="editorBerita"
                        name="editorBerita"
                        value={formData.editorBerita}
                        onChange={handleChange}
                        className={`form-control ${formErrors.editorBerita ? 'is-invalid' : ''}`}
                        placeholder="Masukkan nama editor"
                    />
                    {formErrors.editorBerita && <div className="invalid-feedback">{formErrors.editorBerita}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Deskripsi Berita</label>
                    {formData.deskripsiBerita.map((deskripsi, index) => (
                        <div key={index} className="input-group mb-2">
                            <textarea
                                id={`deskripsiBerita${index}`}
                                name="deskripsiBerita"
                                value={deskripsi}
                                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                className="form-control"
                                rows="3"
                                placeholder={`Masukkan deskripsi ${index + 1}`}
                            ></textarea>
                            <button
                                type="button"
                                onClick={() => handleRemoveDescription(index)}
                                className="btn btn-danger"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddDescription}
                        className="btn btn-primary"
                    >
                        Add Deskripsi
                    </button>
                    {formErrors.deskripsiBerita && <div className="text-danger">{formErrors.deskripsiBerita}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Upload Image</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                        className={`form-control ${formErrors.file ? 'is-invalid' : ''}`}
                    />
                    {formErrors.file && <div className="invalid-feedback">{formErrors.file}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="file2" className="form-label">Upload Image 2</label>
                    <input
                        type="file"
                        id="file2"
                        name="file2"
                        onChange={handleFileChange}
                        className={`form-control ${formErrors.file2 ? 'is-invalid' : ''}`}
                    />
                    {formErrors.file2 && <div className="invalid-feedback">{formErrors.file2}</div>}
                </div>
                <button type="submit" className="btn btn-success w-100">Submit</button>
            </form>
            <ConfirmationModal
                show={modalShow}
                title={modalTitle}
                message={modalMessage}
                onConfirm={() => {
                    setModalShow(false);
                    modalAction && modalAction();
                }}
                onCancel={() => setModalShow(false)}
            />
            <Toast
                show={toast.show}
                type={toast.type}
                message={toast.message}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    </>);
};

export default CreateBerita;
