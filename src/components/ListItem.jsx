import { useData } from "../context/DataContext";

function timeAgo(time) {
    const seconds = Math.floor((Date.now() - time) / 1000);
    if (seconds < 60) {
        return (`${seconds} second${seconds == 1 ? "" : "s"} ago`);
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return (`${minutes} minute${minutes == 1 ? "" : "s"} ago`);
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return (`${hours} hour${hours == 1 ? "" : "s"} ago`);
    }

    const days = Math.floor(hours / 24);
    return (`${days} day${days == 1 ? "" : "s"} ago`);
}

function ListItem ({ index, style, earthquakeData, selectedIndex }) {
    const { setCurrentEarthquake } = useData()

    const earthquake = earthquakeData[index];

    const handleClick = () => {
        setCurrentEarthquake(earthquake)
    }

    return (
        <button className={selectedIndex == index? "listItemSelected" : "listItem"} style={style} onClick={handleClick}>
            <p className="listItemText">
                <small>{new Date(earthquake.properties.time).toLocaleDateString()}, {new Date(earthquake.properties.time).toLocaleTimeString()} - {timeAgo(earthquake.properties.time)}</small>
                <br></br>
                <strong>Magnitude {earthquake.properties.mag}</strong>
                <br></br>
                {earthquake.properties.place}
            </p>
        </button>
    )
}

export default ListItem;