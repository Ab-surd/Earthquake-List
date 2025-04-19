import Plus from '../assets/plus-icon-black-16.svg';
import '../App.css';

function FilterItem({ name }) {
    return (
        <div className="filterItem">
            <img className="Plus" src={Plus} alt="+" />
            <p>{name}</p>
        </div>
    )
}

export default FilterItem;