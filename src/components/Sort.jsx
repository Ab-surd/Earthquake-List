import { useData } from "../context/DataContext";
import useUserLocation from "../hooks/useUserLocation";

function Sort() {
    const { setFilter } = useData();
    const {latitude, longitude} = useUserLocation();

    const handleSortChange = (v) => {
        setFilter((prev) => ({...prev, sort: v.target.value}))
    }

    const handleOrderChange = (v) => {
        setFilter((prev) => ({...prev, order: v.target.value}))
    }

    return (
        <>
            <div className="controlItem">
                <p><small>SORT EARTHQUAKES BY</small></p>
                <label>
                    <input type="radio" name="selectSort" value="date" onChange={handleSortChange} defaultChecked />
                    Recent
                </label>
                <label>
                    <input type="radio" name="selectSort" value="magnitude" onChange={handleSortChange} />
                    Magnitude
                </label>
                <label>
                    <input type="radio" name="selectSort" value="location" onChange={handleSortChange} disabled={latitude ? longitude ? false : true : true} />
                    Location
                </label>
            </div>
            <div className="controlItem">
                <p><small>SORT ORDER</small></p>
                <label>
                    <input type="radio" name="selectOrder" value="desc" onChange={handleOrderChange} defaultChecked />
                    Descending
                </label>
                <label>
                    <input type="radio" name="selectOrder" value="asc" onChange={handleOrderChange} />
                    Ascending
                </label>
            </div>
        </>
    )
}

export default Sort;