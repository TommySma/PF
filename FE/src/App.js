import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import fotoHeader from "./imagenes/haderImage.jpg";


function App() {
  const [ tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [tachado, setTachado] = useState();
  

  useEffect(() => {
    axios.get('http://localhost:5000/tarea')
      .then((response) => {
        console.log(response);
        setTasks(response.data);
        setTachado(response.data.tachado);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); 
  


  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

  const addTask = (index) => {
    tasks[index] = (inputValue);
    tasks[index.tachado] = null;
    const updatedTasks = [...tasks];
    setTasks(updatedTasks);
    axios.post('http://localhost:5000/tarea/' + tasks[index].IdTarea)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const strikeTask = (index) => {
    tasks[index].tachado = true;

    const updatedTasks = [...tasks];
    //updatedTasks[index] = <strike>{updatedTasks[index]}</strike>;
    setTasks(updatedTasks);

    axios.put('http://localhost:5000/tarea/' + tasks[index].IdTarea)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteSelectedTasks = () => {
    const updatedTasks = tasks.filter((_, index) => {
      return !document.getElementById(`checkbox-${index}`).checked;
    });
    setTasks(updatedTasks);
  };

  return (<div className="App">
    <header style={{ backgroundImage: `url(${fotoHeader})` }}>
      <div className="flex-container">
        <div><h1 className="textHeader1"><b><Link style={{color:'white'}} to="/">HOME</Link></b></h1></div>
        <center><h2 style={{  Color:'black' }}> HABITACIONES</h2></center>
      </div>
    </header>

    <div className='Row'>
      <div className="container">
        <input type="text" className="input-bar" placeholder="Ingrese una tarea (máx. 50 palabras)" value={inputValue} onChange={handleInputChange}/>
        <button className="button" onClick={addTask} style={{marginLeft:'5%'}}>
          Agregar Tarea
        </button>
        </div>
          <br/>

          <div className='Row'>
        <ul className="task-list" style={{margin:'5%', borderColor:'black'}}>
          {tasks.map((task, index) => (
            <li className="task-item" key={index}>
              <input
                type="checkbox"
                className="task-checkbox"
                id={`checkbox-${index}`}
              />
              <span className={ task.tachado ? "task-text tachado" : "task-text"}>{task.descripcion}</span>
              <button
                className="button task-delete"
                onClick={() => deleteTask(index)}
              >
                Eliminar
              </button>
              <button
                className="button task-strike"
                onClick={() => strikeTask(index)}
              >
                Tachar
              </button>
            </li>
          ))}
        </ul>
        </div >
        <button className="button" onClick={deleteSelectedTasks} style={{marginBottom:'15%', marginLeft:'5%'}}>
          Eliminar Seleccionadas
        </button>
      </div>

      <footer style={{ marginTop: '0%', height: '20px' }}>
      <p className='textFooter'>SAIRUKSIA TEAM</p>
    </footer>
  </div>);
}
export default App;
