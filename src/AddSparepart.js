import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AddSparepart = ({ fetchSpareparts }) => {
    const [idMotor, setIdMotor] = useState('');
    const [name, setName] = useState('');
    const [jumlahStok, setJumlahStok] = useState('');
    const [harga, setHarga] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://backend-dot-kelompok-06.et.r.appspot.com/api/spareparts', {
                id_motor: idMotor,
                name: name,
                jumlah_stok: jumlahStok,
                harga: harga,
            });
            fetchSpareparts();
            setIdMotor('');
            setName('');
            setJumlahStok('');
            setHarga('');
        } catch (error) {
            console.error('There was an error adding the sparepart!', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}> {/* Tambahkan padding di sini */}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="formIdMotor">
                            <Form.Label>ID Motors:</Form.Label>
                            <Form.Control
                                type="text"
                                value={idMotor}
                                onChange={(e) => setIdMotor(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formJumlahStok">
                            <Form.Label>Jumlah Stok:</Form.Label>
                            <Form.Control
                                type="text"
                                value={jumlahStok}
                                onChange={(e) => setJumlahStok(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formHarga">
                            <Form.Label>Harga:</Form.Label>
                            <Form.Control
                                type="text"
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" style={{ marginTop: '10px'}}>
                    Add Sparepart
                </Button>
            </Form>
        </div>
    );
};

export default AddSparepart;
