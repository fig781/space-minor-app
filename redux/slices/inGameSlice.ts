import { createSlice } from '@reduxjs/toolkit'

export const isInGameSlice = createSlice({
  name: 'isInGame',
  initialState: {
    value: false
  },
  reducers: {
    toggle: state => {
      state.value = !state.value
    }
  }
})

export const { toggle } = isInGameSlice.actions

export default isInGameSlice.reducer