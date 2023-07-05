// Imports
const cors = require('cors');
const express = require('express');
const path = require('path');

require('dotenv').config();

const PORT = process.env.PORT || 6000;
const app = express();

// Middlewares
// TODO: Implementar middlewares

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./routes/reserva.routes'));



// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
    res.write(`<div>
                <h1>
                    404 - Ruta no encontrada</h1>
                </h1>`)
});
// Starting the server
app.listen(PORT, () => console.log('Server on port', PORT));