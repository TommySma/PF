import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Habitaciones from "./Habitaciones/Habitaciones";
import HomeHotel from "./HomeHotel/Home";
import Reserva from './Reserva/Reserva';
import AgregarReserva from './AgregarReserva/AgregarReserva';
import Tareas from './Tareas/Tareas';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeHotel />} />
      <Route path="/Habitaciones" element={<Habitaciones />} />
      <Route path ="/Tareas" element ={< Tareas/>}/>
      <Route path ="/AgregarReserva" element ={< AgregarReserva/>}/>
      <Route path ="/Reserva" element ={< Reserva/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;


