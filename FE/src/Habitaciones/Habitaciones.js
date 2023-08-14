import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import fotoHeader from "../imagenes/haderImage.jpg";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Habitaciones = () => {
  const [Habitaciones, setHabitaciones] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get('http://localhost:5000/Habitacion')
      .then((response) => {
        console.log(response);
        setHabitaciones(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

  const addHab = (index) => {
    Habitaciones[index] = (inputValue);
    const insertHab = [...Habitaciones];
    setHabitaciones(insertHab);
    axios.post('http://localhost:5000/Habitacion/' + Habitaciones[index].idHabitacion)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <header style={{ backgroundImage: `url(${fotoHeader})` }}>
      <div className="flex-container">
        <div><h1 className="textHeader1"><b><Link style={{color:'white'}} to="/">HOME</Link></b></h1></div>
        <center><h2 style={{  Color:'black' }}> HABITACIONES</h2></center>
      </div>
    </header>

      <div className="container" style={{backgroundColor:'transparent', borderColor:'transparent'}}>
        <div className="row">

          {Habitaciones.map((Habitacion) => (
            <div className="col-md-3 mb-4" key={Habitacion.id}>
              <Card style={{ width: '18rem', backgroundColor:Habitacion.Estado === 'L' ? 'green' : Habitacion.Estado === 'R' ? 'yellow' : Habitacion.Estado === 'O' ? 'red' : 'black', color:'black' }}>
                <Card.Img variant="top" src= {Habitacion.Foto} />
                <Card.Body>
                  <Card.Title><p>Numero de la Habitacion:<br/> <center> {Habitacion.numeroHab}</center></p></Card.Title>
                  <Card.Text>
                    
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <center><Button variant="primary" onClick={handleShow} style={{padding:'1%', marginBottom:'5%'}}> AGREGAR HABITACION</Button></center>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Complete los datos de la habitacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ingrese</Form.Label>
              <Form.Control
                type="text" className="input-bar" placeholder="Ingrese una tarea (máx. 50 palabras)" value={inputValue} onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="button" onClick={addHab} style={{marginLeft:'5%'}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <footer style={{ marginTop: '0%', height: '20px' }}>
      <p className='textFooter'>SAIRUKSIA TEAM</p>
    </footer>
    </div>
  );
};

export default Habitaciones;
