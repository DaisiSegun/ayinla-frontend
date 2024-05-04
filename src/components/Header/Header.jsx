import React, { useState } from 'react';
import './Header.scss';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import profileImg from '../../images/avatar.jpg';
import getCurrentUser from '../../utils/getCurrentUser.js';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import newRequest from '../../utils/newRequest.js';

function Header() {
  const [showDropdownContent, setShowDropdownContent] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const toggleDropdownContent = () => {
    setShowDropdownContent(!showDropdownContent);
  };

  const handleLogout = async () => {
    try {
      setLoadingLogout(true); // Set loading state to true
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingLogout(false); // Reset loading state
    }
  };

  const currentUser = getCurrentUser();

  return (
    <div className='header'>
      <div className='section-1'>
        <Link to='/' className='link'>
          <img src={logo} className='logo' alt='' />
        </Link>
        <Search />
      </div>

      <div className='section-2'>
        <div  onClick={() => window.location.href = '/about-us'}  className='menu' >About us</div>
        <div  onClick={() => window.location.href = '/all-location'}  className='menu'>Locations</div>
        <div className='menu'>Contact us</div>

        {currentUser ? (
          <div className='user-info' onClick={toggleDropdownContent}>
            <img  src={currentUser?.user?.profilePicture || profileImg} className='pro-img' alt='Profile' />
            <p>{currentUser?.user?.username.length > 10 ? currentUser?.user?.username.substring(0, 10) + '..' : currentUser?.user?.username}</p>
            <ArrowDropDownIcon />
            {showDropdownContent && (
              <div className='dropdown-content-log'>
                <button className='logout-button' onClick={handleLogout} disabled={loadingLogout}>{loadingLogout ? 'Logging out...' : 'Logout'}</button>
              </div>
            )}
          </div>
        ) : (
          <Link to='/sign-in' className='link'>
            <button className='login-button'>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
