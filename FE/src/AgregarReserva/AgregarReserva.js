import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AgregarReserva = ({ ReservaCreada }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    fechaInicio: null,
    fechaFin: null,
    NroHabitacion: '',
    idReserva: ''
  });

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
          NroHabitacion: '',
          idReserva: ''
        });
        let nuevaReserva = response.data;
        navigate('/Reserva', { state: { nuevaReserva } });
        //return ReservaCreada(response.data); // Suponiendo que el servidor devuelve la reserva creada
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <header style={{ backgroundColor: '#556B2F' }}>
        <div className="flex-container">
          <div></div>
          <center>
            <h2 style={{ color: 'black' }}> RESERVA</h2>
          </center>
        </div>
      </header>
      <body>
        <>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group controlId="dni">
              <Form.Label>Número de Documento</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa tu número de documento"
                name="documento"
                value= {formData.dni} velue = {formData.dni}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="NroHabitacion">
              <Form.Label>Número de Habitacion</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa tu número de Habitacion"
                name="NroHabitacion"
                value={formData.NroHabitacion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="fechaInicio">
              <Form.Label>Fecha de Inicio de Reserva</Form.Label>
              <DatePicker
                selected={formData.fechaInicio}
                onChange={(date) => handleDateChange(date, 'fechaInicio')}
                dateFormat="dd-MM-yyyy"
              />
            </Form.Group>

            <Form.Group controlId="fechaFin">
              <Form.Label>Fecha de Fin de Reserva</Form.Label>
              <DatePicker
                selected={formData.fechaFin}
                onChange={(date) => handleDateChange(date, 'fechaFin')}
                dateFormat="dd-MM-yyyy"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Guardar Reserva
            </Button>
          </Form>
        </>
      </body>
    </div>
  );
};

export default AgregarReserva;
