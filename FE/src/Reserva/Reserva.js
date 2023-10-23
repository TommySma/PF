import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import fotoHeader from '../imagenes/haderImage.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import './Reserva.css';


const Reserva = (props) => {
    const [reservas, setReservas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);


    const newReserva = props.location.state ? props.location.state.newReserva : null;

    useEffect(() => {
        fetchReservas();
    }, []);

    const fetchReservas = () => {
        axios
            .get('http://localhost:5000/Reserva')
            .then((response) => {
                console.log(response);
                setReservas(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const showReservaModal = (reserva) => {
        setSelectedReserva(reserva);
        setShowModal(true);
    };

    const closeReservaModal = () => {
        setSelectedReserva(null);
        setShowModal(false);
    };

    return (
       <div>
                <header style={{ backgroundColor:'#556B2F' }}>
        <div className="flex-container">
          <div>
            <h1 className="textHeader1">
              <b>
                <Link style={{ color: 'white' }} to="/">
                  HOME
                </Link>
              </b>
            </h1>
          </div>
          <center>
            <h2 style={{ Color: 'black' }}> RESERVAS</h2>
          </center>
        </div>
      </header>
            <div>
                    {reservas.map((reserva) => (
                        <div key={reserva.idReserva} className="reserva-card">
                            <h3>Habitación {reserva.NroHabitacion}</h3>
                            <p>Reserva: {`${reserva.nombre} ${reserva.apellido}`}</p>
                            <div className="button-group">
                                <button onClick={() => showReservaModal(reserva)}>Ver más</button>
                                <button>Check In</button>
                                <button>Check Out</button>
                            </div>
                        </div>
                    ))}

                    <Modal show={showModal} onHide={closeReservaModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Detalles de la Reserva</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Nombre: {selectedReserva && `${selectedReserva.nombre} ${selectedReserva.apellido}`}</p>
                            <p>Fecha de Inicio: {selectedReserva && selectedReserva.fechaInicio}</p>
                            <p>Fecha de Fin: {selectedReserva && selectedReserva.fechaFin}</p>
                            <p>Habitación: {selectedReserva && selectedReserva.NroHabitacion}</p>
                            <p>dni: {selectedReserva && selectedReserva.dni}</p>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeReservaModal}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="text-center mt-4">
                        <Link to="/AgregarReserva">
                             <Button variant="primary">Agregar Reserva</Button>
                        </Link>
                    </div>

                    <footer style={{ backgroundColor: '#556B2F', marginTop: '0%', height: '20px' }}>
                        <p className="textFooter">TAREFF TEAM</p>
                    </footer>
                </div>
        </div>        
    );
};


export default Reserva;
