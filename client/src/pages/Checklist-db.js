import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Logo from './public/getxgo.svg';
// import { useCheckboxState, Checkbox } from 'reakit/Checkbox';
import { checked } from '../App.css'
import {QUERY_ME} from '../utils/queries';
import Checkbox from '../components/Checkbox/index'

const checklistItems = [
    {
        name:'Passport',
        attributes:'passport',
    },
    {
        name:'Home Insurance',
        attributes:'homeInsurance'
    },
    {
        name:'Auto Insurance',
        attributes: 'autoInsurance'
    },
    {
        name:'Medical Card',
        attributes: 'medicalCard'
    },
    {
        name: 'Social Security Card',
        attributes: 'socialSecurityCard'
    }
]
const personalItems = [
    {
        name: 'Cash',
        attributes: 'cash'
    },
    {
        name: 'Jacket',
        attributes: 'jacket'
    }
]
function Checklist (props)  {
    const [formState, setFormState] = useState({ 
        passport: false,
        homeInsurance: false,
        autoInsurance: false,
        medicalCard: false,
        socialSecurityCard: false,
        cash: false,
        jacket: false
    });

    const handleCheckboxChange = () => {
        // const { name, value } = event.target;
        // console.log(document.getElementById(name).checked)
        // if(document.getElementById(name).checked === true) {
        //     setFormState({
        //         ...formState,
        //         [name]: true
        //     });
        // } else if (document.getElementById(name).checked === false) {
        //     setFormState({
        //         ...formState,
        //         [name]: false
        //     });
        // }
        // console.log(formState)

        // let userChecklist = getUserChecklist();
        // for (const [key, value] of Object.entries(userChecklist)) {
        //     setFormState({
        //         [key]: value
        //     })
        // }
    }

    const {loading, data} = useQuery(QUERY_ME);
    if (loading) {
        return <div>Loading User...</div>;
    }

    function getUserChecklist() {
        for (const [key, value] of Object.entries(data.me.myChecklist[0])) {
            if(typeof value === "string") {
              delete data.me.myChecklist[0][key];
            } 
        }

        console.log(data.me.myChecklist[0]);
        return data.me.myChecklist[0];
    }

    const autoInsuranceFormal = 'Auto Insurance';
    const autoInsuranceCamel = 'autoInsurance';

    const cashFormal = 'Cash';
    const cashCamel = 'cash';

    return (
        <div className="container my-1">
            <div className='checklist-logo'>
                <object className="logo" data={Logo}></object>
            </div>
            <div className='checklist-header'>
                <h1 className='hello-user'>Hello, User</h1>
                <p>Your checklist</p>
            </div>
            <form className='checklist-form'>
                <h4 className='checklist-section-header'>Documents</h4>
                <p className='checklist-instructions'>Make a copy of the list below and put inside of your GETXGO Kit</p>
                {/* {checklistItems.map((checklistItem, index) => (
                    <div key={index}>
                        <label
                        htmlFor={checklistItem.attributes}
                        className='checkbox-label'
                        >
                            <Checkbox isChecked={getUserChecklist()}/>
                            <span>{checklistItem.name}</span>
                        </label>
                    </div>
                ))} */}
                <Checkbox isChecked={getUserChecklist().autoInsurance} formal={autoInsuranceFormal} camel={autoInsuranceCamel} onChange={handleCheckboxChange}/>
                <Checkbox isChecked={getUserChecklist().cash} formal={cashFormal} camel={cashCamel} onChange={handleCheckboxChange}/>
                {/* <Checkbox isChecked={getUserChecklist().homeInsurance}/>
                <Checkbox isChecked={getUserChecklist().jacket}/>
                <Checkbox isChecked={getUserChecklist().medicalCard}/>
                <Checkbox isChecked={getUserChecklist().passport}/>
                <Checkbox isChecked={getUserChecklist().socialSecurityCard}/> */}
                {/* <h4 className='checklist-section-header'>Personal Items</h4>
                {personalItems.map((personalItem, index) => (
                    <div key={index}>
                        <label
                        htmlFor={personalItem.attributes}
                        className='checkbox-label'
                        >
                            <Checkbox isChecked={getUserChecklist()}/>
                            <span>{personalItem.name}</span>
                        </label>
                    </div>
                ))} */}
            </form>
        </div>
    )
}
export default Checklist;