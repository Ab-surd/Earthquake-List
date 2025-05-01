export async function fetchAPIData(period) {
    try {
        const response = await fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${period}.geojson`);
        return await response.json();
    }
    catch (error) {
        console.error(`Cannot fetch USGS data: ${error}`);
        return null;
    }
}