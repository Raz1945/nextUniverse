import { useEffect, useState } from 'react';
import { calculateSpecificInstallationCost } from '../functions/calculateInstallationCost/calculateSpecificInstallationCost';
import { calculateTimeBuild } from '../functions/calculateInstallationCost/calculateTimeBuild';
import { getInstallationCurrentLevel } from '../functions/services/installationService/getInstallationCurrentLevel';
import { updateInstallationCurrentLevel } from '../functions/services/installationService/updateInstallationCurrentLevel';
import { getResourceValues } from '../functions/services/resourceService/getResourceValues';
import { updateResourceValue } from '../functions/services/resourceService/updateResourceValue';
import { numberWithSeparator } from '../functions/numberWithSeparator';

import {
  updateLevel,
  updateCost,
  updateTime,
  updateCountdown,
  updateProgress,
  cancelUpdate,
  destroyInstallation,
} from '../redux/reducers/installationSlice';

export const useInstallationLogic = (installationState, dispatch) => {
  const [countdownInterval, setCountdownInterval] = useState(null);

  useEffect(() => {
    fetchLevelsAndCosts();
    return () => clearInterval(countdownInterval); // limpiar el intervalo si el componente se desmonta
  }, []);

  // todo revisar.
  const fetchLevelsAndCosts = async () => {
    try {
      const levels = await getInstallationCurrentLevel();
      console.log('Niveles obtenidos:', levels);

      for (let plantType in levels) {
        if (!installationState[plantType]) continue;

        const level = levels[plantType];
        dispatch(updateLevel({ plantType, level }));

        const nextLevel = level + 1;
        let { metalCost, crystalCost, deuteriumCost } =
          calculateSpecificInstallationCost(plantType, nextLevel);

        dispatch(
          updateCost({
            plantType,
            metalCost: numberWithSeparator(Math.round(metalCost)),
            crystalCost: numberWithSeparator(Math.round(crystalCost)),
            deuteriumCost: numberWithSeparator(Math.round(deuteriumCost)),
          })
        );
      }
    } catch (error) {
      console.error('Error al obtener niveles y costos:', error);
    }
  };

  const calculateAndUpdateTimeBuild = async (
    plantType,
    ecoUniverse,
    metal,
    crystal,
    deuterium
  ) => {
    const currentLevel = installationState[plantType].level;
    const nextLevel = currentLevel + 1;

    const { metalCost, crystalCost, deuteriumCost } =
      calculateSpecificInstallationCost(plantType, nextLevel);

    const { robotFactory, nanobotFactory } = installationState;

    if (metal >= metalCost && crystal >= crystalCost && deuterium >= deuteriumCost) {
      const { timeToBuild, endTime } = calculateTimeBuild(
        ecoUniverse,
        metalCost,
        crystalCost,
        robotFactory,
        nanobotFactory
      );

      dispatch(updateCost({ plantType, metalCost, crystalCost, deuteriumCost }));
      dispatch(updateTime({ plantType, timeToBuild, endTime }));

      const interval = setInterval(() => {
        const current = installationState[plantType].timeToBuild;

        let { hours, minutes, seconds } = current;
        seconds -= 1;

        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }

        if (hours <= 0 && minutes <= 0 && seconds <= 0) {
          clearInterval(interval);
          setCountdownInterval(null);
          updateResourcesAndLevel(plantType, metal, crystal, deuterium, metalCost, crystalCost, deuteriumCost);
        } else {
          dispatch(updateTime({ plantType, timeToBuild: { hours, minutes, seconds } }));
          dispatch(updateCountdown({ plantType, countdown: `${hours}:${minutes}:${seconds}` }));
        }
      }, 1000);

      setCountdownInterval(interval);
    } else {
      console.log(`Recursos insuficientes para ${plantType}`);
      dispatch(updateProgress({ plantType, updateInProgress: false }));
    }
  };

  const handleOnClickUpdate = async (plantType) => {
    if (installationState[plantType].updateInProgress) {
      console.log('Actualización ya en curso');
      return;
    }

    dispatch(updateProgress({ plantType, updateInProgress: true }));

    try {
      const { ecoUniverse, metal, crystal, deuterium } = await fetchResource();
      await fetchLevelsAndCosts();

      await calculateAndUpdateTimeBuild(plantType, ecoUniverse, metal, crystal, deuterium);
    } catch (error) {
      console.error('Error al iniciar actualización:', error);
    }
  };

  const handleOnClickCancel = (plantType) => {
    clearInterval(countdownInterval);
    setCountdownInterval(null);
    dispatch(cancelUpdate({ plantType }));
  };

  const handleOnClickDestroy = (plantType) => {
    dispatch(destroyInstallation({ plantType }));
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
    const updatedResources = {
      metalProduction: metal - metalCost,
      crystalProduction: crystal - crystalCost,
      deuteriumProduction: deuterium - deuteriumCost,
    };

    await Promise.all([
      updateResourceValue(updatedResources),
      updateAllResources(updatedResources),
      updateInstallationCurrentLevel(plantType),
    ]);

    dispatch(updateCountdown({ plantType, countdown: 0 }));
    dispatch(updateProgress({ plantType, updateInProgress: false }));

    console.log(`Actualización completada para ${plantType}`);
  };

  const updateAllResources = async (resources) => {
    try {
      await updateResourceValue(resources);
      console.log('Recursos actualizados:', resources);
    } catch (error) {
      console.error('Error actualizando recursos:', error);
    }
  };

  const fetchResource = async () => {
    try {
      return await getResourceValues();
    } catch (error) {
      console.error('Error al obtener recursos:', error);
      throw error;
    }
  };

  return {
    handleOnClickUpdate,
    handleOnClickCancel,
    handleOnClickDestroy,
  };
};
