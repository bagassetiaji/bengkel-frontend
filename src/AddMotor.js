import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AddMotor = ({ fetchMotors }) => {
    const [typeMotor, setTypeMotor] = useState('');
    const [namaMotor, setNamaMotor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://backend-dot-kelompok-06.et.r.appspot.com/api/motors', {
                type_motor: typeMotor,
                nama_motor: namaMotor,
            });
            fetchMotors();
            setTypeMotor('');
            setNamaMotor('');
        } catch (error) {
            console.error('There was an error adding the motor!', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}> {/* Tambahkan padding di sini */}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="formTypeMotor">
                            <Form.Label>Type Motors:</Form.Label>
                            <Form.Control
                                type="text"
                                value={typeMotor}
                                onChange={(e) => setTypeMotor(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formNamaMotor">
                            <Form.Label>Nama Motors:</Form.Label>
                            <Form.Control
                                type="text"
                                value={namaMotor}
                                onChange={(e) => setNamaMotor(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                    Add Motor
                </Button>
            </Form>
        </div>
    );
};

export default AddMotor;
