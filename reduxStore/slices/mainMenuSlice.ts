import { createSlice } from '@reduxjs/toolkit';
import { InventoryPayload, InventoryItem } from '../../utils/types/inventoryItem.interface';
// Used for all main menu data
export const mainMenuSlice = createSlice({
  name: 'mainMenu',
  initialState: {
    mainInventory: [], //persist
    selectedSolarSystemIdInMenu: null,
  },
  reducers: {
    setSelectedSolarSystemIdInMenu: (state: any, action) => {
      state.selectedSolarSystemIdInMenu = action.payload;
    },
    addToMainInventory: (state: any, action) => {
      if (action.payload.length === 0) return;

      let inv: InventoryItem[] = state.mainInventory;
      const payloadData: InventoryPayload[] = action.payload;

      for (let item of payloadData) {
        let indexOfItem = -1;

        for (let x = 0; x < inv.length; x++) {
          if (inv[x].item.id === item.item.id) {
            indexOfItem = x;
          }
        }

        if (indexOfItem > -1) {
          inv[indexOfItem].count = inv[indexOfItem].count + item.count;
        } else {
          inv.push({
            id: item.item.id,
            item: item.item,
            count: item.count,
          });
        }
      }
    },
    removeFromMainInventory: (state: any, action) => {
      // expects a positive count that you want to remove
      if (action.payload.length === 0) return;

      let inv: InventoryItem[] = state.mainInventory;
      const payloadData: InventoryPayload[] = action.payload;

      for (let item of payloadData) {
        let indexOfItem = -1;

        for (let x = 0; x < inv.length; x++) {
          if (inv[x].item.id === item.item.id) {
            indexOfItem = x;
          }
        }

        if (indexOfItem === -1) {
          return
        } else if (inv[indexOfItem].count - item.count < 1) {
          inv = inv.splice(indexOfItem, 1);
        } else {
          inv[indexOfItem].count = inv[indexOfItem].count - item.count;
        }
      }
    }
  }
})

export const {
  setSelectedSolarSystemIdInMenu,
  addToMainInventory,
  removeFromMainInventory
} = mainMenuSlice.actions;

export default mainMenuSlice.reducer;
export const getSelectedSolarSystemIdInMenu = (state: any) => state.mainMenu.selectedSolarSystemIdInMenu;
export const getMainInventory = (state: any) => state.mainMenu.mainInventory;
