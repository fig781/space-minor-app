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
    money: 1000, // persist
    selectedSolarSystem: null,
    selectedPlanet: null,
    selectedPlanetIdInMenu: null,
    currentScenario: null,
    inGameCurrentInventory: [],
    inGameFuel: 0,
    inGameHull: 0,
    inGameEngine: 0,
    inGameDread: 0,
    inGameCargoCapacity: 0,
    inGameCurrentCargoAmount: 0,
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
    setInGameCargoCapacity: (state: any, action) => {
      state.inGameCargoCapacity = action.payload;
    },
    setInGameCurrentCargoAmount: (state: any, action) => {
      state.inGameCurrentCargoAmount = action.payload;
    },
    resetGameEndgameStates: (state: any) => {
      state.setSelectedSolarSystem = null;
      state.selectedPlanet = null;
      state.selectedPlanetIdInMenu = null;
      state.currentScenario = null;
      state.inGameCurrentInventory = [];
      state.inGameFuel = 0;
      state.inGameHull = 0;
      state.inGameEngine = 0;
      state.inGameDread = 0;
      state.inGameCurrentCargoAmount = 0;
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
    changeMoney: (state: any, action) => {
      if (state.money + action.payload < 0) {
        state.money = 0;
      } else {
        state.money = state.money + action.payload;
      }
    },
    changeInGameHull: (state: any, action) => {
      if (state.inGameHull + action.payload < 0) {
        state.inGameHull = 0;
      } else {
        state.inGameHull = state.inGameHull + action.payload;
      }
    },
    changeInGameFuel: (state: any, action) => {
      if (state.inGameFuel + action.payload < 0) {
        state.inGameFuel = 0;
      } else {
        state.inGameFuel = state.inGameFuel + action.payload;
      }
    },
    changeInGameEngine: (state: any, action) => {
      if (state.inGameEngine + action.payload < 0) {
        state.inGameEngine = 0;
      } else {
        state.inGameEngine = state.inGameEngine + action.payload;
      }
    },
    changeInGameDread: (state: any, action) => {
      if (state.inGameDread + action.payload < 0) {
        state.inGameDread = 0;
      } else {
        state.inGameDread = state.inGameDread + action.payload;
      }
    },
    addToCurrentInventory: (state: any, action) => {
      let inv: InventoryItem[] = state.inGameCurrentInventory;
      const payloadData: InventoryPayload[] = action.payload;

      for (let item of payloadData) {
        let indexOfItem = -1;

        for (let x = 0; x < inv.length; x++) {
          if (inv[x].item.id === item.item.id) {
            indexOfItem = x;
          }
        }

        if (indexOfItem > -1) {
          inv[indexOfItem].count = inv[indexOfItem].count + item.count;
        } else {
          inv.push({
            id: item.item.id,
            item: item.item,
            count: item.count,
          });
        }
      }
    },
    removeFromCurrentInventory: (state: any, action) => {
      // expects a positive count that you want to remove
      if (action.payload.length === 0) return;

      let inv: InventoryItem[] = state.inGameCurrentInventory;
      const payloadData: InventoryPayload[] = action.payload;

      for (let item of payloadData) {
        let indexOfItem = -1;

        for (let x = 0; x < inv.length; x++) {
          if (inv[x].item.id === item.item.id) {
            indexOfItem = x;
          }
        }

        if (indexOfItem === -1) {
          return
        } else if (inv[indexOfItem].count - item.count < 1) {
          inv = inv.splice(indexOfItem, 1);
        } else {
          inv[indexOfItem].count = inv[indexOfItem].count - item.count;
        }
      }
    }
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
  changeInGameFuel,
  changeInGameHull,
  changeInGameEngine,
  changeInGameDread,
  addToCurrentInventory,
  changeMoney,
  setInGameCargoCapacity,
  setInGameCurrentCargoAmount,
  removeFromCurrentInventory
} = gameSlice.actions;

export default gameSlice.reducer;
export const getSelectedSolarSystem = (state: any) => state.game.selectedSolarSystem;
export const getSelectedPlanet = (state: any) => state.game.selectedPlanet;
export const getSelectedPlanetIdInMenu = (state: any) =>
  state.game.selectedPlanetIdInMenu;
export const getCurrentScenario = (state: any) => state.game.currentScenario;
export const getPlanetIdsScanned = (state: any) => state.game.planetIdsScanned;
export const getInGameFuel = (state: any) => state.game.inGameFuel;
export const getInGameHull = (state: any) => state.game.inGameHull;
export const getInGameEngine = (state: any) => state.game.inGameEngine;
export const getInGameDread = (state: any) => state.game.inGameDread;
export const getCurrentInGameInventory = (state: any) =>
  state.game.inGameCurrentInventory;
export const getDiscoveredOnPlanets = (state: any) => state.game.discoveredOnPlanets;
export const getMoney = (state: any) => state.game.money;
export const getInGameCargoCapacity = (state: any) => state.game.inGameCargoCapacity;
export const getInGameCurrentCargoAmount = (state: any) => state.game.inGameCurrentCargoAmount;

// for testing game inventory
// [
//   {
//     id: 0,
//     item: {
//       id: 0,
//       name: 'test1mineral',
//       icon: require('../../assets/GameIcons/Items/Icon1.png'),
//       description: 'testdescription',
//       type: 'mineral',
//       difficulty: 20,
//     },
//     count: 20
//   },
//   {
//     id: 1,
//     item: {
//       id: 0,
//       name: 'test1mineral',
//       icon: require('../../assets/GameIcons/Items/Icon1.png'),
//       description: 'testdescription',
//       type: 'mineral',
//       difficulty: 20,
//     },
//     count: 20
//   },
//   {
//     id: 2,
//     item: {
//       id: 0,
//       name: 'test1mineral',
//       icon: require('../../assets/GameIcons/Items/Icon1.png'),
//       description: 'testdescription',
//       type: 'mineral',
//       difficulty: 20,
//     },
//     count: 20
//   },
//   {
//     id: 3,
//     item: {
//       id: 0,
//       name: 'test1mineral',
//       icon: require('../../assets/GameIcons/Items/Icon1.png'),
//       description: 'testdescription',
//       type: 'mineral',
//       difficulty: 20,
//     },
//     count: 20
//   },
//   {
//     id: 4,
//     item: {
//       id: 0,
//       name: 'test1mineral',
//       icon: require('../../assets/GameIcons/Items/Icon1.png'),
//       description: 'testdescription',
//       type: 'mineral',
//       difficulty: 20,
//     },
//     count: 20
//   },
//   {
//     id: 5,
//     item: {
//       id: 0,
//       name: 'test1mineral',
//       icon: require('../../assets/GameIcons/Items/Icon1.png'),
//       description: 'testdescription',
//       type: 'mineral',
//       difficulty: 20,
//     },
//     count: 20
//   },
//   {
//     id: 6,
//     item: {
//       id: 0,
//       name: 'test1mineral',
//       icon: require('../../assets/GameIcons/Items/Icon1.png'),
//       description: 'testdescription',
//       type: 'mineral',
//       difficulty: 20,
//     },
//     count: 20
//   }
// ]