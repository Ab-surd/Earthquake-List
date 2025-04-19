import EarthquakeContextProvider from './contexts/EarthquakeDataContext';
import FilterItem from './components/FilterItem';
import Map from './components/Map'
import EarthquakeList from './components/EarthquakeList';
import './App.css';

function App() {
  return (
    <>
      <EarthquakeContextProvider>
        <Map />
        <div id="sidebar-container">
          <div id="sidebar">
            <div id="header">
              <h1>Recent Earthquakes</h1>
              <h3>Past 24 Hours</h3>
              <div id="filter-container">
                <FilterItem name="Filter"/>
                <FilterItem name="Sort"/>
              </div>
            </div>
            <div id="list-container">
              <EarthquakeList />
            </div>
          </div>
        </div>
      </EarthquakeContextProvider>
    </>
  )
}

export default App;
