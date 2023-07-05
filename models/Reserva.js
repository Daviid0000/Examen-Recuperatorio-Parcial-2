// TODO: Crear modelo de datos de Reserva

const { sequelize, DataTypes } = require('../db');


const Usuario = sequelize.define('usuario', {
    // Los atributos del modelo se definen acá.
    idReserva:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type : DataTypes.STRING,
        allowNull: false,
    },
    dni: {
        type : DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    // Otras opciones del modelo van acá
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'usuario'
});

// Crear tabla si no existe
Usuario.sync();

module.exports = Usuario;