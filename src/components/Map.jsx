import { useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
    const { earthquakeData, currentEarthquake, setCurrentEarthquake } = useData()

    const mapRef = useRef()
    const mapContainerRef = useRef()

    const currentTime = Date.now()

    const toGeoJSON = ({
        type: "FeatureCollection",
        features: earthquakeData.map((earthquake) => ({
            type: "Feature",
            properties: earthquake.properties,
            geometry: earthquake.geometry
        }))
    })

    useEffect(() => {
        mapboxgl.accessToken = "";
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
                id: "quakes",
                type: "circle",
                source: "data-points",
                paint: {
                    "circle-color": [
                        "case",
                        [">", ["get", "mag"], 6.0],
                        "#ff0000",
                        [">", ["get", "mag"], 4.5],
                        "#ffa500",
                        [">", ["get", "mag"], 3.0],
                        "#ffff00",
                        "#fff"
                    ],
                    "circle-radius": [
                        "case",
                        [">", ["get", "mag"], 6.0],
                        16,
                        [">", ["get", "mag"], 4.5],
                        8,
                        [">", ["get", "mag"], 3.0],
                        4,
                        3
                    ],
                    "circle-opacity": [
                        "case",
                        ["<", ["get", "mag"], currentTime - 2628000000],
                        0.4,
                        ["<", ["get", "mag"], currentTime - 604800000],
                        0.6,
                        ["<", ["get", "mag"], currentTime - 86400000],
                        0.8,
                        ["<", ["get", "time"], currentTime - 3600000],
                        1,
                        0.2
                    ]
                }
            })
        })

        map.on("click", (v) => {
            const features = map.queryRenderedFeatures(v.point, {
                layers: ["quakes"]
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