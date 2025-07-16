// 📦 Importación de módulos y controladores
import express from 'express';
import { register, login, getUserProfile } from '../controllers/userController.js';
import {
  updateResourceValue,
  getResourceValues,
  updatePlantCurrentLevel,
  getAllPlantCurrentLevels
} from '../controllers/serviceController.js';
import authenticateToken from '../middleware/index.js';

// 🚀 Instancia del router
const router = express.Router();

// 👤 Auth & Perfil
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getUserProfile);

// ⚙️ Recursos y Producción
router.post('/profile/update', authenticateToken, updateResourceValue);
router.get('/profile/resource', authenticateToken, getResourceValues);
router.post('/profile/plants/:plantType/level', authenticateToken, updatePlantCurrentLevel);
router.get('/profile/plants/level', authenticateToken, getAllPlantCurrentLevels);

// 🔒 Rutas futuras
// router.post('/profile/update', authenticateToken, updateUserProfile); // Actualizar datos
// router.post('/profile/delete', authenticateToken, deleteUserAccount);
// router.post('/profile/cancel_plant_level', authenticateToken, cancelPlantCurrentLevel);
// router.post('/profile/previus_plant_level', authenticateToken, previusPlantCurrentLevel);

// 📤 Exportación del router
export default router;
