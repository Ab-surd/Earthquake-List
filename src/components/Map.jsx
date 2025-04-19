import { useEffect, useRef, useContext } from 'react';
import { EarthquakeContext } from '../contexts/EarthquakeDataContext.jsx';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../App.css'

function Map() {
    const earthquakes = useContext(EarthquakeContext);

    const mapRef = useRef();
    const mapContainerRef = useRef();

    useEffect(function() {
        try {
            mapboxgl.accessToken = "pk.eyJ1IjoibWljaGFlbC0tIiwiYSI6ImNtOWtzZjBnODB0NDUya3Byb3AyY2NtMncifQ.HFQAbCOMSzGiYDZzTdwCrQ";
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/michael--/cm9kutbdp00ot01rcecqthand/draft"
            });

            return function() {
                mapRef.current.remove();
            }
        }
        catch (error) {
            console.warn("Could not load mapbox gl map")
        }
    }, []);

    useEffect(function() {
        earthquakes.map((earthquake) => {
            new mapboxgl.Marker()
            .setLngLat([earthquake.geometry.coordinates[0], earthquake.geometry.coordinates[1]])
            .addTo(mapRef.current)
        });
    }, [earthquakes])

    return (
        <>
            <div id="map-container" ref={mapContainerRef} />
        </>
    )
}

export default Map;