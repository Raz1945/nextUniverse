import { useEffect, useState } from "react";
import { getInstallationCurrentLevel } from "../functions/services/getInstallationCurrentLevel";
import { Installation } from "../components/Installations/Installation";
import { updateInstallationCurrentLevel } from "../functions/services/updateInstallationCurrentLevel";
import { getResourceValues } from "../functions/services/getResourceValues";
import { calculateSpecificInstallationCost } from "../functions/calculateSpecificInstallationCost";
import { updateResourceValue } from "../functions/services/updateResourceValue";

export const Installations = () => {
  const [resourceCurrentLevel, setResourceCurrentLevel] = useState({
    metalMine: 0,
    crystalMine: 0,
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
    const fetchPlantLevels = async () => {
      try {
        const levels = await getInstallationCurrentLevel();
        const metalMineLevel = levels?.resource?.metalMine;
        const crystalMineLevel = levels?.resource?.crystalMine;
        // Otras instalaciones 

        setResourceCurrentLevel((prevLevel) => ({ ...prevLevel, metalMine: metalMineLevel, crystalMine: crystalMineLevel }));
      } catch (error) {
        console.error("Error al obtener los niveles de instalación", error);
      }
    };

    fetchPlantLevels();
  }, [resourceCurrentLevel]);

  const handleOnClickUpdate = async (plantType) => {
    const plantInfo = { plantType };
    console.log(`Planta de ${plantInfo.plantType}`);

    const nextLevel = resourceCurrentLevel[plantType] + 1;

    try {
      const costResourceResponse = await calculateSpecificInstallationCost(plantType, nextLevel);
      const { metalCost, crystalCost, deuteriumCost, currentLevel } = costResourceResponse;
      console.log('Cost Resource Response:', JSON.stringify({ metalCost, crystalCost, deuteriumCost, currentLevel }, null, 2));

      const { metal, crystal, deuterium } = await fetchResource();
      console.log('Cantidad de recursos disponibles:', JSON.stringify({ metal, crystal, deuterium }, null, 2));

      if (metal >= metalCost && crystal >= crystalCost && deuterium >= deuteriumCost) {
        const updatedMetalProductionValue = metal - metalCost;
        const updateCrystalProductionValue = crystal - crystalCost;
        const updateDeuteriumProductionValue = deuterium - deuteriumCost;

        const updateResource = {
          metalProduction: updatedMetalProductionValue,
          crystalProduction: updateCrystalProductionValue,
          deuteriumProduction: updateDeuteriumProductionValue,
        };

        console.log('Datos a enviar al backend:', JSON.stringify(updateResource, null, 2));

        await Promise.all([
          updateResourceValue(updateResource),
          updateAllResources(updateResource),
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

  const updateAllResources = async (updateResource) => {
    try {
      await updateResourceValue(updateResource);
      console.log("Actualizando la cantidad de metal en tu sistema:", JSON.stringify(updateResource, null, 2));
    } catch (error) {
      console.error("Error al actualizar la cantidad de metal:", error);
    }
  };

  const fetchResource = async () => {
    try {
      const resource = await getResourceValues();
      console.log('Cantidad de recursos:', JSON.stringify(resource, null, 2));
      return resource;
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
        currentLevel={resourceCurrentLevel.metalMine}
        metalCost={Math.round(calculateSpecificInstallationCost('metalMine', resourceCurrentLevel.metalMine + 1).metalCost)}
        crystalCost={Math.round(calculateSpecificInstallationCost('metalMine', resourceCurrentLevel.metalMine + 1).crystalCost)}
        onClickUpdate={() => handleOnClickUpdate('metalMine')}
      />
      <br/>
      <Installation
        plantType="crystalMine" 
        currentLevel={resourceCurrentLevel.crystalMine}
        metalCost={Math.round(calculateSpecificInstallationCost('crystalMine', resourceCurrentLevel.crystalMine + 1).metalCost)}
        crystalCost={Math.round(calculateSpecificInstallationCost('crystalMine', resourceCurrentLevel.crystalMine + 1).crystalCost)}
        onClickUpdate={() => handleOnClickUpdate('crystalMine')}
      />

    </>
  );
};
