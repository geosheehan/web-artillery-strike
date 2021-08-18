
import CoordinateDisplay from '../CoordinateDisplay/CoordinateDisplay';

const ResultPanel = ({ distance, azimuth }) => {
   return (
      <section>
         <h1>result vector</h1>
         <CoordinateDisplay title={'distance'} result={distance} />
         <CoordinateDisplay title={'azimuth'} result={azimuth} />
      </section>
   );
}

export default ResultPanel;
