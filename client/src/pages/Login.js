import React, { useState } from "react";
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LoginUser(props) {
    const [formState, setFormState] = useState({ username: '', password: '' })
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            const mutationResponse = await login({ variables: { username: formState.username, password: formState.password } })
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e)
        }
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
      login({
        variables: {
          username: response.profileObj.googleId,
          password: response.profileObj.googleId
        }
      })

      const token = login.token;
      Auth.login(token);
    };

    const responseGoogleFailure = () => {
      console.log('Login With Google Failed');
    }

    const componentClicked = () => {
      console.log('clicked')
    }

    const responseFacebook = (response) => {
      console.log(response);
    }

    return (
    <div className="container my-1 login-container">
      <div className="home-link-container">
        <Link to="/" className='home-link'>
        <FontAwesomeIcon icon={faArrowLeft}/>
        </Link>
      </div>

      <h2 className="login-header">Welcome Back!</h2>
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
          onFailure={responseGoogleFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <h6 className='login-form-text'>OR LOG IN WITH USERNAME</h6>
      <form onSubmit={handleFormSubmit} className="login-form">
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
            placeholder="Password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {
          error ? <div>
            <p className="error-text" >The provided credentials are incorrect</p>
          </div> : null
        }
        <div className="flex-row">
          <button type="submit" className="btn login-btn">
            LOG IN
          </button>
          <div className='signup-text'>
            <p>Don't have an account? <Link to='/signup' className='signup-link'>Sign Up</Link></p>
          </div>
        </div>
      </form>

      <script src="https://apis.google.com/js/platform.js" async defer></script>
    </div>
    )
}

export default LoginUser;