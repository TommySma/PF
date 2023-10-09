import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './Home.css';
import { Link } from "react-router-dom";
import render3 from "../imagenes/render3.jpg";
import fotoHeader from "../imagenes/haderImage.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <header style={{ backgroundColor: '#556B2F' }}>
        <div className="flex-container">
          <div><h1 className='textHeader2'>HOME</h1></div>
          <h2 style={{ textAlign: 'center' }}> PARAGUAY DEVELOPMENT</h2>
        </div>
      </header>

      <div className="container" style={{ backgroundColor: 'transparent', borderColor: 'transparent', position: 'relative' }}>
        <div className='row'>
          <div className="left-content col-md-6" style={{ backgroundColor: 'transparent', marginTop: '15%' }}>
            <Link to="/App" className="custom-link btn btn-lg btn-primary" style={{width:'300px' ,backgroundColor: '#556B2F', color: 'white', marginBottom: '17px' }}>VER LISTA DE TAREAS</Link>
            <Link to="/Habitaciones" className="custom-link btn btn-lg btn-primary" style={{width:'300px' ,backgroundColor: '#556B2F', color: 'white', marginTop:'60%' }}>VER HABITACIONES</Link>
            <Link to="/Reserva" className="custom-link btn btn-lg btn-primary" style={{width:'300px' ,backgroundColor: '#556B2F', color: 'white', marginTop:'60%' }}>VER RESERVA</Link>

          </div>
          <div className="image-container col-md-6" style={{ borderColor: 'transparent', position: 'absolute', top: '0', right: '0', bottom: '0', left: '0', marginLeft: '72%' }}>
            <img src={render3} alt="Imagen Rectangular" className="fotoCarusel" style={{ width: '100%', height: '100%', objectFit: 'cover', marginLeft: '0%' }} />
          </div>
        </div>
      </div>

      <footer style={{ backgroundColor:'#556B2F'  ,marginTop: '0%', height: '20px' }}>
        <p className='textFooter'>SAIRUKSIA TEAM</p>
      </footer>
    </div>
  );
};

export default Home;
