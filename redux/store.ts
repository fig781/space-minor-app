import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Import all the slices here
import isFirstTimeInAppSlice from "./slices/firstTimeInAppSlice";
import isInGameSlice from "./slices/inGameSlice";


// If there are weird bugs with closing and opening the app, may need
// to change the merging level
const persistConfig = {
  key: 'root',
  storage: storage,
  // Do not want persisted
  blacklist: [
    'isInGame'
  ]
}

const rootReducer = combineReducers({
  isFirstTimeInApp: isFirstTimeInAppSlice,
  isInGame: isInGameSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store);