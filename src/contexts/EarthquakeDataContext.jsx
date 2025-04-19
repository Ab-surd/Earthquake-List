import { useEffect, useState, createContext } from 'react';

export const EarthquakeContext = createContext();

function EarthquakeContextProvider({ children }) {
    const [earthquakes, setEarthquakes] = useState([]);

    useEffect(function() {
        async function getEarthquakeData() {
            try {
                const response = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson");
                const collection = await response.json();
                setEarthquakes(collection.features); //"features" is just the list of earthquakes
            } 
            catch(error) {
                console.error("Could not fetch geojson data: ", error);
            }
        }
        
        getEarthquakeData();
    }, [])

    return (
        <EarthquakeContext.Provider value={earthquakes}>
            {children}
        </EarthquakeContext.Provider>
    )
}

export default EarthquakeContextProvider;