import { createSlice } from '@reduxjs/toolkit';

// Used for in game data
export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    solarSystemIdsUnlocked: [0],
    selectedSolarSystem: null,
    selectedPlanet: null,
    selectedPlanetIdInMenu: null,
    currentScenario: null
  },
  reducers: {
    unlockNewSolarSystem: (state: any, action: any) => {
      state.solarSystemIdsUnlocked.push(action.payload);
    },
    setSelectedSolarSystem: (state: any, action) => {
      state.selectedSolarSystem = action.payload;
    },
    setSelectedPlanet: (state: any, action) => {
      state.selectedPlanet = action.payload;
    },
    setSelectedPlanetIdInMenu: (state: any, action) => {
      state.selectedPlanetIdInMenu = action.payload;
    },
    setCurrentScenario: (state: any, action) => {
      state.currentScenario = action.payload;
    }
  }
})

export const {
  unlockNewSolarSystem,
  setSelectedSolarSystem,
  setSelectedPlanet,
  setSelectedPlanetIdInMenu,
  setCurrentScenario
} = gameSlice.actions;

export default gameSlice.reducer;
export const getSelectedSolarSystem = (state: any) => state.game.selectedSolarSystem;
export const getSelectedPlanet = (state: any) => state.game.selectedPlanet;
export const getSelectedPlanetIdInMenu = (state: any) => state.game.selectedPlanetIdInMenu;
export const getCurrentScenario = (state: any) => state.game.currentScenario;