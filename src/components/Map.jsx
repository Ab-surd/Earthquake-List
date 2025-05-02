import { useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
    const { earthquakeData, currentEarthquake, setCurrentEarthquake } = useData()

    const mapRef = useRef()
    const mapContainerRef = useRef()

    const toGeoJSON = ({
        type: "FeatureCollection",
        features: earthquakeData.map((earthquake) => ({
            type: "Feature",
            properties: earthquake.properties,
            geometry: earthquake.geometry
        }))
    })

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoibWljaGFlbC0tIiwiYSI6ImNtOWtzZjBnODB0NDUya3Byb3AyY2NtMncifQ.HFQAbCOMSzGiYDZzTdwCrQ";
        const map = new mapboxgl.Map({
            container: mapContainerRef.current
        })
        mapRef.current = map

        map.setPadding({left: 300})
        map.addControl(new mapboxgl.NavigationControl())

        map.on("load", () => {
            map.addSource("data-points", {
                type: "geojson",
                data: toGeoJSON
            })

            map.addLayer({
                id: "weak-quakes",
                type: "circle",
                source: "data-points",
                paint: {
                    "circle-color": "#fff",
                    "circle-radius": 3
                }
            })

            map.addLayer({
                id: "med-quakes",
                type: "circle",
                source: "data-points",
                filter: [">", ["get", "mag"], 3.0],
                paint: {
                    "circle-color": "#ffff00",
                    "circle-radius": 4
                }
            })

            map.addLayer({
                id: "strong-quakes",
                type: "circle",
                source: "data-points",
                filter: [">", ["get", "mag"], 4.5],
                paint: {
                    "circle-color": "#ffa500",
                    "circle-radius": 8
                }
            })

            map.addLayer({
                id: "severe-quakes",
                type: "circle",
                source: "data-points",
                filter: [">", ["get", "mag"], 6.0],
                paint: {
                    "circle-color": "#ff0000",
                    "circle-radius": 16
                }
            })
        })

        map.on("click", (v) => {
            const features = map.queryRenderedFeatures(v.point, {
                layers: ["severe-quakes", "strong-quakes", "med-quakes", "weak-quakes"]
            })

            if (!features.length) return

            setCurrentEarthquake(features[0])
        })

        return () => {
            mapRef.current.remove()
        }
    }, [])

    useEffect(() => {
        if (currentEarthquake) {
            mapRef.current.flyTo({
                center: currentEarthquake.geometry.coordinates,
                zoom: 12
            })
        }
    }, [currentEarthquake])

    useEffect(() => {
        const mapDataSource = mapRef.current.getSource("data-points")
        if (mapDataSource) {
            console.log(mapDataSource)
            mapDataSource.setData(toGeoJSON)
        }
    }, [earthquakeData])

    return (
        <>
            <div id="map-container" ref={mapContainerRef} />
        </>
    )
}

export default Map