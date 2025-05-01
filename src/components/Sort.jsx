import { useData } from "../context/DataContext";

function Sort() {

    const { setFilter } = useData();

    const handleSortChange = (v) => {
        setFilter((prev) => ({...prev, sort: v.target.value}))
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
                    <input type="radio" name="selectSort" value="location" onChange={handleSortChange} />
                    Location
                </label>
            </div>
        </>
    )
}

export default Sort;