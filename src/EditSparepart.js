import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const EditSparepart = ({ sparepartId }) => {
    const [name, setName] = useState('');
    const [jumlahStok, setJumlahStok] = useState('');
    const [harga, setHarga] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSparepart();
    }, [sparepartId]);

    const fetchSparepart = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/spareparts/${sparepartId}`);
            const sparepart = response.data[0];
            setName(sparepart.name);
            setJumlahStok(sparepart.jumlah_stok);
            setHarga(sparepart.harga);
        } catch (error) {
            setError(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/spareparts/${sparepartId}`, {
                name: name,
                jumlah_stok: jumlahStok,
                harga: harga,
            });
            // Reset form fields
            setName('');
            setJumlahStok('');
            setHarga('');
        } catch (error) {
            setError(error);
        }
    };

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Edit Sparepart</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formJumlahStok">
                    <Form.Label>Jumlah Stok</Form.Label>
                    <Form.Control type="text" value={jumlahStok} onChange={(e) => setJumlahStok(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formHarga">
                    <Form.Label>Harga</Form.Label>
                    <Form.Control type="text" value={harga} onChange={(e) => setHarga(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </div>
    );
};

export default EditSparepart;
