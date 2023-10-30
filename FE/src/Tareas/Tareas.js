import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


function Tareas() {
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
      return; 
    }

    axios
      .post('http://localhost:5000/tarea', {
        descripcion: inputValue,
        tachado: false, 
      })
      .then((response) => {
        console.log(response);
        fetchTasks(); 
        setInputValue(''); 
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
        fetchTasks(); 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const strikeTask = (taskId, isTachado) => {
    axios
      .put(`http://localhost:5000/tarea/${taskId}`, {
        finalizada: !isTachado, 
      })
      .then((response) => {
        console.log(response);
        fetchTasks(); 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
       <header style={{ backgroundColor:'#556B2F' }}>
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
            <h2 style={{ Color: 'black' }}> TAREAS</h2>
          </center>
        </div>
      </header>
         <div >
            <div className="container" style={{width:'10000px'}}>
              <input
                type="text"
                className="input-bar"
                placeholder="Ingrese una tarea (máx. 50 caracteres)"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button className="button" onClick={addTask} style={{width:'200px' ,backgroundColor: '#556B2F', color: 'white', display: 'inline-block', borderRadius: '15px', boxShadow: '9px 9px 9px #999', marginTop:'1px', marginLeft:'470px'}}
>
                AGREGAR TAREA
              </button>
            </div>
            <br />

            <div className="container" style={{width:'10000px'}}>
              <ul className="task-list" >
                {tasks.map((task) => (
                  <li className="task-item" key={task.IdTarea}>
                    <input
                      type="checkbox"
                      className="task-checkbox"
                      id={`checkbox-${task.IdTarea}`}
                      onChange={() => strikeTask(task.idTarea, task.finalizada)}
                      checked={task.finalizada}
                    />
                    <span className={task.finalizada ? 'task-text tachado' : 'task-text'}>
                      {task.descripcion}
                    </span>
                    <button
                      className="button task-delete"
                      onClick={() => deleteTask(task.idTarea)}
                      style={{width:'200px' ,backgroundColor: '#556B2F', color: 'white', display: 'inline-block', borderRadius: '15px', boxShadow: '9px 9px 9px #999', marginTop:'5px', marginLeft:'700px'}}
                    >
                      ELIMINAR
                    </button>
                  </li>
                ))}
              </ul>
            </div>
      </div>
      <footer style={{ backgroundColor:'#556B2F' ,marginTop: '0%', height: '20px' }}>
        <p className="textFooter">TAREFF TEAM</p>
      </footer>
    </div>
  );
}


export default Tareas;