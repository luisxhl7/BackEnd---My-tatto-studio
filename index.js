const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Crear el servidor de express
const app = express();

// Conexión a base de datos
dbConnection();

// Cors
app.use(cors());

// Lectura y parseo del body
app.use( express.json());

// Directorio publico
app.use( express.static('public') );

// Rutas
app.use('/api/auth', require('./routes/auth'));

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
})