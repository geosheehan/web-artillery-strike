
const CoordinateDisplay = ({ title, result }) => {
   return (
      <>
         <span>{title}: </span>
         <h1>{parseFloat(result).toFixed(1)}</h1>
      </>
   )
}

export default CoordinateDisplay;
