import { createSlice } from '@reduxjs/toolkit';
import {
  InventoryItem,
  InventoryPayload,
} from '../../utils/types/inventoryItem.interface';
import { PlanetDiscoveries } from '../../utils/types/planet.interface';

// Used for in game data
export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    solarSystemIdsUnlocked: [0], //persist
    discoveredOnPlanets: [], // persist
    selectedSolarSystem: null,
    selectedPlanet: null,
    selectedPlanetIdInMenu: null,
    currentScenario: null,
    inGameCurrentInventory: [],
    inGameCurrentFuel: 0,
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
    },
    resetGameEndgameStates: (state: any) => {
      state.setSelectedSolarSystem = null;
      state.selectedPlanet = null;
      state.selectedPlanetIdInMenu = null;
      state.currentScenario = null;
      state.inGameCurrentInventory = [];
      state.inGameCurrentFuel = 0;
    },
    addToDiscoveredOnPlanets: (state: any, action) => {
      const payloadData: PlanetDiscoveries = action.payload;
      const planetDiscoveries: PlanetDiscoveries[] = state.discoveredOnPlanets;
      let existingPlanetIndex = -1;

      for (let x = 0; x < planetDiscoveries.length; x++) {
        if (planetDiscoveries[x].planetId === payloadData.planetId) {
          existingPlanetIndex = x;
        }
      }

      if (existingPlanetIndex > -1) {
        let discoveredItemsModified = planetDiscoveries[
          existingPlanetIndex
        ].itemIdsDiscovered.concat(payloadData.itemIdsDiscovered);
        discoveredItemsModified = [...new Set(discoveredItemsModified)];

        let discoveredAnomaliesModified = planetDiscoveries[
          existingPlanetIndex
        ].anomalieIdsDiscovered.concat(payloadData.anomalieIdsDiscovered);
        discoveredAnomaliesModified = [...new Set(discoveredAnomaliesModified)];

        planetDiscoveries[existingPlanetIndex].itemIdsDiscovered =
          discoveredItemsModified;
        planetDiscoveries[existingPlanetIndex].anomalieIdsDiscovered =
          discoveredAnomaliesModified;
      } else {
        planetDiscoveries.push(payloadData);
      }
    },
    increaseInGameCurrentFuel: (state: any, action) => {
      state.inGameCurrentFuel = state.inGameCurrentFuel + action.payload;
    },
    reduceInGameCurrentFuel: (state: any, action) => {
      if (state.inGameCurrentFuel - action.payload < 0) {
        state.inGameCurrentFuel = 0;
      } else {
        state.inGameCurrentFuel = state.inGameCurrentFuel - action.payload;
      }
    },
    addToCurrentInventory: (state: any, action) => {
      let inv: InventoryItem[] = state.inGameCurrentInventory;
      const payloadData: InventoryPayload = action.payload;
      let indexOfItem = -1;

      for (let x = 0; x < inv.length; x++) {
        if (inv[x].item.id === payloadData.item.id) {
          indexOfItem = x;
        }
      }

      if (indexOfItem > -1) {
        inv[indexOfItem].count = inv[indexOfItem].count + payloadData.count;
      } else {
        inv.push({
          id: payloadData.item.id,
          item: payloadData.item,
          count: payloadData.count,
        });
      }
    },
  },
});

export const {
  unlockNewSolarSystem,
  setSelectedSolarSystem,
  setSelectedPlanet,
  setSelectedPlanetIdInMenu,
  setCurrentScenario,
  resetGameEndgameStates,
  addToDiscoveredOnPlanets,
  increaseInGameCurrentFuel,
  reduceInGameCurrentFuel,
  addToCurrentInventory,
} = gameSlice.actions;

export default gameSlice.reducer;
export const getSelectedSolarSystem = (state: any) => state.game.selectedSolarSystem;
export const getSelectedPlanet = (state: any) => state.game.selectedPlanet;
export const getSelectedPlanetIdInMenu = (state: any) =>
  state.game.selectedPlanetIdInMenu;
export const getCurrentScenario = (state: any) => state.game.currentScenario;
export const getPlanetIdsScanned = (state: any) => state.game.planetIdsScanned;
export const getCurrentInGameFuel = (state: any) => state.game.inGameCurrentFuel;
export const getCurrentInGameInventory = (state: any) =>
  state.game.inGameCurrentInventory;
export const getDiscoveredOnPlanets = (state: any) => state.game.discoveredOnPlanets;
