// Importación de módulos
import dotenv from 'dotenv';
dotenv.config({ path: './src/config/.env' }); // Ruta personalizada para .env

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './src/routes/index.js'; // Asegurate que index.js tenga "export default"

// Variables de entorno
const port = process.env.PORT || 3000;
const mongodbUrl = process.env.MONGODB_URL;
const corsOrigin = process.env.CORS_ORIGIN;

// Validación básica
if (!mongodbUrl) throw new Error('❌ MONGODB_URL no está definida en el archivo .env');
if (!corsOrigin) console.warn('⚠️ CORS_ORIGIN no definida, usando * por defecto');

// Creación de la aplicación Express
const app = express();

// Middleware CORS
app.use(
  cors({
    origin: corsOrigin || '*', //? Origen de la base de datos, el puerto 5173 es el puerto por defecto de mongoDb
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
  .on('error', console.log) // Mostrar error de conexión
  .on('disconnected', connect) // Reintento automático
  .once('open', () => {
    app.listen(port, () => {
      console.log(`🚀 Express app started on port ${port}`);
    });
  });

connect();