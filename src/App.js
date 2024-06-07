import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListMotor from './ListMotor';
import ListSparepart from './ListSparepart';
import AddMotor from './AddMotor';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
    const [motors, setMotors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState('motor');

    useEffect(() => {
        fetchMotors();
    }, []);

    const fetchMotors = async () => {
        try {
            const response = await axios.get('https://backend-dot-kelompok-06.et.r.appspot.com/api/motors');
            setMotors(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'motor':
                return (
                    <div>
                        <ListMotor motors={motors} fetchMotors={fetchMotors} />
                    </div>
                );
            case 'sparepart':
                return (
                    <div>
                        <ListSparepart />
                    </div>
                );
            default:
                return (
                    <div>
                        <ListMotor motors={motors} fetchMotors={fetchMotors} />
                        <AddMotor fetchMotors={fetchMotors} />
                    </div>
                );
        }
    };

    return (
        <div className="App" style={{ padding: '20px' }}> {/* Tambahkan padding di sini */}
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">
                    <img
                        src={process.env.PUBLIC_URL + '/assets/lg.png'}
                        width="70"
                        height="70"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="mx-auto">
                        <Nav.Link onClick={() => setCurrentPage('motor')} className="nav-link">Motors</Nav.Link>
                        <Nav.Link onClick={() => setCurrentPage('sparepart')} className="nav-link">Spareparts</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {renderPage()}
        </div>
    );
}

export default App;
