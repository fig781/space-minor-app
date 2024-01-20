import { createSlice } from '@reduxjs/toolkit';

// Used for important general global data
export const pagesStateSlice = createSlice({
  name: 'pagesState',
  initialState: {
    isInGame: false,
    isFirstTimeInApp: true,
    showIntroPage: false
  },
  reducers: {
    toggleIsInGame: (state: any) => {
      state.isInGame = !state.isInGame;
    },
    toggleFirstTimeInApp: (state: any) => {
      state.isFirstTimeInApp = !state.isFirstTimeInApp;
    },
    toggleShowIntroPage: (state: any) => {
      state.showIntroPage = !state.showIntroPage;
    }
  }
})

export const getIsFirstTimeInApp = (state: any) => state.pagesState.isFirstTimeInApp;
export const getIsInGame = (state: any) => state.pagesState.isInGame;
export const getShowIntroPage = (state: any) => state.pagesState.showIntroPage;

export const { toggleIsInGame, toggleFirstTimeInApp, toggleShowIntroPage } = pagesStateSlice.actions;

export default pagesStateSlice.reducer;