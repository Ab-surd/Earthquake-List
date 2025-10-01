import EarthquakeContextProvider from './context/DataContext.jsx';
import Accordion from './components/Accordion.jsx';
import List from './components/List.jsx';
import Map from './components/Map.jsx';
import './App.css';

function App() {
  return (
    <>
      <EarthquakeContextProvider>
        <Map />
        <div id="sidebar-container">
          <div id="sidebar">
            <div id="header">
              {/* title */}
              <h1>Recent Earthquakes</h1>
              <div id="filter-container">
                {/* filters components */}
                <Accordion content="Filter" />
                <Accordion content="Sort" />
              </div>
            </div>
            {/* list component */}
            <List />
          </div>
        </div>
      </EarthquakeContextProvider>
    </>
  )
}

export default App;
