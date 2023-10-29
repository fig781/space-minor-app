import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    solarSystemIdsUnlocked: [0]
  },
  reducers: {
    unlockNewSolarSystem: (state: any, action: any) => {
      state.solarSystemIdsUnlocked.push(action.payload);
    }
  }
})

export const { unlockNewSolarSystem } = gameSlice.actions;

export default gameSlice.reducer;