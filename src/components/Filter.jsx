import { useData } from '../context/DataContext.jsx';

function Filter() {
    const { setFilter } = useData()

    const handlePeriodChange = (v) => {
        setFilter((prev) => ({...prev, period: v.target.value}))
    }

    const handleMagChange = (v) => {
        setFilter((prev) => ({...prev, magnitude: v.target.value}))
    }

    return (
        <>
            <div className="controlItem">
                <p><small>DISPLAY EARTHQUAKES FROM</small></p>
                <label>
                    <input type="radio" name="selectDay" value="day" onChange={handlePeriodChange} defaultChecked />
                    Past Day
                </label>
                <label>
                    <input type="radio" name="selectDay" value="week" onChange={handlePeriodChange} />
                    Past Week
                </label>
                <label>
                    <input type="radio" name="selectDay" value="month" onChange={handlePeriodChange} />
                    Past Month
                </label>
            </div>
            <div className="controlItem">
                <p><small>DISPLAY EARTHQUAKES WITH</small></p>
                <label>
                    <input type="radio" name="selectMag" value={2.5} onChange={handleMagChange} defaultChecked />
                    Significant Magnitudes (2.5+)
                </label>
                <label>
                    <input type="radio" name="selectMag" value={0} onChange={handleMagChange} />
                    All Magnitudes
                </label>
            </div>
        </>
    )
}

export default Filter;