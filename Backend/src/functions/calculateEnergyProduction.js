export const calculateEnergyProduction = (
  plantType,
  currentLevel,
  efficiency,
  energyTechnologyLevel = 0
) => {
  const plantFormulas = {
    energy: {
      base: 20,
      factor: 1.1,
      ecoFactor: 1.05 + energyTechnologyLevel * 0.02,
    },
  };

  const plant = plantFormulas[plantType];

  if (plant) {
    const production = calculateProduction(plant, currentLevel, efficiency);
    return Math.round(production);
  }

  return 0; // Valor predeterminado si no se encontró una planta válida
};

const calculateProduction = (plant, level, efficiency) => {
  return (
    plant.base *
    level *
    Math.pow(plant.factor, level) *
    plant.ecoFactor *
    efficiency
  );
};

//? Ejemplo
// const plantType = 'energy'; // Nombre de la Planta (cambia según la instalación deseada)
// const currentLevel = 1; // Nivel actual
// const efficiency = 1; // Eficiencia de la planta
// const energyTechnologyLevel = 0; // Nivel de tegnologia de Energia

// const production = calculateEnergyProduction(
//   plantType,
//   currentLevel,
//   efficiency,
//   energyTechnologyLevel,
// );
// console.log('Producción es =:', production); // 1691
