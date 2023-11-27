import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';


const AgregarReserva = ({ ReservaCreada }) => {
  const navigate = useNavigate();
  const [habitaciones, setHabitaciones] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const[type, setType] = useState("");
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    fechaInicio: null,
    fechaFin: null,
    NroHabitacion: '',
    idReserva: ''
  });

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

  const handleCambiarType = () => setType("submit");
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setSelectedRoomId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("llegamos al boton submit!");
    axios
      .post('http://localhost:5000/reserva', formData)
      .then((response) => {
        console.log(response.data);
        setFormData({
          nombre: '',
          apellido: '',
          dni: '',
          fechaInicio: null,
          fechaFin: null,
          idHabitacion: '',
          idReserva: ''
        });
        let nuevaReserva = response.data;
        navigate('/Reserva', { state: { nuevaReserva } });
        //return ReservaCreada(response.data); // Suponiendo que el servidor devuelve la reserva creada
      }, error => alert("Ya existe una reserva para esa habitación en esa fecha!"))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <header style={{ backgroundColor:'#556B2F' }}>
        <div className="flex-container">
          <div>
            <h1 className="textHeader1">
              <b>
                <Link style={{ color: 'white' }} to="/Reserva">
                  ATRAS
                </Link>
              </b>
            </h1>
          </div>
          <center>
            <h2 style={{ Color: 'black' }}> AGREGAR RESERVAS</h2>
          </center>
        </div>
      </header>
      <body>
        <>
      <Form onSubmit={handleSubmit}>
        <ListGroup as="ol" numbered>
        <ListGroup.Item as="li">
          <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            </ListGroup.Item>

        <ListGroup.Item as="li">
          <Form.Group controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </Form.Group>
            </ListGroup.Item>



        <ListGroup.Item as="li">
          <Form.Group controlId="dni">
              <Form.Label>Número de Documento</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa tu número de documento"
                name="dni"
                value= {formData.dni} velue = {formData.dni}
                onChange={handleChange}
              />
            </Form.Group>
            </ListGroup.Item>
     
         
      <ListGroup.Item as="li">
      <Form.Group controlId="NroHabitacion">
              <Form.Label>Número de Habitacion</Form.Label>

              <Form.Select onChange={handleChange} name="idHabitacion" aria-label="Default select example">
                <option>Habitación...</option>
                { habitaciones.map(h => h.Estado === "R" ? <option value={null}>HABITACION FUERA DE SERVICIO</option> : <option value={h.idHabitacion}>{h.numeroHab }</option> ) }
              </Form.Select>
            </Form.Group>
      </ListGroup.Item>


      <ListGroup.Item as="li">
      <Form.Group controlId="fechaInicio">
              <Form.Label>Fecha de Inicio de Reserva</Form.Label>
              <DatePicker
                selected={formData.fechaInicio}
                onChange={(date) => handleDateChange(date, 'fechaInicio')}
                dateFormat="dd-MM-yyyy"
              />
            </Form.Group>
      </ListGroup.Item>
   

      <ListGroup.Item as="li">
      <Form.Group controlId="fechaFin">
              <Form.Label>Fecha de Fin de Reserva</Form.Label>
              <DatePicker
                selected={formData.fechaFin}
                onChange={(date) => handleDateChange(date, 'fechaFin')}
                dateFormat="dd-MM-yyyy"
              />
            </Form.Group>
      </ListGroup.Item>
      </ListGroup>


          { /*habitaciones.map(h => h.Estado === "R" ? handleShow() : handleCambiarType() ) */}

          <Button  variant="primary" type={ "submit"/*(type)*/}  style={{ backgroundColor: '#556B2F' }}>
              Guardar Reserva
            </Button>
          </Form>
        </>
      </body>

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


    </div>
  );
};

export default AgregarReserva;
