import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// Import all the slices here
import pagesStateSlice from "./slices/pagesStateSlice";
import gameSlice from "./slices/gameSlice";
import gameMenuSlice from "./slices/gameMenuSlice";
import mainMenuSlice from "./slices/mainMenuSlice";

// If there are weird bugs with closing and opening the app, may need
// to change the merging level

// Setting up blacklist https://github.com/rt2zz/redux-persist#nested-persists
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Do not want persisted
  blacklist: [
    'pagesState',
    'gameMenu',
    'mainMenu',
    'game'
  ]
}

const pagesStateConfig = {
  key: 'pagesState',
  storage: AsyncStorage,
  blacklist: ['isInGame'] //will not be persisted
}

const mainMenuConfig = {
  key: 'mainMenu',
  storage: AsyncStorage,
  blacklist: ['selectedExpeditionSolarId'] //will not be persisted
}

const gameConfig = {
  key: 'game',
  storage: AsyncStorage,
  blacklist: [
    'selectedSolarSystem',
    'selectedPlanet',
    'selectedPlanetIdInMenu',
    'currentScenario',
    'inGameCurrentInventory',
    'inGameFuel',
    'inGameHull',
    'inGameEngine',
    'inGameDread'
  ] //will not be persisted
}

const rootReducer = combineReducers({
  gameMenu: gameMenuSlice,
  game: persistReducer(gameConfig, gameSlice),
  pagesState: persistReducer(pagesStateConfig, pagesStateSlice),
  mainMenu: persistReducer(mainMenuConfig, mainMenuSlice),
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store);