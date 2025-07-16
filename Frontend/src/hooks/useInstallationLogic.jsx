// importamos los hooks useEffect y useState de react
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
  // usamos el hook useState para crear un estado local que guarda el intervalo del contador
  const [countdownInterval, setCountdownInterval] = useState(null);

  // usamos el hook useEffect para obtener los niveles de las instalaciones y lso costos de la misma, cuando se monta el componente
  useEffect(() => {
    fetchInstallationLevels();
    fetchInitialCost();
    // calculateAndUpdateTimeBuild();
  }, []);


  const fetchInstallationLevels = async () => {
    try {
      const { resource: levels } = await getInstallationCurrentLevel();
      // console.log('Niveles obtenidos:', levels);

      for (let plantType in levels) {
        if (installationState[plantType] !== undefined) {
          // console.log(`Actualizando nivel para ${plantType} a ${levels[plantType]}`);
          dispatch(updateLevel({ plantType, level: levels[plantType] }));
          // console.log(`Nivel actualizado para ${plantType}`);
        } else {
          console.warn(`Estado de instalación no encontrado para el tipo de planta: ${plantType}`);
        }
      }
    } catch (error) {
      console.error('Error al obtener los niveles de instalación', error);
    }
  };


  const fetchInitialCost = async () => {
    try {
      for (let plantType in installationState) {
        const currentLevel = installationState[plantType].level;
        // console.log(`Current Level for ${plantType}:`, currentLevel);

        const nextLevel = currentLevel + 1;
        // console.log(`Next Level for ${plantType}:`, nextLevel);

        let { metalCost, crystalCost, deuteriumCost } = calculateSpecificInstallationCost(
          plantType,
          nextLevel
        );

        metalCost = numberWithSeparator(Math.round(metalCost))
        crystalCost = numberWithSeparator(Math.round(crystalCost))
        deuteriumCost = numberWithSeparator(Math.round(deuteriumCost))
        console.log(`Initial Cost for ${plantType}:`, { metalCost, crystalCost, deuteriumCost });

        // Actualizar el estado con la información obtenida
        dispatch(updateCost({ plantType, metalCost, crystalCost, deuteriumCost }));
      }
    } catch (error) {
      console.error('Error fetching initial cost:', error);
    }
  };




  // todo Falta probar la funcion 'calculateAndUpdateTimeBuild' 
  const calculateAndUpdateTimeBuild = async (plantType) => {
    try {
      for (let plantType in installationState) {
        const currentLevel = installationState[plantType].level;
        // console.log(`Current Level for ${plantType}:`, currentLevel);

        const nextLevel = currentLevel + 1;

        const { metalCost, crystalCost, deuteriumCost } = calculateSpecificInstallationCost(plantType, nextLevel);

        dispatch(updateCost({ plantType, metalCost, crystalCost, deuteriumCost }));
        const { ecoUniverse, metal, crystal, deuterium } = await fetchResource();

        if (metal >= metalCost && crystal >= crystalCost && deuterium >= deuteriumCost) {
          const { robotFactory, nanobotFactory } = installationState;

          const { timeToBuild, endTime } = calculateTimeBuild(
            ecoUniverse,
            metalCost,
            crystalCost,
            robotFactory,
            nanobotFactory
          );

          dispatch(updateTime({ plantType, timeToBuild, endTime }));

          console.log(`Tiempo de construcción estimado para ${plantType}: ${timeToBuild.hours} horas, ${timeToBuild.minutes} minutos, ${timeToBuild.seconds} segundos`);
          console.log(`Hora estimada de finalización: ${endTime}`);

          setCountdownInterval(setInterval(() => {
            const { hours, minutes, seconds } = installationState[plantType].timeToBuild;

            if (hours > 0 || minutes > 0 || seconds > 0) {
              let newHours = hours;
              let newMinutes = minutes;
              let newSeconds = seconds - 1;

              if (newSeconds === 0 && (newMinutes > 0 || newHours > 0)) {
                newMinutes -= 1;
                newSeconds = 59;
              }

              if (newMinutes === 0 && newHours > 0) {
                newHours -= 1;
                newMinutes = 59;
                newSeconds = 59;
              }

              dispatch(updateTime({ plantType, timeToBuild: { hours: newHours, minutes: newMinutes, seconds: newSeconds } }));
              dispatch(updateCountdown({ plantType, countdown: `${newHours}:${newMinutes}:${newSeconds}` }));
            } else {
              clearInterval(countdownInterval);
              updateResourcesAndLevel(plantType, metal, crystal, deuterium, metalCost, crystalCost, deuteriumCost);
            }
          }, 1000));
        } else {
          console.log(`Recursos insuficientes para actualizar la planta de ${plantType}`);
          dispatch(updateProgress({ plantType, updateInProgress: false }));
        }
      }
    } catch (error) {
      // console.error(`Error al actualizar la planta de ${plantType}:`, error);
      alert('No se pudo actualizar la planta. Por favor, inténtalo de nuevo.');
      dispatch(updateProgress({ plantType, updateInProgress: false }));
    }
  };



    const handleOnClickUpdate = async (plantType) => {
      const updateInProgress = installationState[plantType].updateInProgress;

      if (updateInProgress) {
        console.log('Ya hay una actualización en curso');
        return;
      }

      dispatch(updateProgress({ plantType, updateInProgress: true }));

      try {
        const { ecoUniverse, metal, crystal, deuterium } = await fetchResource();
        await fetchInstallationLevels();
        await fetchInitialCost();


        await calculateAndUpdateTimeBuild(plantType, ecoUniverse, metal, crystal, deuterium);
      } catch (error) {
        console.error('Error al procesar la actualización:', error);
      }
    };


    // definimos la función que maneja el evento onClickCancel de una instalación
    const handleOnClickCancel = (plantType) => {
      // terminamos el intervalo
      clearInterval(countdownInterval);
      // despachamos la acción cancelUpdate al store con el tipo de instalación
      dispatch(cancelUpdate({ plantType }));
    };


    // definimos la función que maneja el evento onClickDestroy de una instalación
    //todo Deberia de regresa un nivel hacia atras y necesita agregar un costo.
    const handleOnClickDestroy = (plantType) => {
      // despachamos la acción destroyInstallation al store con el tipo de instalación
      dispatch(destroyInstallation({ plantType }));
    };


    // definimos la función que actualiza los recursos y el nivel de una instalación
    const updateResourcesAndLevel = async (
      plantType,
      metal,
      crystal,
      deuterium,
      metalCost,
      crystalCost,
      deuteriumCost
    ) => {
      // calculamos los recursos actualizados restando el costo
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
      dispatch(
        updateCountdown({
          plantType,
          countdown: 0,
        })
      );
      dispatch(updateProgress({ plantType, updateInProgress: false }));
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


    return {
      handleOnClickUpdate,
      handleOnClickCancel,
      handleOnClickDestroy,
    };
  };

