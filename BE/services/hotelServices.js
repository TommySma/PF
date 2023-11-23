import config from '../db-config.js';
import sql from 'mssql';
import habitacion from '../node/habitacion.js';

export class hotelServices {

    static getAll = async () => {
        let returnEntity = null;
        console.log('Estoy en: hotelServices.GetAll()');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Tareas');
            returnEntity = result.recordsets[0];
            console.log(returnEntity);
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
        
    }

    static getById = async (idTarea) => {
        let returnEntity = null;
        console.log('Estoy en: hotelServices.GetById(idTarea)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, idTarea)
                .query('SELECT * FROM Tareas WHERE idTarea = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static insert = async (Tareas) => {
        let returnEntity = null;
        console.log('Estoy en: hotelServices.insert(Tareas)');
        try {
            console.log('entré al try')
            let pool = await sql.connect(config);       
            let result = await pool.request()
                .input('pDesc', Tareas.descripcion)
                .query("INSERT INTO Tareas (descripcion) VALUES (@pDesc)");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }


    
    static update = async (idTarea, finalizada) => {
        let returnEntity = null;
        console.log('Estoy en: hotelServices.update(Tareas)');
        console.log('Finalizada!!', finalizada);
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int,idTarea)
                .input('pFinalizada', finalizada.finalizada)
                .query("UPDATE Tareas SET finalizada=@pFinalizada WHERE IdTarea = @pId");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static deleteById = async (idTarea) => {
        let rowsAffected = 0;
        console.log('Estoy en: hotelServices.deleteBy(idTarea)');
        console.log(idTarea+"csacsa" );
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, idTarea)
                .query('DELETE FROM Tareas WHERE IdTarea = @pId');
            rowsAffected = result.rowsAffected;
            console.log(rowsAffected)
        } catch (error) {
            console.log(error)
        }
        return rowsAffected;
    }




//-----------------------------------------------------------HABITACIONES------------------------------------------------------------------------//

    
    static updateHab = async (idHabitacion, habitacion) => {
        let returnEntity = null;
        console.log(habitacion, idHabitacion);
        console.log('Estoy en: hotelServices.update(idHabitacion)');
        try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('pEstado', habitacion.Estado)
            .input('pId', idHabitacion)
            .query("UPDATE Habitacion SET Estado =@pEstado WHERE idHabitacion = @pId");
        returnEntity = result.recordsets;
    
        console.log("FLECHA!!!", returnEntity);
        } catch (error) {
        console.log(error);
        }
        return returnEntity;
    }

    static getAllHab = async () => {
        let returnEntity = null;
        console.log('Estoy en: hotelServices.GetAll()');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Habitacion');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getByIdHab = async (idHabitacion) => {
        let returnEntity = null;
        console.log('Estoy en: hotelServices.GetById(idHabitacion)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, idHabitacion)
                .query('SELECT * FROM Habitacion WHERE idHabitacion = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }


//-----------------------------------------------------------RESERVA------------------------------------------------------------------------//

    
static insertReserva = async (reserva) => {
    let returnEntity = null;
    console.log("FLECHITA!!!");
    console.log(reserva);
    console.log('Estoy en: hotelServices.update(idReserva)');
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('pFechaIncio', reserva.fechaInicio)
            .input('pFechaFin', reserva.fechaFin)
            .input('pNombre', reserva.nombre)
            .input('pApellido', reserva.apellido)
            .input('pDni', reserva.dni)
            .input('pidHabitacion', reserva.idHabitacion)
            .query("INSERT INTO Reserva (fechaInicio,fechaFin,nombre,apellido,dni,idHabitacion) VALUES (@pFechaIncio,@pFechaFin,@pNombre,@pApellido,@pDni,@pidHabitacion)");
        returnEntity = result.recordsets;

        console.log("FLECHA!!!", returnEntity);
    } catch (error) {
        console.log(error);
    }
    return returnEntity;
}


static getAllReserva = async () => {
    let returnEntity = null;
    console.log('Estoy en: hotelServices.GetAll()');
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()

                .query('SELECT r.*, h.Estado, h.numeroHab FROM Reserva as r INNER JOIN Habitacion h ON r.idHabitacion = h.idHabitacion');
            console.log(result)
        returnEntity = result.recordsets[0];
    } catch (error) {
        console.log(error);
    }
    return returnEntity;
}

static getByIdReserva = async (idReserva) => {
    let returnEntity = null;
    console.log('Estoy en: hotelServices.GetById(idReserva)');
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('pId', sql.Int, idHabitacion)
            .query('SELECT * FROM Reserva WHERE idReserva = @pId');
        returnEntity = result.recordsets[0][0];
    } catch (error) {
        console.log(error);
    }
    return returnEntity;
}
}


//-----------------------------------------------------------Usuarios------------------------------------------------------------------------//



export default hotelServices