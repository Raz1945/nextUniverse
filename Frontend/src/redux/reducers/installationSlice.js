import { createSlice } from '@reduxjs/toolkit';

// // estado inicial de las instalaciones
// const initialState = {
//   metalMine: {
//     ecoUniverse: 6,
//     level: 0,
//     metalCost: 0,
//     crystalCost: 0,
//     deuteriumCost: 0,
//     timeToBuild: 0,
//     endTime: 0,
//     countdown: '',
//     updateInProgress: false,
//   },
//   crystalMine: {
//     ecoUniverse: 6,
//     level: 0,
//     metalCost: 0,
//     crystalCost: 0,
//     deuteriumCost: 0,
//     timeToBuild: 0,
//     endTime: 0,
//     countdown: '',
//     updateInProgress: false,
//   },
//   deuteriumSynthesizer: {
//     ecoUniverse: 6,
//     level: 0,
//     metalCost: 0,
//     crystalCost: 0,
//     deuteriumCost: 0,
//     timeToBuild: 0,
//     endTime: 0,
//     countdown: '',
//     updateInProgress: false,
//   },
//   solarPowerPlant: {
//     level: 0,
//     metalCost: 0,
//     crystalCost: 0,
//     deuteriumCost: 0,
//     timeToBuild: 0,
//     endTime: 0,
//     countdown: '',
//     updateInProgress: false,
//   },
//   // otras instalaciones
// };


// Estado inicial común para ecoUniverse
const commonEcoUniverse = {
  ecoUniverse: 6,
  level: 0,
  metalCost: 0,
  crystalCost: 0,
  deuteriumCost: 0,
  timeToBuild: 0,
  endTime: 0,
  countdown: '',
  updateInProgress: false,
};

const initialState = {
  metalMine: { ...commonEcoUniverse },
  crystalMine: { ...commonEcoUniverse },
  deuteriumSynthesizer: { ...commonEcoUniverse },
  solarPowerPlant: {
    level: 0,
    metalCost: 0,
    crystalCost: 0,
    deuteriumCost: 0,
    timeToBuild: 0,
    endTime: 0,
    countdown: '',
    updateInProgress: false,
  },
  // otras instalaciones
};

const installationSlice = createSlice({
  name: 'installation',
  initialState,
  reducers: {
    // actualiza el nivel de una instalación
    updateLevel(state, action) {
      // obtenemos el tipo y el nivel de la instalación desde la acción
      const { plantType, level } = action.payload;
      // actualizamos el nivel de la instalación correspondiente en el estado
      state[plantType].level = level;
    },
    // actualiza el costo de una instalación
    updateCost(state, action) {
      // obtenemos el tipo y el costo de la instalación desde la acción
      const { plantType, metalCost, crystalCost, deuteriumCost } =
        action.payload;
      // actualizamos el costo de la instalación correspondiente en el estado
      state[plantType].metalCost = metalCost;
      state[plantType].crystalCost = crystalCost;
      state[plantType].deuteriumCost = deuteriumCost;
    },
    // actualiza el tiempo de construcción de una instalación
    updateTime(state, action) {
      // obtenemos el tipo, el tiempo y la hora de finalización de la instalación desde la acción
      const { plantType, timeToBuild, endTime } = action.payload;
      // actualizamos el tiempo de construcción de la instalación correspondiente en el estado
      state[plantType].timeToBuild = timeToBuild;
      state[plantType].endTime = endTime;
    },
    // actualiza el contador de una instalación
    updateCountdown(state, action) {
      // obtenemos el tipo y el contador de la instalación desde la acción
      const { plantType, countdown } = action.payload;
      // actualizamos el contador de la instalación correspondiente en el estado
      state[plantType].countdown = countdown;
    },
    // actualiza el estado de progreso de una instalación
    updateProgress(state, action) {
      // obtenemos el tipo y el estado de progreso de la instalación desde la acción
      const { plantType, updateInProgress } = action.payload;
      // actualizamos el estado de progreso de la instalación correspondiente en el estado
      state[plantType].updateInProgress = updateInProgress;
    },
    // cancela el proceso de actualización de una instalación
    cancelUpdate(state, action) {
      // obtenemos el tipo de la instalación desde la acción
      const { plantType } = action.payload;
      // reseteamos el contador, el tiempo y el estado de progreso de la instalación correspondiente en el estado
      state[plantType].countdown = '';
      state[plantType].timeToBuild = 0;
      state[plantType].updateInProgress = false;
    },
    // destruye una instalación
    destroyInstallation(state, action) {
      // obtenemos el tipo de la instalación desde la acción
      const { plantType } = action.payload;
      // reseteamos el nivel, el costo, el contador, el tiempo y el estado de progreso de la instalación correspondiente en el estado
      state[plantType].level = 0;
      state[plantType].metalCost = 0;
      state[plantType].crystalCost = 0;
      state[plantType].deuteriumCost = 0;
      state[plantType].countdown = '';
      state[plantType].timeToBuild = 0;
      state[plantType].updateInProgress = false;
    },
    // otros reducers
  },
});

export default installationSlice;

export const {
  updateLevel,
  updateCost,
  updateTime,
  updateCountdown,
  updateProgress,
  cancelUpdate,
  destroyInstallation,
} = installationSlice.actions;
