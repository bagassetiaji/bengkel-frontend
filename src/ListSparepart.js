import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import AddSparepart from "./AddSparepart"; // Import komponen AddSparepart

const ListSparepart = () => {
    const [spareparts, setSpareparts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [editName, setEditName] = useState('');
    const [editJumlahStok, setEditJumlahStok] = useState('');
    const [editHarga, setEditHarga] = useState('');

    useEffect(() => {
        fetchSpareparts();
    }, []);

    const fetchSpareparts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/spareparts");
            setSpareparts(response.data);
        } catch (error) {
            console.error('There was an error fetching the spareparts!', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/spareparts/${id}`);
            fetchSpareparts();
        } catch (error) {
            console.error('There was an error deleting the sparepart!', error);
        }
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditId('');
        setEditName('');
        setEditJumlahStok('');
        setEditHarga('');
    };

    const handleShowEditModal = (sparepart) => {
        setEditId(sparepart.id);
        setEditName(sparepart.name);
        setEditJumlahStok(sparepart.jumlah_stok);
        setEditHarga(sparepart.harga);
        setShowEditModal(true);
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:5000/api/spareparts/${editId}`, {
                name: editName,
                jumlah_stok: editJumlahStok,
                harga: editHarga,
            });
            fetchSpareparts();
            handleCloseEditModal();
        } catch (error) {
            console.error('There was an error updating the sparepart!', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}> {/* Tambahkan padding di sini */}
            <h1>List of Spareparts</h1>
            {/* Form tambah sparepart */}
            <AddSparepart fetchSpareparts={fetchSpareparts} />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID_Motor</th>
                        <th>Name</th>
                        <th>Jumlah Stok</th>
                        <th>Harga</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {spareparts.map((sparepart) => (
                            <tr key={sparepart.id}>
                            <td>{sparepart.id}</td>  
                            <td>{sparepart.id_motor}</td>
                            <td>{sparepart.name}</td>
                            <td>{sparepart.jumlah_stok}</td>
                            <td>{sparepart.harga}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShowEditModal(sparepart)} style={{ marginRight: '10px' }}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(sparepart.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Sparepart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEditName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formEditJumlahStok">
                            <Form.Label>Jumlah Stok</Form.Label>
                            <Form.Control type="text" value={editJumlahStok} onChange={(e) => setEditJumlahStok(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formEditHarga">
                            <Form.Label>Harga</Form.Label>
                            <Form.Control type="text" value={editHarga} onChange={(e) => setEditHarga(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
                    <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ListSparepart;
