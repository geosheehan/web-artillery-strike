
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './style.css';

const LocationButton = ({ id, name, selected, renaming, onClick }) => {
   if (renaming) {
      return (
         <input
            autoFocus
            type='text'
            variant='filled'
            defaultValue={name}
         // onBlur={}
         // onFocus={}
         />
      );
   }

   return (
      <button
         color='primary'
         variant='contained'
         className={selected ? 'selected' : ''}
         onClick={() => onClick(id)}
      // onDoubleClick={}
      >
         {name}
      </button>
   );
}

export default LocationButton;