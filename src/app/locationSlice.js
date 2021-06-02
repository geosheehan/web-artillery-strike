import { createSlice } from '@reduxjs/toolkit';

const MAX_BUTTONS = 6;

export const locationSlice = createSlice({
   name: 'location',
   initialState: [...Array(MAX_BUTTONS)].map(
      (_, id) => ({
         id,
         name: `location ${id + 1}`,
         selected: id === 0,
         renaming: false,
         location: {
            distance: 1,
            azimuth: 0,
         },
         default: true,
      })
   ),
   reducers: {
      selectLocation = (state, action) => {
         const current = state[action.payload]
      }
   }

})