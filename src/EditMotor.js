import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const EditMotor = ({ match }) => {
    const [typeMotor, setTypeMotor] = useState('');
    const [namaMotor, setNamaMotor] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchMotor = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/motors/${match.params.id}`);
                const motor = response.data[0];
                setTypeMotor(motor.type_motor);
                setNamaMotor(motor.nama_motor);
            } catch (error) {
                console.error('There was an error fetching the motor!', error);
            }
        };

        fetchMotor();
    }, [match.params.id]);

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:5000/api/motors/${match.params.id}`, {
                type_motor: typeMotor,
                nama_motor: namaMotor,
            });
            history.push('/'); // Redirect ke halaman utama setelah berhasil menyimpan
        } catch (error) {
            console.error('There was an error updating the motor!', error);
        }
    };

    return (
        <div>
            <h1>Edit Motor</h1>
            <Form>
                <Form.Group controlId="formEditTypeMotor">
                    <Form.Label>Type Motor</Form.Label>
                    <Form.Control type="text" value={typeMotor} onChange={(e) => setTypeMotor(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formEditNamaMotor">
                    <Form.Label>Nama Motor</Form.Label>
                    <Form.Control type="text" value={namaMotor} onChange={(e) => setNamaMotor(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
            </Form>
        </div>
    );
};

export default EditMotor;
