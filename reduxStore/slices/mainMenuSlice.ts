import { createSlice } from '@reduxjs/toolkit';

// Used for all main menu data
export const mainMenuSlice = createSlice({
  name: 'mainMenu',
  initialState: {
    selectedSolarSystemIdInMenu: null
  },
  reducers: {
    setSelectedSolarSystemIdInMenu: (state: any, action) => {
      state.selectedSolarSystemIdInMenu = action.payload;
    }
  }
})

export const {
  setSelectedSolarSystemIdInMenu
} = mainMenuSlice.actions;

export default mainMenuSlice.reducer;
export const getSelectedSolarSystemIdInMenu = (state: any) => state.mainMenu.selectedSolarSystemIdInMenu;
