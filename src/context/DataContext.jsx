import { createContext, useEffect, useState, useContext } from 'react';
import { fetchAPIData } from '../services/api';

const EarthquakeContext = createContext();
export const useData = () => useContext(EarthquakeContext);

function EarthquakeContextProvider({ children }) {
    const [earthquakeData, setEarthquakeData] = useState([]);

    const [filters, setFilter] = useState({
        magnitude: 2.5,
        period: "day",
        sort: "date"
    });

    useEffect(() => {
        fetchAPIData(filters.period).then((data) => {
            const filteredResult = data.features.filter((earthquake) => (earthquake.properties.mag >= filters.magnitude))

            let sortedResult = filteredResult
            if (filters.sort == "date") {
                sortedResult = filteredResult.sort((a, b) => b.properties.time - a.properties.time)
            }
            if (filters.sort == "magnitude") {
                sortedResult = filteredResult.sort((a, b) => b.properties.mag - a.properties.mag)
            }
            if (filters.sort == "location") {
                //sort by location
            }

            setEarthquakeData(sortedResult)
        })
    }, [filters])

    return (
        <EarthquakeContext.Provider value={{ earthquakeData, filters, setFilter }}>
            {children}
        </EarthquakeContext.Provider>
    )
}

export default EarthquakeContextProvider;