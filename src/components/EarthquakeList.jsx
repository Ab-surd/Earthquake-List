import { useContext } from 'react'
import { EarthquakeContext } from '../contexts/EarthquakeDataContext.jsx';
import '../App.css';

function EarthquakeList() {
    const earthquakes = useContext(EarthquakeContext);

    return (
        <>
            <div className="list">
                {earthquakes.map((earthquake) => (
                    <>
                        <div className="listItem" key={earthquake.id}>
                            <small>{new Date(earthquake.properties.time).toLocaleDateString()}, {new Date(earthquake.properties.time).toLocaleTimeString()}</small>
                            <strong>Magnitude: {earthquake.properties.mag}</strong>
                            {earthquake.properties.place}
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default EarthquakeList