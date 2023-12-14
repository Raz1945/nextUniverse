require('dotenv').config();
const UserPlanet = require('../models/userPlanetSchema');

// Actualizar los valores de los recursos
const updateResourceValue = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      metalProduction,
      crystalProduction,
      deuteriumProduction,
      energyProduction,
    } = req.body;

    // console.log('valor de metal', metalProduction);

    // Actualiza el perfil del usuario en la base de datos
    const updatedUserPlanet = await UserPlanet.findOneAndUpdate(
      { user_id: userId },
      {
        $set: {
          'resources.metal': metalProduction,
          'resources.crystal': crystalProduction,
          'resources.deuterium': deuteriumProduction,
          'resources.energy': energyProduction,
        },
      }
    );

    res.status(200).json({
      message: 'Production values saved successfully',
      profile: updatedUserPlanet,
    });
  } catch (error) {
    console.error('Error saving production values:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Actualizar el nivel de producción de una planta
const updatePlantCurrentLevel = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plantType, newLevel } = req.body;

    // Actualiza la planta con el nuevo nivel en la base de datos
    const updatedUserPlanet = await UserPlanet.findOneAndUpdate(
      { user_id: userId },
      {
        $set: {
          [`planets.0.installation.${plantType}.currentLevel`]: newLevel,
        },
      }
    );

    console.log(`Planta de ${plantType} actualizada:`, updatedUserPlanet);

    res.status(200).json({
      message: `Nivel de la planta de ${plantType} actualizado exitosamente`,
      profile: updatedUserPlanet,
    });
  } catch (error) {
    console.error(
      `Error al actualizar el nivel de la planta de ${plantType}:`,
      error
    );
    res.status(500).send('Error interno del servidor');
  }
};

// Extrae el nivel de las instalacionesv
// const getPlantCurrentLevels = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userPlanet = await UserPlanet.findOne({ user_id: userId });

//     if (!userPlanet) {
//       return res
//         .status(404)
//         .json({ message: 'Perfil de planeta no encontrado' });
//     }

//     const installationLevels = {
//       resource: {
//         metalMine: 
//           userPlanet.planets[0].installation.metalMine.currentLevel,
//         crystalMine:
//           userPlanet.planets[0].installation.crystalMine.currentLevel,
//         deuteriumSynthesizer:
//           userPlanet.planets[0].installation.deuteriumSynthesizer.currentLevel,
//         solarPowerPlant:
//           userPlanet.planets[0].installation.solarPowerPlant.currentLevel,
//       },
//       storage: {
//         metalWarehouse:
//           userPlanet.planets[0].installation.metalWarehouse.currentLevel,
//         crystalWarehouse:
//           userPlanet.planets[0].installation.crystalWarehouse.currentLevel,
//         deuteriumTank:
//           userPlanet.planets[0].installation.deuteriumTank.currentLevel,
//       },
//       // Agrega más instalaciones según sea necesario
//     };

//     res.status(200).json(installationLevels);
//   } catch (error) {
//     console.error('Error al obtener los niveles de las plantas:', error);
//     res.status(500).send('Error interno del servidor');
//   }
// };


// serviceController.js

// ...

const getAllPlantCurrentLevels = async (req, res) => {
  try {
    const userId = req.user.id;
    const userPlanet = await UserPlanet.findOne({ user_id: userId });

    if (!userPlanet) {
      return res.status(404).json({ message: 'Perfil de planeta no encontrado' });
    }

    const installationLevels = {
      resource: {
        metalMine: userPlanet.planets[0].installation.metalMine.currentLevel,
        crystalMine: userPlanet.planets[0].installation.crystalMine.currentLevel,
        deuteriumSynthesizer: userPlanet.planets[0].installation.deuteriumSynthesizer.currentLevel,
        solarPowerPlant: userPlanet.planets[0].installation.solarPowerPlant.currentLevel,
      },
      storage: {
        metalWarehouse: userPlanet.planets[0].installation.metalWarehouse.currentLevel,
        crystalWarehouse: userPlanet.planets[0].installation.crystalWarehouse.currentLevel,
        deuteriumTank: userPlanet.planets[0].installation.deuteriumTank.currentLevel,
      },
      // Agrega más instalaciones según sea necesario
    };
    
      console.log('Respuesta del servidor:', installationLevels);
    res.status(200).json(installationLevels);
  } catch (error) {
    console.error('Error al obtener los niveles de las plantas:', error);
    res.status(500).send('Error interno del servidor');
  }
};


module.exports = {
  updateResourceValue,
  updatePlantCurrentLevel,
  getAllPlantCurrentLevels,

};
