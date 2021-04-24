import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER, ADD_GOOGLE_USER } from "../utils/mutations";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);
  const [addGoogleUser] = useMutation(ADD_GOOGLE_USER);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  
  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email, 
        password: formState.password,
        username: formState.username
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const responseGoogle = (response) => {
    console.log(response.profileObj);
    addGoogleUser({
      variables: {
        email: response.profileObj.email,
        password: response.profileObj.googleId,
        username: response.profileObj.googleId,
        googleUser: true
      }
    })

    const token = addGoogleUser.token;
    Auth.login(token);
  }

  const componentClicked = () => {
    console.log('clicked')
  }

  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
    <div className="container my-1 signup-container">
      <div className="home-link-container">
      <Link to="/" className='home-link'>
        <FontAwesomeIcon icon={faArrowLeft}/>
      </Link>
      </div>

      <h2 className="signup-header">Create Your Account</h2>
      <div className='facebookLoginContainer'>
        <FacebookLogin
          appId="287273199513032"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
          render={renderProps => (
            <button className='facebook-login-btn' onClick={renderProps.onClick}>
              <FontAwesomeIcon className='facebook-logo' icon={faFacebookF}/> <span className='facebook-btn-text'>CONTINUE WITH FACEBOOK</span></button>
          )}
        />
      </div>
      <div className='googleLoginContainter'>
        <GoogleLogin
          clientId="43051589855-j0ihpdaumb3gsbgc6la8n5gppfuvoo3u.apps.googleusercontent.com"
          render={renderProps => (
            <button className='google-btn' onClick={renderProps.onClick} disabled={renderProps.disabled}><img className='google-logo' src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/><span className='google-btn-text'>CONTINUE WITH GOOGLE</span></button>
          )}
          buttonText='Continue With Google'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <h6 className='signup-form-text'>OR LOG IN WITH EMAIL</h6>
      <form onSubmit={handleFormSubmit} className="signup-form">
        <div className="form-div">
          <input
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="form-div">
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-div">
          <div className='btn-in'>
            <input
              placeholder="******"
              name="password"
              type={passwordShown ? 'text' : 'password'}
              id="password"
              onChange={handleChange}
            />
            <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} className='toggle-password-btn' onClick={togglePasswordVisibility}/>
            </div>
          </div>
        <div className="flex-row">
          <button type="submit" className="btn signup-btn">
            GET STARTED
          </button>
        </div>
      </form>
    </div>
  );

}

export default Signup;