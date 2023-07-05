const ctrlReservas = {};
const bcrypt = require('bcrypt');
const Reserva = require('../models/Reserva');


// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas

ctrlReservas.obtenerReservas = async (req, res) => {
    try {
        const reservas = await Usuario.findAll({
            where: {
                estado: true,
            }
        });

        if (!Reservas) {
            throw ({
                status: 404,
                message: 'No se encontraron Reservas',
            });
        }

        return res.status(200).json(Reservas);

    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al obtener las Reservas',
        });
    }
};
// Obtener una reserva

ctrlReservas.obtenerReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const Reserva = await Reserva.findByPk(id);

        if (!Reserva) {
            throw ({
                status: 404,
                message: 'No se ha encontrado la Reserva'
            })
        }

        return res.json(Reserva);
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message
        })
    };

}
// Crear una reserva

ctrlReservas.crearReserva = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existeReserva = await Reserva.findOne({
            where: {
                
            }
        });


        if (existeReserva) {
            throw ({
                status: 400,
                message: 'La reserva ya existe',
            })
        };

        const nuevoReserva = new Reserva({
            username,
            email,
            password,
        });

        // Se guarda la reserva en la base de datos
        const ReservaCreado = await nuevoReserva.save();

        if (!ReservaCreado) {
            throw ({
                message: 'Error al crear la Reserva',
            })
        }

        // Se devuelve la respuesta al cliente
        return res.status(201).json({
            message: 'Reserva creada exitosamente',
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al crear la reserva',
        });
    }
};

// Actualizar una reserva
ctrlReservas.actualizarReserva = async (req, res) => {

    const { id } = req.params;

    const { email, username } = req.body;


    try {

        const ReservaActualizado = await Reserva.update({
            email,
            username
        }, {
            where: {
                id
            }
        })

        if (!ReservaActualizado) {
            throw ({
                status: 400,
                message: 'No se pudo actualizar la reserva'
            })
        }

        return res.json({
            message: 'Reserva actualizada correctamente',
            ReservaActualizado
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error de servidor, contacte al area de sistemas'
        })
    }


}
// Eliminar una reserva de forma lógica

ctrlReservas.eliminarReserva = async (req, res) => {

    const { id } = req.params

    try {

        // Se cambia el estado del registro a false para indicar que la reserva fue eliminado
        const ReservaEliminado = Reserva.update({
            estado: false
        }, {
            where: {
                id,
                estado: true
            }
        })


        // Si la BD devuelve false, significa que no eliminó
        if (!ReservaEliminado) {
            throw ({
                status: 400,
                message: 'Error al eliminar reserva'
            })
        }

        // Si pasa la validación
        return res.json({
            message: 'Reserva eliminada con éxito',
        });
    } catch (error) {
        console.log(error);
        return res.status(error.status || 5000).json({
            message: error.message || 'Error de servidor, contacte al área de sistemas'
        })
    }

}







module.exports = ctrlReservas;


