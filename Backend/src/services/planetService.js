import mongoose from 'mongoose';
import Planet from '../models/userPlanetSchema.js';

// Función auxiliar para calcular el diámetro (puede pasarse desde afuera)
const getDefaultDiameter = () => 170;

export const createUserPlanet = async (
  userId,
  {
    name = 'Earth', // Nombre del planeta por defecto
    tempMax = 10, // todo --> Debería variar según el planeta
    tempMin = 0, // todo --> Debería variar según el planeta
    visualPlanetId = Math.floor(Math.random() * 5) + 1,
    diameterFn = getDefaultDiameter, // función que retorna el diámetro
  } = {}
) => {
  const diameter = typeof diameterFn === 'function' ? diameterFn() : getDefaultDiameter();

  const newPlanet = {
    _id: new mongoose.Types.ObjectId(),
    name,
    tempMax,
    tempMin,
    diameter,
    visualPlanetId,
    installation: {
      metalMine: {
        plantType: 'metal',
        currentLevel: 0,
        efficiency: 1,
        value: 0,
      },
      crystalMine: {
        plantType: 'crystal',
        currentLevel: 0,
        efficiency: 1,
        value: 0,
      },
      deuteriumSynthesizer: {
        plantType: 'deuterium',
        currentLevel: 0,
        efficiency: 1,
        value: 0,
      },
      solarPowerPlant: {
        plantType: 'energy',
        currentLevel: 0,
        efficiency: 1,
        value: 0,
      },
      metalWarehouse: { currentLevel: 0 },
      crystalWarehouse: { currentLevel: 0 },
      deuteriumTank: { currentLevel: 0 },
      robotFactory: {
        plantType: 'robotFactory',
        currentLevel: 0,
      },
      nanobotFactory: {
        plantType: 'nanobotFactory',
        currentLevel: 0,
      },
    },
  };

  const newUserPlanet = new Planet({
    user_id: userId,
    ecoUniverse: 6,
    resources: {
      metal: 1000,
      crystal: 1000,
      deuterium: 0,
      energy: 0,
    },
    planets: [newPlanet],
    technology: {
      energyTechnologyLevel: 1,
      computerTechnologyLevel: 0,
    },
  });

  return await newUserPlanet.save();
};
