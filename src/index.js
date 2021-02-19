import { unstable_createRoot } from 'react-dom';
import Homepage from './containers/Homepage.js';

function App() {
  return (
    <div className="App">
      <Homepage/>
    </div>
  );
}

unstable_createRoot(document.getElementById('root')).render(<App />);


