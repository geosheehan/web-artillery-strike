
import TextField from '@material-ui/core/TextField';

const CoordinateInput = ({ min, max, value, name, onChange }) => {
   return (
      <>
         <TextField
            type='number'
            label={name}
            inputProps={{
               min,
               max,
               value,
            }}
            onChange={(e) => onChange(e.target.value)}
         />
      </>
   )
}

export default CoordinateInput;