import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { FaSchool, FaUsers, FaBuilding, FaIndustry, FaBriefcase, FaStore, FaImage } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Toast from '../../components/Toast';
import ConfirmationModal from '../../components/ConfirmationModal';
import Loading from '../../components/Loading';

const IARTable = () => {
    const { userId, token } = useContext(AuthContext);
    const [deskripsiData, setDeskripsiData] = useState({ file: null, title: '', deskripsi: '', url: '' });
    const [toast, setToast] = useState({ show: false, type: '', message: '' });
    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalAction, setModalAction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeskripsi = async () => {
            try {
                const response = await axios.get('http://localhost:3000/deskripsi', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const deskripsi = response.data;
                if (deskripsi) {
                    setDeskripsiData({ title: deskripsi.title, deskripsi: deskripsi.deskripsi, url: deskripsi.url });
                }
            } catch (error) {
                console.error('Error fetching IAR data:', error);
            }
        };
        fetchDeskripsi ();
    }, [token]);

    const handleFileChange = (e) => {
        setDeskripsiData({
            ...deskripsiData,
            file: e.target.files[0],
        });
    };

    const handleDeskripsiSubmit = (e) => {
        e.preventDefault();
        setModalTitle('Confirm Save');
        setModalMessage('Are you sure you want to save this IAR?');
        setModalAction(() => async () => {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append('file', deskripsiData.file);
                formDataToSend.append('title', deskripsiData.title);
                formDataToSend.append('deskripsi', deskripsiData.deskripsi);
                formDataToSend.append('url', deskripsiData.url);
                setLoading(true);
                console.log(formDataToSend);
                await axios.post(`http://localhost:3000/deskripsi`, formDataToSend, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setToast({ show: true, type: 'success', message: 'IAR updated successfully!' });
            } catch (error) {
                console.error('Error updating IAR:', error);
                setToast({ show: true, type: 'error', message: 'Failed to update IAR.' });
            }
            finally {
                setLoading(false);
            }
        });
        setModalShow(true);
    };

    return (
        <>
        
            <div className="container mt-5">
                <h1 className="text-center mb-4">Admin Dashboard</h1>

                <div className="card mb-4">
                    <div className="card-body">
                        <h2 className="card-title">Edit Home Page</h2>
                        <form onSubmit={handleDeskripsiSubmit}>
                            <div className="mb-3">
                                <label htmlFor="foto" className="form-label">
                                    Foto
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="form-control"
                                    placeholder="Enter foto"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={deskripsiData.title}
                                    onChange={(e) => setDeskripsiData({ ...deskripsiData, title: e.target.value })}
                                    className="form-control"
                                    placeholder="Enter title"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="deskripsi" className="form-label">
                                    Deskripsi
                                </label>
                                <textarea
                                    id="deskripsi"
                                    name="deskripsi"
                                    value={deskripsiData.deskripsi}
                                    onChange={(e) => setDeskripsiData({ ...deskripsiData, deskripsi: e.target.value })}
                                    className="form-control"
                                    rows="5"
                                    placeholder="Enter deskripsi"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="url" className="form-label">
                                    URL Tujuan
                                </label>
                                <input
                                    type="url"
                                    id="url"
                                    name="url"
                                    value={deskripsiData.url}
                                    onChange={(e) => setDeskripsiData({ ...deskripsiData, url: e.target.value })}
                                    className="form-control"
                                    placeholder="Enter URL"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {toast.show && <Toast type={toast.type} message={toast.message} />}
            <ConfirmationModal
                show={modalShow}
                title={modalTitle}
                message={modalMessage}
                onConfirm={modalAction}
                onCancel={() => setModalShow(false)}
            />
        </>
    );
};

export default IARTable;
