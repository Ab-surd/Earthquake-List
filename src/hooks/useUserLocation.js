import { useEffect, useState } from 'react';

function useUserLocation() {
    const [coordinates, setCoordinates] = useState(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoordinates(position.coords)
                },
                (error) => {
                    console.error("error getting location", error)
                }
            )
        }
        else {
            console.error("browser does not support geolocation")
        }
    }, [])

    return {
        latitude: coordinates?.latitude,
        longitude: coordinates?.longitude
    }
}

export default useUserLocation