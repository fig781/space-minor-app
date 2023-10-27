import { createSlice } from '@reduxjs/toolkit';

export const pagesStateSlice = createSlice({
  name: 'pagesState',
  initialState: {
    isInGame: false,
    isFirstTimeInApp: false
  },
  reducers: {
    toggleIsInGame: state => {
      state.isInGame = !state.isInGame;
    },
    toggleFirstTimeInApp: state => {
      state.isFirstTimeInApp = !state.isFirstTimeInApp;
    }
  }
})

export const { toggleIsInGame, toggleFirstTimeInApp } = pagesStateSlice.actions;

export default pagesStateSlice.reducer;