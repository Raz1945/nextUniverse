import { calculateBasicProductionPerSecond } from './calculateBasicProductionPerHour';
import { calculateEnergyProduction } from './calculateEnergyProduction';

export const calculateResourceValues = (planetData) => {
  const { ecoUniverse, planet, installation, technology } = planetData;
  const { tempMax } = planet;
  const { energyTechnologyLevel } = technology;

  const getResourceProduction = (plant) => {
    return calculateBasicProductionPerSecond(
      ecoUniverse,
      tempMax,
      plant.plantType,
      plant.currentLevel,
      plant.efficiency
    );
  };

  const productionPerSecondofMetal = getResourceProduction(
    installation.metalMine
  );
  const productionPerSecondofCrystal = getResourceProduction(
    installation.crystalMine
  );
  const productionPerSecondofDeuterium = getResourceProduction(
    installation.deuteriumSynthesizer
  );

  const productionOfEnergy = calculateEnergyProduction(
    installation.solarPowerPlant.plantType,
    installation.solarPowerPlant.currentLevel,
    installation.solarPowerPlant.efficiency,
    energyTechnologyLevel
  );

  return {
    productionPerSecondofMetal,
    productionPerSecondofCrystal,
    productionPerSecondofDeuterium,
    productionOfEnergy,
  };
}