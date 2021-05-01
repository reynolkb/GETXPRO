import React from 'react'
import { checked } from '../../App.css' 

const Checkbox = (isChecked) => {
    console.log(isChecked.isChecked);

    return (
    <div>
        <input type="checkbox" checked={isChecked.isChecked.passport} id="passport" name="passport"></input>
        <label htmlFor="passport">homeInsurance</label>
    </div>
    )
};

export default Checkbox;
