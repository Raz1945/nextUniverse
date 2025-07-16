import { useEffect, useState } from 'react';
import { getInstallationCurrentLevel } from '../functions/services/installationService/getInstallationCurrentLevel';
import { updateInstallationCurrentLevel } from '../functions/services/installationService/updateInstallationCurrentLevel';
import { getResourceValues } from '../functions/services/resourceService/getResourceValues';
import { updateResourceValue } from '../functions/services/resourceService/updateResourceValue';
import { calculateSpecificInstallationCost } from '../functions/calculateInstallationCost/calculateSpecificInstallationCost';
import { calculateTimeBuild } from '../functions/calculateInstallationCost/calculateTimeBuild';
import { InstallationSupplies } from '../components/Supplies/InstallationSupplies';

export const Installations = () => {
  const [resourceCurrentLevels, setResourceCurrentLevels] = useState({
    metalMine: 0,
    crystalMine: 0,
    deuteriumSynthesizer: 0,
    solarPowerPlant: 0,
    metalWarehouse: 0,
    crystalWarehouse: 0,
    deuteriumTank: 0,
    robotFactory: 0,
    nanobotFactory: 0,
    // otras instalaciones.
  });

  const [countdown, setCountdown] = useState('');
  const [countdownInterval, setCountdownInterval] = useState(null);
  const [updateInProgress, setUpdateInProgress] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchInstallationLevels();
  }, [resourceCurrentLevels]);

  const fetchData = async () => {
    try {
      await fetchResource();
    } catch (error) {
      console.error('Error al obtener los valores de recursos:', error);
    }
  };

  const fetchInstallationLevels = async () => {
    try {
      const { resource: levels } = await getInstallationCurrentLevel();
      setResourceCurrentLevels((prevLevels) => ({
        ...prevLevels,
        metalMine: levels?.metalMine || 0,
        crystalMine: levels?.crystalMine || 0,
        deuteriumSynthesizer: levels?.deuteriumSynthesizer || 0,
        solarPowerPlant: levels?.solarPowerPlant || 0,
        metalWarehouse: levels?.metalWarehouse || 0,
        crystalWarehouse: levels?.crystalWarehouse || 0,
        deuteriumTank: levels?.deuteriumTank || 0,
        robotFactory: levels?.robotFactory || 0,
        nanobotFactory: levels?.nanobotFactory || 0,
        // Otras instalaciones
      }));
    } catch (error) {
      console.error('Error al obtener los niveles de instalación', error);
    }
  };

  const handleOnClickUpdate = async (plantType) => {
    if (updateInProgress) {
      console.log('Ya hay una actualización en curso');
      return;
    }

    setUpdateInProgress(true);

    const nextLevel = resourceCurrentLevels[plantType] + 1;

    try {
      const costResourceResponse = await calculateSpecificInstallationCost(
        plantType,
        nextLevel
      );
      const { metalCost, crystalCost, deuteriumCost } = costResourceResponse;
      // obtenemos los recursos actuales desde el servicio
      const { ecoUniverse, metal, crystal, deuterium } = await fetchResource();

      if (metalCost < 0 || crystalCost < 0 || deuteriumCost < 0) {
        console.error('Error: Los costos de recursos no pueden ser negativos.');
        return;
      }

      if (
        metal >= metalCost &&
        crystal >= crystalCost &&
        deuterium >= deuteriumCost
      ) {
        const { robotFactory, nanobotFactory } = resourceCurrentLevels;
        const { timeToBuild, endTime } = calculateTimeBuild(
          ecoUniverse,
          metalCost,
          crystalCost,
          robotFactory,
          nanobotFactory
        );

        console.log(`Tiempo de construcción estimado para ${plantType}:`);
        console.log(
          `Horas: ${timeToBuild.hours}, Minutos: ${timeToBuild.minutes}, Segundos: ${timeToBuild.seconds}`
        );
        console.log(`Hora estimada de finalización: ${endTime}`);

        setCountdownInterval(
          setInterval(() => {
            if (
              timeToBuild.seconds > 0 ||
              timeToBuild.minutes > 0 ||
              timeToBuild.hours > 0
            ) {
              timeToBuild.seconds -= 1;

              if (
                timeToBuild.seconds === 0 &&
                (timeToBuild.minutes > 0 || timeToBuild.hours > 0)
              ) {
                timeToBuild.minutes -= 1;
                timeToBuild.seconds = 59;
              }

              if (timeToBuild.minutes === 0 && timeToBuild.hours > 0) {
                timeToBuild.hours -= 1;
                timeToBuild.minutes = 59;
                timeToBuild.seconds = 59;
              }

              console.log(
                `Tiempo restante: ${timeToBuild.hours} horas, ${timeToBuild.minutes} minutos, ${timeToBuild.seconds} segundos`
              );
              setCountdown(
                `${timeToBuild.hours}:${timeToBuild.minutes}:${timeToBuild.seconds}`
              );
            } else {
              clearInterval(countdownInterval);
              updateResourcesAndLevel(
                plantType,
                metal,
                crystal,
                deuterium,
                metalCost,
                crystalCost,
                deuteriumCost
              );
            }
          }, 1000)
        );
      } else {
        console.log(
          `Recursos insuficientes para actualizar la planta de ${plantType}`
        );
        setUpdateInProgress(false);
      }
    } catch (error) {
      console.error(`Error updating ${plantType} plant:`, error);
      alert('Failed to update plant. Please try again.');
      setUpdateInProgress(false);
    }
  };

  const handleOnClickCancel = () => {
    console.log('Cancelar proceso de actualización');
    clearInterval(countdownInterval);
    setCountdown('');
    setUpdateInProgress(false);
  };

  //todo Regresa un nivel para atras, necesita un costo.
  const handleOnClickDestroy = () => {
    console.log('Destruir la instalación');
  };

  const updateResourcesAndLevel = async (
    plantType,
    metal,
    crystal,
    deuterium,
    metalCost,
    crystalCost,
    deuteriumCost
  ) => {
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
      updateInstallationCurrentLevel(plantType),
    ]);

    console.log(`Planta de ${plantType} actualizada`);
    setCountdown('');
    setUpdateInProgress(false);
  };

  const updateAllResources = async (updatedResources) => {
    try {
      await updateResourceValue(updatedResources);
      console.log(
        'Actualizando la cantidad de recursos en tu sistema:',
        JSON.stringify(updatedResources, null, 2)
      );
    } catch (error) {
      console.error('Error al actualizar la cantidad de recursos:', error);
    }
  };

  const fetchResource = async () => {
    try {
      const resources = await getResourceValues();
      console.log('Cantidad de recursos:', JSON.stringify(resources, null, 2));
      return resources;
    } catch (error) {
      console.error('Error al obtener los valores de recursos:', error);
      throw error;
    }
  };

  return (
    // todo Esto esta presentado solo para una instalacion. Se debe de restructurar
    <>
      <InstallationSupplies
        // Tipo de instalacion
        plantType='metalMine'
        // Caclulo de costes para las Mina de Metal.
        metalCost={Math.round(
          calculateSpecificInstallationCost(
            'metalMine',
            resourceCurrentLevels.metalMine + 1
          ).metalCost
        )}
        crystalCost={Math.round(
          calculateSpecificInstallationCost(
            'metalMine',
            resourceCurrentLevels.metalMine + 1
          ).crystalCost
        )}
        deuteriumCost={Math.round(
          calculateSpecificInstallationCost(
            'metalMine',
            resourceCurrentLevels.metalMine + 1
          ).deuteriumCost
        )}
        // Nivel de la Mina de Metal.
        currentLevel={resourceCurrentLevels.metalMine}
        // Temporizador
        countdown={countdown}
        // () => handleOnClickUpdate([plantType])
        onClickUpdate={() => handleOnClickUpdate('metalMine')}
        onClickCancel={() => handleOnClickCancel()}
        onClickDestroy={() => handleOnClickDestroy('metalMine')}
      />
    </>
  );
};
