export const getPlanetData = () =>{
  return {
    ecoUniverse: 6,
    planet: {
      tempMax: 2,
    },
    installation: {
      // Recursos
      metalMine: {
        plantType: 'metal',
        currentLevel: 20,
        efficiency: 1,
      },
      crystalMine: {
        plantType: 'crystal',
        currentLevel: 25,
        efficiency: 1,
      },
      deuteriumSynthesizer: {
        plantType: 'deuterium',
        currentLevel: 15,
        efficiency: 1,
      },
      solarPowerPlant: {
        plantType: 'energy',
        currentLevel: 18,
        efficiency: 1,
      },
      // Depositos
      metalWarehouse: {
        currentLevel: 1,
      },
      crystalWarehouse: {
        currentLevel: 2,
      },
      deuteriumTank: {
        currentLevel: 2,
      },
    },
    technology: {
      energyTechnologyLevel: 5, // Nivel de tecnología de Energía
    },
  };
}