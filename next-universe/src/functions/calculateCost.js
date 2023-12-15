export const calculateSpecificCost = (plantType, currentLevel) => {
  const costPlant = {
    metalMine: {
      metal: { base: 60, factor: 1.5, pow: currentLevel - 1 },
      crystal: { base: 15, factor: 1.5, pow: currentLevel - 1 },
      deuterium: { base: 0, factor: 0, pow: 0 },
    },
    crystalMine: {
      metal: { base: 48, factor: 1.6, pow: currentLevel - 1 },
      crystal: { base: 24, factor: 1.6, pow: currentLevel - 1 },
      deuterium: { base: 0, factor: 0, pow: 0 },
    },
    deuteriumSynthesizer: {
      metal: { base: 225, factor: 1.5, pow: currentLevel - 1 },
      crystal: { base: 75, factor: 1.5, pow: currentLevel - 1 },
      deuterium: { base: 0, factor: 0, pow: 0 },
    },
    solarPowerPlant: {
      metal: { base: 75, factor: 1.5, pow: currentLevel - 1 },
      crystal: { base: 30, factor: 1.5, pow: currentLevel - 1 },
      deuterium: { base: 0, factor: 0, pow: 0 },
    }
  };

  const metalCost = calculateResourceCost(costPlant[plantType]?.metal);
  const crystalCost = calculateResourceCost(costPlant[plantType]?.crystal);
  const deuteriumCost = calculateResourceCost(costPlant[plantType]?.deuterium);

  console.log(`Costo de Metal para ${plantType}:`, metalCost);
  console.log(`Costo de Cristal para ${plantType}:`, crystalCost);
  console.log(`Costo de Deuterio para ${plantType}:`, deuteriumCost);
};


const calculateResourceCost = (resource) => {
  return resource?.base && resource?.factor
    ? resource.base * (resource.factor **  resource?.pow)
    : 0;
};

// Llama a la función con los parámetros deseados
calculateSpecificCost('metalMine', 4);
