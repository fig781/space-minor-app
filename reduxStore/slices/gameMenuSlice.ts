import { createSlice } from '@reduxjs/toolkit';

// Used for game menu data
export const gameMenuSlice = createSlice({
  name: 'gameMenu',
  initialState: {
    showOptionsMenu: false,
    showInventoryMenu: false,
    showSolarSystemMenu: false,
    showEquipmentMenu: false,
    showEndScreen: false,
  },
  reducers: {
    toggleOptionsMenu(state) {
      state.showOptionsMenu = !state.showOptionsMenu;
    },
    toggleInventoryMenu(state) {
      state.showInventoryMenu = !state.showInventoryMenu;
    },
    toggleSolarSystemMenu(state) {
      state.showSolarSystemMenu = !state.showSolarSystemMenu;
    },
    toggleEquipmentMenu(state) {
      state.showEquipmentMenu = !state.showEquipmentMenu;
    },
    toggleEndScreen(state) {
      state.showEndScreen = !state.showEndScreen;
    },
    resetGameMenuStates(state) {
      state.showOptionsMenu = false;
      state.showInventoryMenu = false;
      state.showSolarSystemMenu = false;
      state.showEquipmentMenu = false;
      state.showEndScreen = false;
    }
  }
})

export const {
  toggleOptionsMenu,
  toggleEquipmentMenu,
  toggleInventoryMenu,
  toggleSolarSystemMenu,
  toggleEndScreen,
  resetGameMenuStates
} = gameMenuSlice.actions;

export default gameMenuSlice.reducer;
export const getShowSolarSystemMenu = (state: any) => state.gameMenu.showSolarSystemMenu;
export const getShowInventoryMenu = (state: any) => state.gameMenu.showInventoryMenu;
