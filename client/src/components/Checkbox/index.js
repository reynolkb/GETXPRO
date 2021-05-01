import React from 'react'
import { checked } from '../../App.css' 

const Checkbox = ({isChecked, formal, camel}) => {
    console.log(isChecked);

    return (
    <div>
        <input type="checkbox" checked={isChecked} id={camel} name={camel}></input>
        <label htmlFor={camel} className="checkbox-label">{formal}</label>
    </div>
    )
};

export default Checkbox;
