export const calculateSpecificInstallationCost = (plantType, currentLevel) => {

// todo Ver de hacer un json en el backend para los calculos de los costes 
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
    },
    metalWarehouse: {
      metal: { base: 1000, factor: 2, pow: currentLevel - 1 },
      crystal: { base: 0, factor: 2, pow: currentLevel - 1 },
      deuterium: { base: 0, factor: 2, pow: currentLevel - 1 },
    },
    crystalWarehouse: {
      metal: { base: 1000, factor: 2, pow: currentLevel - 1 },
      crystal: { base: 500, factor: 2, pow: currentLevel - 1 },
      deuterium: { base: 0, factor: 2, pow: currentLevel - 1 },
    },
    deuteriumTank: {
      metal: { base: 1000, factor: 2, pow: currentLevel - 1 },
      crystal: { base: 1000, factor: 2, pow: currentLevel - 1 },
      deuterium: { base: 0, factor: 2, pow: currentLevel - 1 },
    },
  };

  const metalCost = calculateResourceCost(costPlant[plantType]?.metal, currentLevel);
  const crystalCost = calculateResourceCost(costPlant[plantType]?.crystal, currentLevel);
  const deuteriumCost = calculateResourceCost(costPlant[plantType]?.deuterium, currentLevel);

  // console.log(`Costo de Metal para ${plantType} en el nivel ${currentLevel}:`, metalCost);
  // console.log(`Costo de Cristal para ${plantType} en el nivel ${currentLevel}:`, crystalCost);
  // console.log(`Costo de Deuterio para ${plantType} en el nivel ${currentLevel}:`, deuteriumCost);

  return {
    metalCost,
    crystalCost,
    deuteriumCost,
    currentLevel,
  };
};

const calculateResourceCost = (resource, currentLevel) => {
  return resource?.base && resource?.factor && currentLevel >= 1
    ? resource.base * resource.factor ** (currentLevel - 1)
    : 0;
};


// Ejemplo:
// const cost = calculateSpecificInstallationCost('metalMine', 2);

// console.log('Costo total de Metal:', cost.metalCost);
// console.log('Costo total de Cristal:', cost.crystalCost);
// console.log('Costo total de Deuterio:', cost.deuteriumCost);
