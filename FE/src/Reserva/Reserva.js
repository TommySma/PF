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
  const [habitaciones, setHabitaciones] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [show, setShow] = useState(false);
  const [reservas, setReservas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRoomTerm, setSearchRoomTerm] = useState();
  const [message, setMessage] = useState();
  const { estadoHabitacion, setEstadoHabitacion } = useContext(habitacionContext);
  const location = useLocation();


  const handleShow = () => setShow(true);

  const handleReservaCreada = (nuevaReserva) => {
    setReservas([...reservas, nuevaReserva]);
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = () => {
    axios
      .get('http://localhost:5000/reserva')
      .then((response) => {
        setReservas(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const fetchHabitaciones = () => {
    axios
      .get('http://localhost:5000/Habitacion')
      .then((response) => {
        console.log(response);
        setHabitaciones(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleClose = () => {
    setShow(false);
    setSelectedRoomId(null);
  };


  const deleteReserva = (idReserva) => {
    axios
      .delete(`http://localhost:5000/Reserva/${idReserva}`)
      .then((response) => {
        console.log("entro al reserva")
        fetchReservas(); 
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const changeRoomStatus = (newStatus) => {
    if (selectedRoomId && newStatus) {
      axios
        .put(`http://localhost:5000/habitacion`, {
          Estado: newStatus,
          id: selectedRoomId,
        })
        .then((response) => {
          console.log(response);
          fetchHabitaciones();
          handleClose();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };


  const showReservaModal = (reserva) => {
    setSelectedReserva(reserva);
    setShowModal(true);
  };

  const closeReservaModal = () => {
    setSelectedReserva(null);
    setShowModal(false);
  };

  const handleRoomStatusChange = (idHabitacion, newStatus) => {
    setEstadoHabitacion((prevStatus) => ({
      ...prevStatus,
      [idHabitacion]: newStatus,
    }));
  };

  const handleCheckIn = async (reserva) => {
    try {
      const newStatus = 'O';
      const idHabitacion = reserva.idHabitacion; 
      console.log(idHabitacion)
  
      
       await axios.put(`http://localhost:5000/habitacion/${idHabitacion}`, { Estado: newStatus }) ;
      
      
      const updatedReservas = reservas.map((r) =>
       r.idHabitacion === idHabitacion ? { ...r, Estado: newStatus } : r
      );
      setReservas(updatedReservas);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckOut = async (reserva) => {
    try {
      const newStatus = 'L';
      const idHabitacion = reserva.idHabitacion; 
      console.log(idHabitacion)
  
     
      await axios.put(`http://localhost:5000/habitacion/${idHabitacion}`, { Estado: newStatus });
  
      
      const updatedReservas = reservas.map((r) =>
        r.idHabitacion === idHabitacion ? { ...r, Estado: newStatus } : r
      );
      setReservas(updatedReservas);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchTermChange = (e) => {
    const { name, value } = e.target;
    if (name === 'searchTerm') {
      setSearchTerm(value);
    } /*else if (name === 'searchRoomTerm') {
      setSearchRoomTerm(value);
    }*/
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
          
        </div>
        {filterReservas().map((reserva) => (
          <div key={reserva.idReserva} className="reserva-card">
            <h3>Habitación {reserva.numeroHab}</h3>
            <p>Reserva: {`${reserva.nombre} ${reserva.apellido}`}</p>

            <p>{message}</p>
            <div className="button-group"> 
              <button onClick={() => showReservaModal(reserva)} style={{ backgroundColor: '#556B2F' }}>Ver más</button>
              <button disabled={ reserva.Estado === 'O' ? 'disabled' : false } onClick={() => reserva.Estado === 'L' ? handleCheckIn(reserva) : handleShow() } style={{ backgroundColor: '#556B2F' }}>Check In</button>
              <button disabled={ reserva.Estado === 'L' ? 'disabled' : false } onClick={() => reserva.Estado === 'O' ? handleCheckOut(reserva) : handleShow() } style={{ backgroundColor: '#556B2F' }}>Check Out</button>
             {/* <button
                      className="button Reserva-delete"
                      onClick={() => deleteReserva(reserva.idReserva)}
                      style={{width:'200px' ,backgroundColor: '#556B2F', color: 'white', display: 'inline-block', borderRadius: '15px', boxShadow: '9px 9px 9px #999', marginTop:'5px', marginLeft:'700px'}}
                    >
                      ELIMINAR
                    </button>*/}
            
            </div>
          </div>
        ))}



        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CHECK NO DISPONIBLE</Modal.Title>
        </Modal.Header>
        <Modal.Body>LA HABITACION ESTÁ FUERA DE SERVICIO</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>



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
