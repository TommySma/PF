import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Reserva from '../Reserva/Reserva'; 


const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [roomStatus, setRoomStatus] = useState({});

  const handleClose = () => {
    setShow(false);
    setSelectedRoomId(null);
  };

  const handleShow = (roomId) => {
    setSelectedRoomId(roomId);
    setShow(true);
  };

  useEffect(() => {
    fetchHabitaciones();
  }, [roomStatus]);

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

  const handleRoomStatusChange = (roomId, newStatus) => {
    setRoomStatus(prevStatus => ({
      ...prevStatus,
      [roomId]: newStatus
    }));
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
            <h2 style={{ Color: 'black' }}> HABITACIONES</h2>
          </center>
        </div>
      </header>
      <body style={{backgroundColor: '#A9A9A9'}}>
        <div className="container" style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
          <div className="row">
            {habitaciones.map((habitacion) => (
              <div className="col-md-3 mb-4" key={habitacion.idHabitacion}>
                <Card
                  style={{
                    width: '18rem',
                    backgroundColor:
                      roomStatus[habitacion.idHabitacion] === 'C' ? '#8B0000' :
                      roomStatus[habitacion.idHabitacion] === 'O' ? '#556B2F' :
                      habitacion.Estado === 'L' ? '#556B2F' :
                      habitacion.Estado === 'R' ? '#EEE8AA' :
                      habitacion.Estado === 'O' ? '#8B0000' :
                      'black',
                    color: 'black',
                  }}
                >
                  <Card.Img variant="top" src={habitacion.Foto} />
                  <Card.Body>
                    <Card.Title>
                      <p>
                        Numero de la Habitacion:<br />{' '}
                        <center> {habitacion.numeroHab}</center>
                      </p>
                    </Card.Title>
                    <Button
                      variant="primary"
                      onClick={() => handleShow(habitacion.idHabitacion)}
                      style={{ margin: '5px' }}
                    >
                      Cambiar Estado
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </body>

      <Reserva handleRoomStatusChange={handleRoomStatusChange} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Estado de Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Seleccione el nuevo estado:</p>
          <Button
            variant="success"
            onClick={() => { changeRoomStatus('L');}}
            style={{ margin: '5px' }}
          >
            Libre
          </Button>
          <Button
            variant="warning"
            onClick={() => {changeRoomStatus('R');}}
            style={{ margin: '5px' }}
          >
            Reservada
          </Button>
          <Button
            variant="danger"
            onClick={() => { changeRoomStatus('O'); }}
            style={{ margin: '5px' }}
          >
            Ocupada
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <footer style={{ backgroundColor:'#556B2F' ,marginTop: '0%', height: '20px' }}>
        <p className="textFooter">TAREFF TEAM</p>
      </footer>
  
    </div>
  );
};

export default Habitaciones;
