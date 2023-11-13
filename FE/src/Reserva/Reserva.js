import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useLocation } from 'react-router-dom';
import './Reserva.css';
import { habitacionContext } from '../habitacionContext';
import AgregarReserva from '../AgregarReserva/AgregarReserva';

const Reserva = () => {
  const [reservas, setReservas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRoomTerm, setSearchRoomTerm] = useState('');
  const { estadoHabitacion, setEstadoHabitacion } = useContext(habitacionContext);
  const location = useLocation();

  const handleReservaCreada = (nuevaReserva) => {
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
        console.log(response.data);
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
    try {
      const newStatus = 'O';
      const idHabitacion = reserva.idHabitacion; // Asegúrate de que esta propiedad esté disponible en tu objeto reserva
  
      // Lógica para el Check In
      await axios.put(`http://localhost:5000/habitacion/${idHabitacion}`, { estadoReserva: newStatus });
  
      // Actualiza localmente el estado de la habitación (opcional)
      const updatedReservas = reservas.map((r) =>
        r.idHabitacion === idHabitacion ? { ...r, estadoReserva: newStatus } : r
      );
      setReservas(updatedReservas);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckOut = async (reserva) => {
    const newStatus = 'L'; 
    const idHabitacion = reserva.NroHabitacion;
    // Lógica para el Check Out
  };

  const handleSearchTermChange = (e) => {
    const { name, value } = e.target;
    if (name === 'searchTerm') {
      setSearchTerm(value);
    } else if (name === 'searchRoomTerm') {
      setSearchRoomTerm(value);
    }
  };

  const filterReservas = () => {
    let filteredReservas = [...reservas];

    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, 'i');
      filteredReservas = filteredReservas.filter(
        (reserva) =>
          searchRegex.test(reserva.nombre) ||
          searchRegex.test(reserva.apellido) ||
          searchRegex.test(reserva.dni)
      );
    }

    if (searchRoomTerm) {
      filteredReservas = filteredReservas.filter(
        (reserva) => reserva.NroHabitacion.toString() === searchRoomTerm
      );
    }

    return filteredReservas;
  };

  return (
    <>
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
        <div style={{ marginTop: '1%' }}>
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o DNI"
            name="searchTerm"
            value={searchTerm}
            onChange={handleSearchTermChange}
            style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '5px', borderColor: '#556B2F' }}
          />
          <input
            type="text"
            placeholder="Buscar por número de habitación"
            name="searchRoomTerm"
            value={searchRoomTerm}
            onChange={handleSearchTermChange}
            style={{ borderColor: '#556B2F' }}
          />
        </div>
        {filterReservas().map((reserva) => (
          <div key={reserva.idReserva} className="reserva-card">
            <h3>Habitación {reserva.NroHabitacion}</h3>
            <p>Reserva: {`${reserva.nombre} ${reserva.apellido}`}</p>
            <div className="button-group">
              <button onClick={() => showReservaModal(reserva)} style={{ backgroundColor: '#556B2F' }}>Ver más</button>
              <button onClick={() => handleCheckIn(reserva)} style={{ backgroundColor: '#556B2F' }}>Check In</button>
              <button onClick={() => handleCheckOut(reserva)} style={{ backgroundColor: '#556B2F' }}>Check Out</button>
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

        <Link to="/agregarReserva" className="custom-link btn btn-lg btn-primary" style={{ width: '330px', backgroundColor: '#556B2F', color: 'white', marginTop: '2%', marginBottom: '2%', marginLeft: '5px' }}>AGREGAR RESERVA</Link>

        <footer style={{ backgroundColor: '#556B2F', marginTop: '0%', height: '20px' }}>
          <p className="textFooter">TAREFF TEAM</p>
        </footer>
      </div>
    </>
  );
};

export default Reserva;
