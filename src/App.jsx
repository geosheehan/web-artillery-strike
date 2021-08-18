import { Container } from '@material-ui/core';
import LocationPanel from './components/LocationPanel/LocationPanel';
import ResultPanel from './components/ResultPanel/ResultPanel';

function App() {
	return (
		<Container className="App" component="main" maxWidth="lg">
			<ResultPanel distance={1} azimuth={0} />
			<LocationPanel group={'target'} title={'target'} />
			<LocationPanel group={'friendly'} title={'friendly'} />
		</Container>
	);
}

export default App;
