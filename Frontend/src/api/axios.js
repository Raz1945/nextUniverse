import axios from 'axios';

// Configuración Global de  Axios, ayuda a reducir la redundancia en tus solicitudes.
export default axios.create({
  baseURL: 'http://localhost:3000',
});
