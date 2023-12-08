// Importación de módulos
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/routes');

// Variables de entorno
const port = process.env.PORT || 3000;
const mongodbUrl = process.env.MONGODB_URL;
const corsOrigin = process.env.CORS_ORIGIN;

// Creación de la aplicación Express
const app = express();

// Middleware CORS
app.use(
  cors({
    origin: corsOrigin, //? Origen de la base de datos, el puerto 5173 es el puerto por defecto de mongoDb
    credentials: true, // Permite credenciales en las solicitudes
  })
);
app.options('*', cors()); // Permite que cualquier ruta acceda sin ser bloqueada por el navegador.
app.use(express.json());

// Configuración de rutas
app.use('/', routes);

// Conexión a la base de datos
function connect() {
  return mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
mongoose.connection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', () => {
    app.listen(port, () => {
      console.log(`Express app started on port ${port}`);
    });
  });

connect();
