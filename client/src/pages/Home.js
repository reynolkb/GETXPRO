import React from "react";
import { useQuery } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { faUserPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
    return (
        <div>
            
          <div className="homepage-jumbo">
          {
          Auth.loggedIn() ?
          <Link to="/profile">
          <button className="homePage-profile">
          <FontAwesomeIcon icon={faUserCircle}/> Go to Profile
          </button>
          </Link>
            :
          <Link>
            <button href="/signup" className="homepage-signup">
            <FontAwesomeIcon icon={faUserPlus}/> Create an account 
            </button>
          </Link>
         }
          </div>
          
        </div>
    )
};

export default Home;