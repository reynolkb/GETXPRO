// import React, { useState } from "react";
// import ReactDOM from 'react-dom';
// import { useQuery } from "@apollo/client";
// import { QUERY_ME } from "../utils/queries";
// import { useParams } from 'react-router-dom';
// import { Link } from "react-router-dom";
// import Logo from './public/getxgo.svg';
// import { useCheckboxState, Checkbox } from 'reakit/Checkbox';
// import { checked } from '../App.css'
// const checklistItems = [
//     {
//         name:'Passport',
//         attributes:'passport',
//     },
//     {
//         name:'Home Insurance',
//         attributes:'homeInsurance'
//     },
//     {
//         name:'Auto Insurance',
//         attributes: 'autoInsurance'
//     },
//     {
//         name:'Medical Card',
//         attributes: 'medicalCard'
//     },
//     {
//         name: 'Social Security Card',
//         attributes: 'socialSecurityCard'
//     }
// ]
// const personalItems = [
//     {
//         name: 'Cash',
//         attributes: 'cash'
//     },
//     {
//         name: 'Jacket',
//         attributes: 'jacket'
//     }
// ]
// function Checklist (props)  {
//     const  { username: userParam } = useParams();
//     const checkbox = useCheckboxState({ state: [] });
//     const [formState, setFormState] = useState({
//         passport: false,
//         homeInsurance: false,
//         autoInsurance: false,
//         medicalCard: false,
//         socialSecurityCard: false,
//         cash: false,
//         jacket: false
//     });
//     const handleCheckboxChange = event => {
//         const { name, value } = event.target;
//         console.log(document.getElementById(name).checked)
//         if(document.getElementById(name).checked === true) {
//             setFormState({
//                 ...formState,
//                 [name]: true
//             });
//         } else if (document.getElementById(name).checked === false) {
//             setFormState({
//                 ...formState,
//                 [name]: false
//             });
//         }
//         console.log(formState)
//     }

//     const {loading, data} = useQuery(QUERY_ME);
//     if (loading) {
//         return <div>Loading User...</div>;
//     }

//     return (
//         <div className="container my-1">
//             <div className='checklist-logo'>
//                 <object className="logo" data={Logo}></object>
//             </div>
//             <div className='checklist-header'>
//                 <h1 className='hello-user'>Hello, {data.me.username}</h1>
//                 <p>Your checklist</p>
//             </div>
//             <form className='checklist-form'>
//                 <h4 className='checklist-section-header'>Documents</h4>
//                 <p className='checklist-instructions'>Make a copy of the list below and put inside of your GETXGO Kit</p>
//                 {checklistItems.map((checklistItem, index) => (
//                     <div key={index}>
//                         <label
//                         htmlFor={checklistItem.attributes}
//                         className='checkbox-label'
//                         >
//                             <Checkbox
//                             {...checkbox}
//                             name={checklistItem.attributes}
//                             id={checklistItem.attributes}
//                             value={checklistItem.attributes}
//                             className='checkbox'
//                             checked={checked}
//                             onChange={handleCheckboxChange}
//                             />
//                             <span>{checklistItem.name}</span>
//                         </label>
//                     </div>
//                 ))}
//                 <h4 className='checklist-section-header'>Personal Items</h4>
//                 {personalItems.map((personalItem, index) => (
//                     <div key={index}>
//                         <label
//                         htmlFor={personalItem.attributes}
//                         className='checkbox-label'
//                         >
//                             <Checkbox
//                             {...checkbox}
//                             name={personalItem.attributes}
//                             id={personalItem.attributes}
//                             value={personalItem.attributes}
//                             className='checkbox'
//                             checked={checked}
//                             onChange={handleCheckboxChange}
//                             />
//                             <span>{personalItem.name}</span>
//                         </label>
//                     </div>
//                 ))}
//             </form>
//         </div>
//     )
// }
// export default Checklist;
