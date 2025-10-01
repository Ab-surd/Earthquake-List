import { useRef, useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { map } from 'motion/react-m';

function Map() {
    const { earthquakeData, currentEarthquake, setCurrentEarthquake, setSelectedIndex } = useData()

    const mapRef = useRef()
    const mapContainerRef = useRef()

    const [currentPopup, setCurrentPopup] = useState()

    const currentTime = Date.now()

    const setLayerData = () => {
        const mapDataSource = mapRef.current.getSource("data-points")
        if (mapDataSource) {
            mapDataSource.setData(toGeoJSON)
        }
    }

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
            container: mapContainerRef.current,
            style: "mapbox://styles/michael--/cm9kutbdp00ot01rcecqthand"
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
                        ["<", ["get", "time"], currentTime - 2628000000],
                        0.4,
                        ["<", ["get", "time"], currentTime - 604800000],
                        0.6,
                        ["<", ["get", "time"], currentTime - 86400000],
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

            if (currentPopup) {
                currentPopup.remove()
                setCurrentPopup(null)
            }

            console.log(currentEarthquake)
            
            const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: true })
                .setLngLat([currentEarthquake.geometry.coordinates[0], currentEarthquake.geometry.coordinates[1]])
                .setHTML(
                    `<div>
                        <h3>${currentEarthquake.properties.mag} magnitude earthquake</h3>
                    </div>
                    <div>
                        <div>
                            <p>${currentEarthquake.properties.place}</p>
                        </div>
                        <div>
                            <p>${new Date(currentEarthquake.properties.time).toLocaleDateString()}, ${new Date(currentEarthquake.properties.time).toLocaleTimeString()}</p>
                        </div>
                        <div>
                            <p>${currentEarthquake.properties.tsunami ? "tsunami generated" : "no tsunami generated"}</p>
                        </div>
                    </div>`
                )
                .addTo(mapRef.current)

            setCurrentPopup(popup)

            popup.on("close", () => {
                setSelectedIndex(-1)
            })
        }
    }, [currentEarthquake])
    
    useEffect(() => {
        setLayerData()
        mapRef.current.on("load", setLayerData)
    }, [earthquakeData])

    return (
        <>
            <div id="map-container" ref={mapContainerRef} />
        </>
    )
}

export default Map