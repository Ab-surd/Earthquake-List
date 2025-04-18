import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../App.css'

function Map() {
    const mapRef = useRef();
    const mapContainerRef = useRef();

    useEffect(function() {
        mapboxgl.accessToken = "pk.eyJ1IjoibWljaGFlbC0tIiwiYSI6ImNtOWtzZjBnODB0NDUya3Byb3AyY2NtMncifQ.HFQAbCOMSzGiYDZzTdwCrQ";
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/michael--/cm9kutbdp00ot01rcecqthand/draft"
        });

        return function() {
            mapRef.current.remove();
        }
    }, []);

    return (
        <>
            <div id="map-container" ref={mapContainerRef} />
        </>
    )
}

export default Map;