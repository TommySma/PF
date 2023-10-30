import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import './Reserva.css';
import { habitacionContext } from '../habitacionContext';
//import AgregarReserva from './AgregarReserva/AgregarReserva.js';
//import HotelServices from './services/HotelServices';  AGREGAR ESTOS DOS IMPORTS

const Reserva = () => {
  const [reservas, setReservas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const { estadoHabitacion, setEstadoHabitacion } = useContext(habitacionContext);

  // Función para manejar la creación de una nueva reserva
  const handleReservaCreada = (nuevaReserva) => {
    // Suponiendo que `reservas` es un array de reservas
    setReservas([...reservas, nuevaReserva]);
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = () => {
    axios
      .get('http://localhost:5000/Reserva')
      .then((response) => {
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

  const handleRoomStatusChange = (NroHabitacion, newStatus) => {
    setEstadoHabitacion((prevStatus) => ({
      ...prevStatus,
      [NroHabitacion]: newStatus,
    }));
  };

  const handleCheckIn = async (reserva) => {
    const newStatus = 'O'; // Cambiar el estado a 'O' (Check In)
    const idHabitacion = reserva.NroHabitacion;

    try {
      const result = await HotelServices.updateHab(idHabitacion, { Estado: newStatus });
      console.log('Resultado del update:', result);

      // Actualizar el estado local si la actualización en la base de datos fue exitosa
      if (result) {
        handleRoomStatusChange(reserva.NroHabitacion, newStatus);
      }
    } catch (error) {
      console.error('Error al realizar el check-in:', error);
    }
  };

  const handleCheckOut = async (reserva) => {
    const newStatus = 'L'; // Cambiar el estado a 'L' (Check Out)
    const idHabitacion = reserva.NroHabitacion;

    // Llamar a la función de actualización del servicio
    try {
      const result = await HotelServices.updateHab(idHabitacion, { Estado: newStatus });
      console.log('Resultado del update:', result);

      // Actualizar el estado local si la actualización en la base de datos fue exitosa
      if (result) {
        handleRoomStatusChange(reserva.NroHabitacion, newStatus);
      }
    } catch (error) {
      console.error('Error al realizar el check-out:', error);
    }
  };

  return (
    <div>
      <header style={{ backgroundColor: '#556B2F' }}>
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
            <h2 style={{ color: 'black' }}> RESERVAS</h2>
          </center>
        </div>
      </header>
      <div>
        {reservas.map((reserva) => (
          <div key={reserva.idReserva} className="reserva-card">
            <h3>Habitación {reserva.NroHabitacion}</h3>
            <p>Reserva: {`${reserva.nombre} ${reserva.apellido}`}</p>
            <div className="button-group">
              <button onClick={() => showReservaModal(reserva)} style={{backgroundColor:'#556B2F'}}>Ver más</button>
              <button onClick={() => handleCheckIn(reserva)} style={{backgroundColor:'#556B2F'}}>Check In</button>
              <button onClick={() => handleCheckOut(reserva)} style={{backgroundColor:'#556B2F'}}>Check Out</button>
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
            <Button variant="primary" style={{backgroundColor:'#556B2F', borderColor:'transparent'}}>Agregar Reserva</Button>
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
