import { configureStore } from '@reduxjs/toolkit';

import targetReducer from './targetSlice';
import friendlyReducer from './targetSlice';

export const store = configureStore({
  reducer: {
    target: targetReducer,
    friendly: friendlyReducer
  },
});
