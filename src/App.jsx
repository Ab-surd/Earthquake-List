import Map from './components/Map'
import EarthquakeList from './components/EarthquakeList';
import './App.css';

function App() {
  return (
    <>
      <Map />
      <div id="sidebar-container">
        <div id="sidebar">
          <EarthquakeList />
        </div>
      </div>
    </>
  )
}

export default App;
