import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Habitaciones from "./Habitaciones/Habitaciones";
import HomeHotel from "./HomeHotel/Home";
import Reserva from './Reserva/Reserva';
import AgregarReserva from './AgregarReserva/AgregarReserva';
import Tareas from './Tareas/Tareas';
import { habitacionContext } from './habitacionContext';

function App() {
  const [estadoHabitacion, setEstadoHabitacion] = useState('')

  return (
  <habitacionContext.Provider value={{estadoHabitacion, setEstadoHabitacion}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeHotel />} />
        <Route path="/Habitaciones" element={<Habitaciones />} />
        <Route path ="/Tareas" element ={< Tareas/>}/>
        <Route path ="/AgregarReserva" element ={< AgregarReserva/>}/>
        <Route path ="/Reserva" element ={< Reserva/>}/>
      </Routes>
    </BrowserRouter>
  </habitacionContext.Provider>
  )
}

export default App;


