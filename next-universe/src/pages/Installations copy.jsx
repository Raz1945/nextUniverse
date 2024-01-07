import { useEffect, useState } from "react";
import { getInstallationCurrentLevel } from "../functions/services/getInstallationCurrentLevel";
import { Installation } from "../components/Installations/Installation";
import { updateInstallationCurrentLevel } from "../functions/services/updateInstallationCurrentLevel";
import { getResourceValues } from "../functions/services/getResourceValues";
import { calculateSpecificInstallationCost } from "../functions/calculateSpecificInstallationCost";
import { updateResourceValue } from "../functions/services/updateResourceValue";

// ... (imports)

export const Installations = () => {
  const [installationLevels, setInstallationLevels] = useState({
    metalMine: 0,
    crystalMine: 0,
    robotFactory: 0,
    nanobotFactory: 0,
    // otras instalaciones
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchResource();
      } catch (error) {
        console.error("Error al obtener los valores de recursos:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchInstallationLevels = async () => {
      try {
        const levels = await getInstallationCurrentLevel();
        setInstallationLevels((prevLevels) => ({
          ...prevLevels,
          metalMine: levels?.resource?.metalMine || 0,
          crystalMine: levels?.resource?.crystalMine || 0,
          robotFactory: levels?.resource?.robotFactory || 0,
          nanobotFactory: levels?.resource?.nanobotFactory || 0,
          // Otras instalaciones 
        }));
      } catch (error) {
        console.error("Error al obtener los niveles de instalación", error);
      }
    };

    fetchInstallationLevels();
  }, []); 

  const handleOnClickUpdate = async (plantType) => {
    const plantInfo = { plantType };
    const nextLevel = installationLevels[plantType] + 1;

    try {
      const costResourceResponse = await calculateSpecificInstallationCost(plantType, nextLevel);
      const { metalCost, crystalCost, deuteriumCost, currentLevel } = costResourceResponse;

      const { ecoUniverse, metal, crystal, deuterium } = await fetchResource();

      if (metal >= metalCost && crystal >= crystalCost && deuterium >= deuteriumCost) {
        const { robotFactory, nanobotFactory } = installationLevels;
        const timeToBuild = calculateTimeToBuild(ecoUniverse, metalCost, crystalCost, robotFactory, nanobotFactory);
        console.log(`Tiempo de construcción estimado para ${plantType}: ${timeToBuild} horas`);

        const updatedMetalProductionValue = metal - metalCost;
        const updatedCrystalProductionValue = crystal - crystalCost;
        const updatedDeuteriumProductionValue = deuterium - deuteriumCost;

        const updatedResources = {
          metalProduction: updatedMetalProductionValue,
          crystalProduction: updatedCrystalProductionValue,
          deuteriumProduction: updatedDeuteriumProductionValue,
        };

        await Promise.all([
          updateResourceValue(updatedResources),
          updateAllResources(updatedResources),
          updateInstallationCurrentLevel(plantInfo),
        ]);

        console.log(`Planta de ${plantType} actualizada`);
      } else {
        console.log(`Recursos insuficientes para actualizar la planta de ${plantType}`);
      }
    } catch (error) {
      console.error(`Error updating ${plantType} plant:`, error);
      alert('Failed to update plant. Please try again.');
    }
  };

  const updateAllResources = async (updatedResources) => {
    try {
      await updateResourceValue(updatedResources);
      console.log("Actualizando la cantidad de recursos en tu sistema:", JSON.stringify(updatedResources, null, 2));
    } catch (error) {
      console.error("Error al actualizar la cantidad de recursos:", error);
    }
  };

  const fetchResource = async () => {
    try {
      const resources = await getResourceValues();
      console.log('Cantidad de recursos:', JSON.stringify(resources, null, 2));
      return resources;
    } catch (error) {
      console.error("Error al obtener los valores de recursos:", error);
      throw error;
    }
  };

  return (
    <>
      <div>Installations</div>
      <Installation
        plantType="metalMine"
        currentLevel={installationLevels.metalMine}
        metalCost={Math.round(calculateSpecificInstallationCost('metalMine', installationLevels.metalMine + 1).metalCost)}
        crystalCost={Math.round(calculateSpecificInstallationCost('metalMine', installationLevels.metalMine + 1).crystalCost)}
        onClickUpdate={() => handleOnClickUpdate('metalMine')}
      />
      <br />
      <Installation
        plantType="crystalMine"
        currentLevel={installationLevels.crystalMine}
        metalCost={Math.round(calculateSpecificInstallationCost('crystalMine', installationLevels.crystalMine + 1).metalCost)}
        crystalCost={Math.round(calculateSpecificInstallationCost('crystalMine', installationLevels.crystalMine + 1).crystalCost)}
        onClickUpdate={() => handleOnClickUpdate('crystalMine')}
      />
      {/* ... otras instalaciones */}
    </>
  );
};
