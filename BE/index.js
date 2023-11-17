import express from "express";
import habitacion from "./node/habitacion.js";
import cors from 'cors';
const app = express();
//const cors = require('cors');
import { hotelServices } from "./services/hotelServices.js";



//const router = express.Router();

app.use(cors());

const port = 5000;

app.use(express.json())



app.listen(port, () => {
    console.log(`Examp
    le app listening on port ${port}`);
})


app.get('/tarea', cors(), async (req, res) => {
    const tarea = await hotelServices.getAll()
    console.log(tarea);
    res.status(200).send(tarea)

})

//FUNCIONA

app.get('/tarea/:id', async (req, res) => {
    console.log("asdasd", req.params);
    const tarea = await hotelServices.getById(req.params.id)
    res.status(200).send(tarea)

})

//FUNCIONA

app.get('/tarea', async (req, res) => {
    const tarea = await hotelServices.getALL()
    res.status(200).send(tarea) 

})

//FUNCIONA

app.post('/tarea', async (req, res) => {
    console.log("en post, req:", req)
    try {
        await hotelServices.insert(req.body)
        res.status(200).json({ message: 'tarea creada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Fallo el insert' });
    }
})  

//FUNCIONA 

app.delete('/tarea/:id', async (req, res) => {
    try {
        console.log(req.params);
        await hotelServices.deleteById(req.params.id);
        res.status(200).json({ message: 'tarea Eliminada'});
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Fallo el delete' });

    }
})

// Tachar la tarea
app.put('/tarea/:id', async (req, res) => {
    try {
        await hotelServices.update(req.params.id, req.body);
        res.status(200).json({ message: 'tarea Actualizada'});
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Fallo el update' });
    }
})
//------------------------------------------HABITACION---------------------------------------------


app.put('/habitacion', async (req, res) => {
    try {
        console.log(req.body.id, req.body)
        await hotelServices.updateHab(req.body.id, req.body);
        res.status(200).json({ message: 'habitacion Actualizada'});
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Fallo el update' });
    }

})


//RESOLVER EL APP.PUT PARA EL CHECKIN Y CHECKOUT
//chequear con consoles.log si el error está aca o en el boton del front
app.put('/habitacion/:idHabitacion', async (req, res) => {
    const { idHabitacion } = req.params;
    const { estadoReserva } = req.body;
  
    const result = await hotelServices.updateHab(idHabitacion, { estadoReserva });
  
    res.json(result);
  });
  
  

app.get('/habitacion/:id', async (req, res) => {
    console.log("asdasd", req.params);
    const Habitacion = await hotelServices.getByIdHab(req.params.id)
    res.status(200).send(Habitacion)

})

app.get('/habitacion', async (req, res) => {
    const Habitacion = await hotelServices.getAllHab()
    res.status(200).send(Habitacion)
})

// ---------------------------------------------RESERVA----------------------------------------------------------


app.post('/reserva', async (req, res) => {
    console.log("en post, req:", req)
    try {
        await hotelServices.insertReserva(req.body)
        res.status(200).json({ message: 'reserva creada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Fallo el insert' });
    }
})  

app.get('/reserva', async (req, res) => {
    const Reserva = await hotelServices.getAllReserva()
    res.status(200).send(Reserva)
})

app.get('/Reserva/:id', async (req, res) => {
    console.log("asdasd", req.params);
    const Reserva = await hotelServices.getByIdReserva(req.params.id)
    res.status(200).send(Reserva)    

})