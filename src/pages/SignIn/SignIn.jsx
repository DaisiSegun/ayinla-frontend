import React, { useState, useEffect } from 'react';
import './SignIn.scss';
import { Link } from 'react-router-dom';


import { CircleLoader } from "react-spinners";
import newRequest from "../../utils/newRequest.js";




function SignIn() {
  useEffect(() => {
    document.title = 'Sign In';
  }, []);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await newRequest.post('/auth/login', formData);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
     
      window.location.href = "/";

    } catch (error) {
   
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className='sign-in'>
     
      <div className='sign-in-container2'>
        <div className='sign-in-header'>Sign in</div>

        {error && <div className='error-box'>{error}</div>}

        <div className='sign-in-box'>
          <label className='sign-in-text'>Email</label>
          <input
            className='sign-in-input'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className='sign-in-box'>
          <label className='sign-in-text'>Password</label>
          <input
            type='password'
            className='sign-in-input'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        <Link className='link6' to='/reset-password'>
        <p className='forgot-password'>Forgot password?</p>
        </Link>

        <div className='button3' onClick={handleLogin}>
          {loading ? (
            <CircleLoader color={"#36D7B7"} size={20} />
          ) : (
            'Login'
          )}
        </div>

        <div className='dont-have-an'>
          Don't have an account? 
          <Link className='link' to='/register'>
            <span className='sign-up-green'> Sign up</span>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default SignIn;