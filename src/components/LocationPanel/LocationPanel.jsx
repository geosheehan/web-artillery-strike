
import LocationButton from './LocationButton/LocationButton';
import CoordinateInput from '../CoordinateInput/CoordinateInput';

const LocationPanel = ({ group, title }) => {
   const findSelected = button => button.selected;
   const dispatch = useDispatch();

   const buttons = useSelector((state) => {
      console.log({ state, group });
      return state[group]
   });
   const selected = buttons.find(findSelected);

   const updateDistance = (distance) => {
      const id = buttons.findIndex(findSelected);
      return dispatch(module.DISTANCE_SAVE({ id, value: +distance }));
   }

   const updateAzimuth = (azimuth) => {
      const id = buttons.findIndex(findSelected);
      return dispatch(module.AZIMUTH_SAVE({ id, value: +azimuth }));
   }

   const selectLocation = (id) => {};

   return (
      <section id={group}>
         <h1>{title} positions</h1>
         <div className="btn-list">
            {
               buttons.map((button, i) => (
                  <LocationButton
                     key={i}
                     id={i}
                     name={button.name}
                     selected={button.selected}
                     renaming={button.renaming}
                     onClick={selectLocation}
                  />
               ))
            }
         </div>

         <CoordinateInput name={'distance'} min={1} max={1000} value={selected.distance} onChange={updateDistance} />
         <CoordinateInput name={'azimuth'} min={0} max={359} value={selected.azimuth} onChange={updateAzimuth} />
      </section>
   )
}

export default LocationPanel
