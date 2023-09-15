import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import fotoHeader from './imagenes/haderImage.jpg';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get('http://localhost:5000/tarea')
      .then((response) => {
        console.log(response);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = () => {
    if (inputValue.trim() === '') {
      return; // Evitar agregar tareas vacías
    }

    axios
      .post('http://localhost:5000/tarea', {
        descripcion: inputValue,
        tachado: false, // Inicialmente, la tarea no está tachada
      })
      .then((response) => {
        console.log(response);
        fetchTasks(); // Actualiza la lista de tareas después de agregar una nueva
        setInputValue(''); // Limpia el campo de entrada
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:5000/tarea/${taskId}`)
      .then((response) => {
        console.log(response);
        // Aquí puedes decidir si deseas actualizar la lista de tareas después de la eliminación o no.
       fetchTasks(); // Descomenta esta línea si deseas actualizar la lista de tareas.
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const strikeTask = (taskId, isTachado) => {
    axios
      .put(`http://localhost:5000/tarea/${taskId}`, {
        tachado: !isTachado, // Invierte el estado de tachado
      })
      .then((response) => {
        console.log(response);
        fetchTasks(); // Actualiza la lista de tareas después de tachar/destachar una tarea
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
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
            <h2 style={{ color: 'black' }}> TAREAS</h2>
          </center>
        </div>
      </header>

      <div className="container">
        <input
          type="text"
          className="input-bar"
          placeholder="Ingrese una tarea (máx. 50 palabras)"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="button" onClick={addTask} style={{ marginLeft: '5%' }}>
          Agregar Tarea
        </button>
      </div>
      <br />

      <div className="container">
        <ul className="task-list">
          {tasks.map((task) => (
            <li className="task-item" key={task.IdTarea}>
              <input
                type="checkbox"
                className="task-checkbox"
                id={`checkbox-${task.IdTarea}`}
                onChange={() => strikeTask(task.IdTarea, task.tachado)}
                checked={task.tachado}
              />
              <span className={task.tachado ? 'task-text tachado' : 'task-text'}>
                {task.descripcion}
              </span>
              <button
                className="button task-delete"
                onClick={() => deleteTask(task.IdTarea)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <footer style={{ marginTop: '0%', height: '20px' }}>
        <p className="textFooter">SAIRUKSIA TEAM</p>
      </footer>
    </div>
  );
}

export default App;


