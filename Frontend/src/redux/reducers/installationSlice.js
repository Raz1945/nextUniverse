import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getInstallationCurrentLevel } from '../../functions/services/installationService/getInstallationCurrentLevel';

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

// Estado inicial
const initialState = {
  metalMine: { ...commonEcoUniverse },
  crystalMine: { ...commonEcoUniverse },
  deuteriumSynthesizer: { ...commonEcoUniverse },
  solarPowerPlant: { ...commonEcoUniverse },
  loading: false,
  error: null,
};

// Thunk para obtener niveles desde el backend
export const fetchInstallationLevels = createAsyncThunk(
  'installation/fetchCurrentLevel',
  async (_, { rejectWithValue }) => {
    try {
      const levels = await getInstallationCurrentLevel(); // { metalMine: 10, crystalMine: 5, ... }
      console.log('Niveles recibidos desde el backend:', levels); // Debugging 
      return levels;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const installationSlice = createSlice({
  name: 'installation',
  initialState,
  reducers: {
    updateLevel(state, action) {
      const { plantType, level } = action.payload;
      state[plantType].level = level;
    },
    updateCost(state, action) {
      const { plantType, metalCost, crystalCost, deuteriumCost } = action.payload;
      state[plantType].metalCost = metalCost;
      state[plantType].crystalCost = crystalCost;
      state[plantType].deuteriumCost = deuteriumCost;
    },
    updateTime(state, action) {
      const { plantType, timeToBuild, endTime } = action.payload;
      state[plantType].timeToBuild = timeToBuild;
      state[plantType].endTime = endTime;
    },
    updateCountdown(state, action) {
      const { plantType, countdown } = action.payload;
      state[plantType].countdown = countdown;
    },
    updateProgress(state, action) {
      const { plantType, updateInProgress } = action.payload;
      state[plantType].updateInProgress = updateInProgress;
    },
    cancelUpdate(state, action) {
      const { plantType } = action.payload;
      state[plantType].countdown = '';
      state[plantType].timeToBuild = 0;
      state[plantType].updateInProgress = false;
    },
    destroyInstallation(state, action) {
      const { plantType } = action.payload;
      state[plantType] = { ...commonEcoUniverse };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstallationLevels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstallationLevels.fulfilled, (state, action) => {
        const levels = action.payload;
        for (let plantType in levels) {
          if (state[plantType]) {
            state[plantType].level = levels[plantType];
          }
        }
        state.loading = false;
      })
      .addCase(fetchInstallationLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Error al cargar niveles:', action.payload);
      });
  },
});

export default installationSlice.reducer;

export const {
  updateLevel,
  updateCost,
  updateTime,
  updateCountdown,
  updateProgress,
  cancelUpdate,
  destroyInstallation,
} = installationSlice.actions;
