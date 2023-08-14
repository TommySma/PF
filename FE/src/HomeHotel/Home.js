import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import './Home.css';
import { Link } from "react-router-dom";
import render1 from "../imagenes/render1.jpg";
import render2 from "../imagenes/render2.jpg";
import render3 from "../imagenes/render3.jpg";
import fotoHeader from "../imagenes/haderImage.jpg";


const Home = () => {
  return (
    <div className="home-container"  >
    <header style={{ backgroundImage: `url(${fotoHeader})` }}>
      <div className="flex-container">
        <div><h1 className='textHeader2'>HOME</h1></div>
        <h2 style={{ textAlign: 'center' }}> PARAGUAY DEVELOPMENT</h2>
      </div>
    </header>

    <div className="container" style={{ backgroundColor: 'white', borderColor: 'transparent', alignItems:'center' }}>
      <div className='row'  >
        <div className="left-content" style={{ backgroundColor: 'transparent', marginTop:'15%'}}>
          <Link to="/App" className="custom-link">VER LISTA DE TAREAS</Link> 
        </div>
        <div className="image-container" style={{ borderColor: 'transparent' }}>
          <Carousel>
            <Carousel.Item>
              <img src={render1} alt="Imagen Rectangular" className="fotoCarusel" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={render2} alt="Imagen Rectangular" className="fotoCarusel" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={render3} alt="Imagen Rectangular" className="fotoCarusel" />
            </Carousel.Item>
          </Carousel>
        </div>
            <div className='col'  style={{maxWidth:'25%', marginTop:'15%'}}>
            <Link to="/Habitaciones" className="custom-link">VER HABITACIONES</Link>
          </div>
      </div>
    </div>

    <footer style={{ marginTop: '0%', height: '20px' }}>
      <p className='textFooter'>SAIRUKSIA TEAM</p>
    </footer>
  </div>
  );
};

export default Home;


