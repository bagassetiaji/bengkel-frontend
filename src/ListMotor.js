import React, { useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import AddMotor from './AddMotor'; // Import komponen AddMotor

const ListMotor = ({ motors, fetchMotors }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [editTypeMotor, setEditTypeMotor] = useState('');
    const [editNamaMotor, setEditNamaMotor] = useState('');

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://backend-dot-kelompok-06.et.r.appspot.com/api/motors/${id}`);
            fetchMotors();
        } catch (error) {
            console.error('There was an error deleting the motor!', error);
        }
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditId('');
        setEditTypeMotor('');
        setEditNamaMotor('');
    };

    const handleShowEditModal = (motor) => {
        setEditId(motor.id);
        setEditTypeMotor(motor.type_motor);
        setEditNamaMotor(motor.nama_motor);
        setShowEditModal(true);
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`https://backend-dot-kelompok-06.et.r.appspot.com/api/motors/${editId}`, {
                type_motor: editTypeMotor,
                nama_motor: editNamaMotor,
            });
            fetchMotors();
            handleCloseEditModal();
        } catch (error) {
            console.error('There was an error updating the motor!', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}> {/* Tambahkan padding di sini */}
            <h1>List of Motors</h1>
            {/* Form tambah motor */}
            <AddMotor fetchMotors={fetchMotors} />
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type Motors</th>
                        <th>Nama Motors</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {motors.map((motor) => (
                        <tr key={motor.id}>
                            <td>{motor.id}</td>
                            <td>{motor.type_motor}</td>
                            <td>{motor.nama_motor}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShowEditModal(motor)} style={{ marginRight: '10px' }}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(motor.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Motors</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEditTypeMotor">
                            <Form.Label>Type Motors</Form.Label>
                            <Form.Control type="text" value={editTypeMotor} onChange={(e) => setEditTypeMotor(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formEditNamaMotor">
                            <Form.Label>Nama Motors</Form.Label>
                            <Form.Control type="text" value={editNamaMotor} onChange={(e) => setEditNamaMotor(e.target.value)} />
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

export default ListMotor;
