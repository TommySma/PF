import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import fotoHeader from '../imagenes/haderImage.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Habitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const handleClose = () => {
    setShow(false);
    setSelectedRoomId(null);
    setNewStatus('');
  };

  const handleShow = (roomId) => {
    setSelectedRoomId(roomId);
    setShow(true);
  };

  useEffect(() => {
    fetchHabitaciones();
  }, []);

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

  const changeRoomStatus = () => {
    if (selectedRoomId && newStatus) {
      axios
        .put(`http://localhost:5000/Habitacion/${selectedRoomId}`, {
          Estado: newStatus,
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

  return (
    <div>
      <header style={{ backgroundImage: `url(${fotoHeader})` }}>
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

      <div
        className="container"
        style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
      >
<div className="row">
        {habitaciones.map((habitacion) => (
          <div className="col-md-3 mb-4" key={habitacion.id}>
            <Card
              style={{
                width: '18rem',
                backgroundColor:
                  habitacion.Estado === 'L'
                    ? 'green'
                    : habitacion.Estado === 'R'
                    ? 'yellow'
                    : habitacion.Estado === 'O'
                    ? 'red'
                    : 'black',
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
                  onClick={() => handleShow(habitacion.id)}
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Estado de Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Seleccione el nuevo estado:</p>
          <Button
            variant="success"
            onClick={() => {
              setNewStatus('L');
              changeRoomStatus();
            }}
            style={{ margin: '5px' }}
          >
            Libre
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              setNewStatus('R');
              changeRoomStatus();
            }}
            style={{ margin: '5px' }}
          >
            Reservada
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setNewStatus('O');
              changeRoomStatus();
            }}
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

      <footer style={{ marginTop: '0%', height: '20px' }}>
        <p className="textFooter">SAIRUKSIA TEAM</p>
      </footer>
    </div>
  );
};

export default Habitaciones;