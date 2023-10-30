import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AgregarReserva = ({ ReservaCreada }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    fechaInicio: '',
    fechaFin: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    ReservaCreada(formData);
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
            <h2 style={{ Color: 'black' }}> RESERVA</h2>
          </center>
        </div>
      </header>
      <body>
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

          <Form.Group controlId="documento">
            <Form.Label>Número de Documento</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresa tu número de documento"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
            />
          </Form.Group>

          
          

          <Form.Group controlId="fechaInicio">
            <Form.Label>Fecha de Inicio de Reserva</Form.Label>
            <Form.Control
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="fechaFin">
            <Form.Label>Fecha de Fin de Reserva</Form.Label>
            <Form.Control
              type="date"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Guardar Reserva
          </Button>
        </Form>
      </body>
    </div>
  );
};

export default AgregarReserva;
