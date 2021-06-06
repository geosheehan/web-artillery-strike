import { createSlice } from '@reduxjs/toolkit';
import { initialState, reducers } from './locationSlice';

const targetSlice = createSlice({
   name: 'target',
   initialState: initialState.map(x => x),
   reducers: { ...reducers }
})

export const { DISTANCE_SAVE, AZIMUTH_SAVE } = targetSlice.actions;
export default targetSlice.reducer;