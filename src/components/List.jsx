import { useData } from '../context/DataContext.jsx';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ListItem from './ListItem.jsx';

const Row = ({ index, style, data }) => {
    return <ListItem index={index} style={style} data={data} />
}

function List() {
    const { earthquakeData } = useData();

    return (
        <>
            <div id="list">
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList height={height} itemCount={earthquakeData.length} itemSize={70} itemData={earthquakeData} width={width} >
                            {Row}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </div>
        </>
    )
}

export default List;