import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// Import all the slices here
import pagesStateSlice from "./slices/pagesStateSlice";


// If there are weird bugs with closing and opening the app, may need
// to change the merging level

// Setting up blacklist https://github.com/rt2zz/redux-persist#nested-persists
const persistConfig = {
  key: 'root',
  storage: storage,
  // Do not want persisted
  blacklist: [
    'pagesState'
  ]
}

const pagesStateConfig = {
  key: 'pagesState',
  storage: storage,
  blacklist: ['isInGame']
}

const rootReducer = combineReducers({
  // isFirstTimeInApp: isFirstTimeInAppSlice,
  pagesState: persistReducer(pagesStateConfig, pagesStateSlice)
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store);