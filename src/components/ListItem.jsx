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

function ListItem ({ index, style, data }) {
    const earthquake = data[index];

    return (
        <button className="listItem" style={style}>
            <small>{new Date(earthquake.properties.time).toLocaleDateString()}, {new Date(earthquake.properties.time).toLocaleTimeString()} - {timeAgo(earthquake.properties.time)}</small>
            <strong>Magnitude {earthquake.properties.mag}</strong>
            {earthquake.properties.place}
        </button>
    )
}

export default ListItem;