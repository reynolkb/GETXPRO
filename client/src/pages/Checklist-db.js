import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from './public/getxgo.svg';
// import { useCheckboxState, Checkbox } from 'reakit/Checkbox';
import { checked } from '../App.css';
import { QUERY_ME } from '../utils/queries';
import Checkbox from '../components/Checkbox/index';
import { EDIT_CHECKLIST } from '../utils/mutations';

function Checklist(props) {
	const [formState, setFormState] = useState();
	const [isChecked, setIsChecked] = useState(false);
	const { loading, data } = useQuery(QUERY_ME);
	const [editChecklist] = useMutation(EDIT_CHECKLIST);

	useEffect(() => {
		if (loading) {
			return <div>Loading User...</div>;
		}

		// back end call to db		
		function getUserChecklist() {
			for (const [key, value] of Object.entries(data.me.myChecklist[0])) {
				if (typeof value === 'string') {
					delete data.me.myChecklist[0][key];
				}
			}
	
			// console.log(data.me.myChecklist[0]);
			// returns object from db
			return data.me.myChecklist[0];
		}

		let formStateDB = getUserChecklist();
		setFormState(formStateDB);
	})
	
	if(formState) {
		document.getElementById('autoInsurance').checked = formState.autoInsurance;
	}
	
	function saveCheckbox() {
		console.log('save button clicked');

		editChecklist({variables: {
			autoInsurance: document.getElementById('autoInsurance').checked, 
			passport: true,
			homeInsurance: true,
			medicalCard: true,
			socialSecurityCard: true,
			cash: true,
			jacket: true
		}})
	}

	return (
		<div className='container my-1'>
			<div className='checklist-logo'>
				<object className='logo' data={Logo}></object>
			</div>
			<div className='checklist-header'>
				<h1 className='hello-user'>Hello, User</h1>
				<p>Your checklist</p>
			</div>
			<form className='checklist-form'>
				<h4 className='checklist-section-header'>
					Documents
				</h4>
				<p className='checklist-instructions'>
					Make a copy of the list below and put
					inside of your GETXGO Kit
				</p>
				<div>
					<input type="checkbox" id='autoInsurance' name='autoInsurance'></input>
					<label htmlFor='autoInsurance' className="checkbox-label">Auto Insurance</label>
				</div>
				<br></br>
				<button id="saveBtn" type="button" onClick={saveCheckbox}>Save</button>
			</form>
		</div>
	);
}
export default Checklist;
