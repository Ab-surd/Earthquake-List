import { useEffect, useState } from 'react'
import '../App.css';

function EarthquakeList() {
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
        <>
            <ul class="earthquakeList">
                {earthquakes.map((earthquake) => (
                    <>
                        <li key={earthquake.id}>
                            {/* will add other info here like magnitude, time, + how long ago earthquake occurred */}
                            {earthquake.properties.place}
                        </li>
                    </>
                ))}
            </ul>
        </>
    )
}

export default EarthquakeList