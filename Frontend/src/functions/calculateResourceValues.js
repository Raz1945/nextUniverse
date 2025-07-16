import { calculateBasicProductionPerSecond } from './calculateBasicProductionPerHour';
import { calculateEnergyProduction } from './calculateEnergyProduction';

export const calculateResourceValues = (planetData) => {
  // console.log(planetData);

  // Desestructurar userPlanet en lugar de planetData
  const { ecoUniverse, planets, technology } = planetData;
  const { tempMax } = planets[0];
  // const { installation } = planets[0];
  // console.log(planets[0].installation);
  // console.log(installation);
  // console.log(ecoUniverse);
  // console.log(tempMax);



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
    planets[0].installation.metalMine
  );
  // console.log('la produccion es:', productionPerSecondofMetal);

  const productionPerSecondofCrystal = getResourceProduction(
    planets[0].installation.crystalMine
  );
  const productionPerSecondofDeuterium = getResourceProduction(
    planets[0].installation.deuteriumSynthesizer
  );

  const productionOfEnergy = calculateEnergyProduction(
    planets[0].installation.solarPowerPlant.plantType,
    planets[0].installation.solarPowerPlant.currentLevel,
    planets[0].installation.solarPowerPlant.efficiency,
    energyTechnologyLevel
  );
  // console.log('la produccion de energia es:', productionOfEnergy)

  return {
    productionPerSecondofMetal,
    productionPerSecondofCrystal,
    productionPerSecondofDeuterium,
    productionOfEnergy,
  };
};
