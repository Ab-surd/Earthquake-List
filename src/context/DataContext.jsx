import { createContext, useEffect, useState, useContext } from 'react';
import { fetchAPIData } from '../services/api';
import useUserLocation from '../hooks/useUserLocation';

const EarthquakeContext = createContext();
export const useData = () => useContext(EarthquakeContext);

//using harvesine formula & comparing distance in km
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6731 //radius of earth in km
    const TO_PI = Math.PI / 180

    return 2*R * Math.asin(Math.sqrt(
        Math.pow(Math.sin(((lat2 - lat1) * TO_PI) / 2), 2) + Math.cos(lat1 * TO_PI) * Math.cos(lat2 * TO_PI) * 
        Math.pow(Math.sin(((lon2 - lon1) * TO_PI) / 2), 2)))
}

function EarthquakeContextProvider({ children }) {

    const {latitude, longitude} = useUserLocation()

    const [earthquakeData, setEarthquakeData] = useState([]);
    const [currentEarthquake, setCurrentEarthquake] = useState();
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const [filters, setFilter] = useState({
        magnitude: 2.5,
        period: "day",
        sort: "date",
        order: "desc"
    });

    const getComparison = (smallerItem, largerItem) => {
        const order = filters.order
        if (order == "asc") {
            return smallerItem - largerItem
        }
        return largerItem - smallerItem
    }

    useEffect(() => {
        fetchAPIData(filters.period).then((data) => {
            //filter earthquakes
            const filteredResult = data.features.filter((earthquake) => (earthquake.properties.mag >= filters.magnitude))

            //sort earthquakes
            let sortedResult = filteredResult
            switch (filters.sort) {
                case "date": 
                    sortedResult = filteredResult.sort((a, b) => getComparison(a.properties.time, b.properties.time));
                    break;
                case "magnitude":
                    sortedResult = filteredResult.sort((a, b) => getComparison(a.properties.mag, b.properties.mag));
                    break;
                case "location":
                    sortedResult = filteredResult.sort((a, b) => {
                        const distA = calculateDistance(a.geometry.coordinates[1], a.geometry.coordinates[0], latitude, longitude)
                        const distB = calculateDistance(b.geometry.coordinates[1], b.geometry.coordinates[0], latitude, longitude)
                        return getComparison(distB, distA)
                    });
                    break;
            }

            setEarthquakeData(sortedResult)
        })
    }, [filters])

    return (
        <EarthquakeContext.Provider value={{ earthquakeData, filters, setFilter, currentEarthquake, setCurrentEarthquake, selectedIndex, setSelectedIndex }}>
            {children}
        </EarthquakeContext.Provider>
    )
}

export default EarthquakeContextProvider;