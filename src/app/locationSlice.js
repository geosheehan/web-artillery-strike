const MAX_BUTTONS = 6;

export const initialState = [...Array(MAX_BUTTONS)].map(
   (_, id) => ({
      name: `location ${id + 1}`,
      selected: id === 0,
      renaming: false,
      default: true,
      distance: 1,
      azimuth: 0,
   })
)

export const reducers = {
   DISTANCE_SAVE: (state, action) => {
      return state.map((button, index) => {
         if (index === action.payload.id) {
            return {
               ...button,
               distance: action.payload.value
            }
         }
         return button;
      });
   },
   AZIMUTH_SAVE: (state, action) => {
      return state.map((button, index) => {
         if (index === action.payload.id) {
            return {
               ...button,
               azimuth: action.payload.value
            }
         }
         return button;
      });
   }
}