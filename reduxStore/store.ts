import { configureStore, combineReducers, createListenerMiddleware } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// Import all the slices here
import pagesStateSlice from "./slices/pagesStateSlice";
import gameSlice, { addToCurrentInventory, setInGameCurrentCargoAmount, removeFromCurrentInventory } from "./slices/gameSlice";
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

const listenerMiddleware = createListenerMiddleware()
listenerMiddleware.startListening({
  actionCreator: addToCurrentInventory,
  effect: async (action, listenerApi) => {
    const state: any = listenerApi.getState();

    if (state?.game?.inGameCurrentInventory?.length === 0) return;
    const inv = state?.game?.inGameCurrentInventory;

    let cargoAmount = 0;
    for (let item of inv) {
      cargoAmount += item.count * item.item.mass;
    }

    listenerApi.dispatch(setInGameCurrentCargoAmount(cargoAmount));
  },
})

listenerMiddleware.startListening({
  actionCreator: removeFromCurrentInventory,
  effect: async (action, listenerApi) => {
    const state: any = listenerApi.getState();

    if (state?.game?.inGameCurrentInventory?.length === 0) return;
    const inv = state?.game?.inGameCurrentInventory;

    let cargoAmount = 0;
    for (let item of inv) {
      cargoAmount += item.count * item.item.mass;
    }

    listenerApi.dispatch(setInGameCurrentCargoAmount(cargoAmount));
  },
})

const rootReducer = combineReducers({
  gameMenu: gameMenuSlice,
  game: persistReducer(gameConfig, gameSlice),
  pagesState: persistReducer(pagesStateConfig, pagesStateSlice),
  mainMenu: persistReducer(mainMenuConfig, mainMenuSlice),
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }).prepend(listenerMiddleware.middleware)
})

export const persistor = persistStore(store);