import { useData } from '../context/DataContext.jsx';
import { List, useListRef } from 'react-window';
import ListItem from './ListItem.jsx';
import { useEffect, useState } from 'react';

const Row = ({ index, style, earthquakeData, selectedIndex }) => {
    return <ListItem index={index} style={style} earthquakeData={earthquakeData} selectedIndex={selectedIndex} />
}

function ListComponent() {
    const listRef = useListRef(null)
    const { earthquakeData, currentEarthquake, selectedIndex, setSelectedIndex } = useData()

    useEffect(() => {
        let currentId = currentEarthquake?.id ?? currentEarthquake?.properties?.url.substring(currentEarthquake?.properties?.url.lastIndexOf('/') + 1)
        if (typeof currentId == "undefined") {return}
        console.log(currentId)

        let findIndex = earthquakeData.findIndex((earthquakeToSearch) => earthquakeToSearch.id == currentId)
        if (listRef && (findIndex >= 0) && (earthquakeData.length > 0)) {
            setSelectedIndex(findIndex)
            listRef.current.scrollToRow({
                align: "auto",
                behavior: "smooth",
                index: findIndex
            })
        } else {
            setSelectedIndex(-1)
        }
    }, [currentEarthquake])

    return (
        <>
            <List id="list-container" listRef={listRef} rowComponent={Row} rowCount={earthquakeData.length} rowHeight={80} rowProps={{ earthquakeData, selectedIndex }} />
        </>
    )
}

export default ListComponent;