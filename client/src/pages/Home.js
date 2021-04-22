import React from "react";
import { useQuery } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { faUserPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from './public/getxgo.svg';

const Home = () => {
    return (
        <div className="container">
            
          <div className="homepage-jumbo">
            <object className="logo" data={Logo}></object>
          </div>

        <div className='homepage-text-container'>
          <div className="homepage-text">
            <h3>Welcome to the Pro Club</h3>
            <p>Preparing for the unknown</p>
          </div>
            
          <div className="home-signup-btn-container">
            <Link to='/signup' className="home-signup-btn">
              Sign Up
            </Link>
          </div> 

          <div className='homepage-account-text'>
            <p>Already have an account? <Link to='/login' className='home-login-link'>Log In</Link></p>
          </div>
        </div>
        
        </div>
    )
};

export default Home;