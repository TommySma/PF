import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import fotoHeader from "../imagenes/haderImage.jpg";

const Habitaciones = () => {
  const [Habitaciones, setHabitaciones] = useState([]);

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

      <footer style={{ marginTop: '0%', height: '20px' }}>
      <p className='textFooter'>SAIRUKSIA TEAM</p>
    </footer>
    </div>
  );
};

export default Habitaciones;
