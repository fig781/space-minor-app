import { createSlice } from '@reduxjs/toolkit';

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
    }
  }
})

export const {
  toggleOptionsMenu,
  toggleEquipmentMenu,
  toggleInventoryMenu,
  toggleSolarSystemMenu,
  toggleEndScreen
} = gameMenuSlice.actions;

export default gameMenuSlice.reducer;