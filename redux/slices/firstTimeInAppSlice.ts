import { createSlice } from '@reduxjs/toolkit'

export const isFirstTimeInAppSlice = createSlice({
  name: 'isFirstTimeInApp',
  initialState: {
    value: true
  },
  reducers: {
    toggle: state => {
      state.value = !state.value
    }
  }
})

export const { toggle } = isFirstTimeInAppSlice.actions

export default isFirstTimeInAppSlice.reducer