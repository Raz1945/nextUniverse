const express = require('express');
const userController = require('../controllers/userController');
const serviceController = require('../controllers/serviceController');
const authenticateToken = require('../middleware');
const router = express.Router();

// CRUD
router.post('/register', userController.register);
router.post('/login', userController.login);
// router.post('/profile/update', userController.updateUserProfile);
// router.post('/profile/delete', userController.updateUserProfile);


router.get('/profile',authenticateToken ,userController.getUserProfile)


router.post('/profile/update',authenticateToken ,serviceController.updateResourceValue)
router.get('/profile/resource',authenticateToken ,serviceController.getResourceValues)
router.post('/profile/plants/:plantType/level',authenticateToken ,serviceController.updatePlantCurrentLevel)
router.get('/profile/plants/level', authenticateToken, serviceController.getAllPlantCurrentLevels);

// router.post('/profile/cancel_plant_level',authenticateToken ,userController.cancelPlantCurrentLevel)
// router.post('/profile/previus_plant_level',authenticateToken ,userController.previusPlantCurrentLevel)


module.exports = router;
