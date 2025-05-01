import { useState } from 'react';
import { motion } from 'motion/react';

import Filter from './Filter';
import Sort from './Sort';

import Plus from '../assets/plus-icon-black-16.svg';
import Minus from '../assets/minus-icon-black-16.svg';

const dynamicComponents = {
    Filter: Filter,
    Sort: Sort
}

function Accordion({ content }) {
    const [toggled, setToggle] = useState(false);

    let Component = dynamicComponents[content];

    if (!Component) {
        console.warn(`${content} is not the name of a component`)
        return (<></>)
    }

    const openClose = () => {
        setToggle(!toggled)
    }

    return (
        <>
            <div className="accordionContainer">
                <button className="accordion" onClick={openClose}>
                    {content}
                    {!toggled ?
                        <img className="plusMinus" src={Plus} alt="+" />
                    :
                        <img className="plusMinus" src={Minus} alt="-" />
                    }
                </button>
                <motion.div className="accordionContent" initial={{height: 0}} animate={!toggled ? {height: 0} : {height: "auto"}}>
                    <Component />
                </motion.div>
            </div>
        </>
    )

}

export default Accordion;