import { createSlice } from '@reduxjs/toolkit';
import { initialState, reducers } from './locationSlice';

const friendlySlice = createSlice({
   name: 'friendly',
   initialState: initialState.map(x => x),
   reducers: { ...reducers }
})

export const { DISTANCE_SAVE, AZIMUTH_SAVE } = friendlySlice.actions;
export default friendlySlice.reducer;