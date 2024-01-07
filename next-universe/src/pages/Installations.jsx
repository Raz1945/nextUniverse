import { useEffect, useState } from "react";
import { getInstallationCurrentLevel } from "../functions/services/getInstallationCurrentLevel";
import { Installation } from "../components/Installations/Installation";
import { updateInstallationCurrentLevel } from "../functions/services/updateInstallationCurrentLevel";
import { getResourceValues } from "../functions/services/getResourceValues";
import { calculateSpecificInstallationCost } from "../functions/calculateSpecificInstallationCost";
import { updateResourceValue } from "../functions/services/updateResourceValue";
import { calculateTimeBuild } from "../functions/calculateTimeBuild";


export const Installations = () => {
  const [resourceCurrentLevels, setResourceCurrentLevels] = useState({
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
        const { resource: levels } = await getInstallationCurrentLevel();
        setResourceCurrentLevels((prevLevels) => ({
          ...prevLevels,
          metalMine: levels?.metalMine || 0,
          crystalMine: levels?.crystalMine || 0,
          robotFactory: levels?.robotFactory || 0,
          nanobotFactory: levels?.nanobotFactory || 0,
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
    const nextLevel = resourceCurrentLevels[plantType] + 1;

    try {
      const costResourceResponse = await calculateSpecificInstallationCost(plantType, nextLevel);
      const { metalCost, crystalCost, deuteriumCost } = costResourceResponse;

      const { ecoUniverse, metal, crystal, deuterium } = await fetchResource();

      // Validación adicional para asegurarse de que los costos de recursos no sean negativos
      if (metalCost < 0 || crystalCost < 0 || deuteriumCost < 0) {
        console.error('Error: Los costos de recursos no pueden ser negativos.');
        return;
      }

      if (metal >= metalCost && crystal >= crystalCost && deuterium >= deuteriumCost) {
        const { robotFactory, nanobotFactory } = resourceCurrentLevels;

        const { timeToBuild, endTime } = calculateTimeBuild(ecoUniverse, metalCost, crystalCost, robotFactory, nanobotFactory);
        console.log(`Tiempo de construcción estimado para ${plantType}:`);
        console.log(`Horas: ${timeToBuild.hours}, Minutos: ${timeToBuild.minutes}, Segundos: ${timeToBuild.seconds}`);
        console.log(`Hora estimada de finalización: ${endTime}`);

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


  const handleOnClickCancele = () => {
    console.log('Cancelar proceso de actualizacion ')
  }

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
        currentLevel={resourceCurrentLevels.metalMine}
        metalCost={Math.round(calculateSpecificInstallationCost('metalMine', resourceCurrentLevels.metalMine + 1).metalCost)}
        crystalCost={Math.round(calculateSpecificInstallationCost('metalMine', resourceCurrentLevels.metalMine + 1).crystalCost)}

        // timeToBuild={}
        onClickUpdate={() => handleOnClickUpdate('metalMine')}
        onClickCancele={() => handleOnClickCancele('metalMine')} // todo
      />
      <br />
      {/* <Installation
        plantType="crystalMine"
        currentLevel={resourceCurrentLevels.crystalMine}
        metalCost={Math.round(calculateSpecificInstallationCost('crystalMine', resourceCurrentLevels.crystalMine + 1).metalCost)}
        crystalCost={Math.round(calculateSpecificInstallationCost('crystalMine', resourceCurrentLevels.crystalMine + 1).crystalCost)}
        onClickUpdate={() => handleOnClickUpdate('crystalMine')}
      /> */}
      {/* ... otras instalaciones */}
    </>
  );
};
