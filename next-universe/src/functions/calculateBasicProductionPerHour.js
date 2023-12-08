export const calculateBasicProductionPerSecond = (
  ecoUniverse,
  tempMax,
  plantType,
  currentLevel,
  efficiency
) => {
  const previousLevel = currentLevel - 1; // Nivel anterior

  const plantFormulas = {
    metal: { base: 30, factor: 1.1, ecoFactor: ecoUniverse },
    crystal: { base: 20, factor: 1.1, ecoFactor: ecoUniverse },
    deuterium: {
      base: 10,
      factor: 1.1,
      ecoFactor: (1.44 - 0.004 * tempMax) * ecoUniverse,
    },
  };

  const plant = plantFormulas[plantType];

  if (plant) {
    const productionAtpreviousLevel =
      plant.base *
      previousLevel *
      Math.pow(plant.factor, previousLevel) *
      plant.ecoFactor;
    const productionAtcurrentLevel =
      plant.base *
      currentLevel *
      Math.pow(plant.factor, currentLevel) *
      plant.ecoFactor;
    const levelDifference = previousLevel - currentLevel;

    const productionDifference =
      productionAtcurrentLevel - productionAtpreviousLevel;
    const productionRatio = productionDifference / levelDifference;

    // Calcula la producción base por segundo sin redondear
    const productionPerHour = productionAtpreviousLevel - productionRatio;
    
    const productionPerSecond = (productionPerHour / 3600) * efficiency;

    return productionPerSecond;
  }
  return 0; // Valor predeterminado si no se encontró una planta válida
};

//? Ejemplo
// const ecoUniverse = 6; // Nivel de la Economía del Universo
// const plantType = 'metal'; // Nombre de la Planta (cambia según la instalación deseada)
// const tempMax = 10; // Temperatura máxima
// const currentLevel = 10; // Nivel actual
// const efficiency = 1; // Eficiencia de la planta

// const baseProductionPerSecond = calculateBasicProductionPerSecond(
//   ecoUniverse,
//   tempMax,
//   plantType,
//   currentLevel,
//   efficiency
// );
// console.log('Producción base por segundo:', baseProductionPerSecond);
