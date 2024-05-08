import React from 'react';
import './Header.scss';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import profileImg from '../../images/avatar.jpg';
import getCurrentUser from '../../utils/getCurrentUser.js';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import MenuIcon from '@mui/icons-material/Menu';



function Header() {
  

 
  

  const currentUser = getCurrentUser();

  return (
    <div className='header-user'>

   
    <div className='header'>

      <div className='hello-user'>
      
  
      <div className='section-1'>
        <Link to='/' className='link'>
          <img src={logo} className='logo' alt='' />
        </Link>
        <Search/>
       
      </div>
    

      </div>
      <div className='menu-align'>
      <div className='section-22  '>
        <div  onClick={() => window.location.href = '/about-us'}  className='menu' >About us</div>
        <div  onClick={() => window.location.href = '/all-location'}  className='menu'>Locations</div>
        <div className='menu'>Contact us</div>

        {currentUser ? (
          <div  onClick={() => window.location.href = '/menu'}  className='user-info' >
            <img  src={currentUser?.user?.profilePicture || profileImg} className='pro-img' alt='Profile' />
            <p>{currentUser?.user?.username.length > 10 ? currentUser?.user?.username.substring(0, 10) + '..' : currentUser?.user?.username}</p>
            <ArrowDropDownIcon />
          
          </div>
        ) : (
          <Link to='/sign-in' className='link'>
            <button className='login-button'>Login</button>
          </Link>
        )}
      </div>

      {/* Menu bar for responsiveness */}
      <div onClick={() => window.location.href = '/menu'} className='menu-bar'>
          <MenuIcon className='menu-icon'/>
          
      </div>
      

      </div>
    </div>
    {currentUser && (
          <p className='hello-user-text'>Hello, {currentUser.user.username}</p>
        )}
    </div>
  );
}

export default Header;
