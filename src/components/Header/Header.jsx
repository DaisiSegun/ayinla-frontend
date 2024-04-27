import React from 'react'
import './Header.scss'
import logo from '../../images/logo.png'
import search from '../../images/search.svg'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='header'>
        <div className='section-1'>
        <Link to='/' className='link'>
          <img src={logo} className='logo' alt=''/>
          </Link>
          <div className='search'>
              <img src={search}  className='search-icon' alt=''/>
              <p className='search-text'>Search</p>
          </div>
        </div>

        <div className='section-2'>
          <div className='menu'>About us</div>
          <div className='menu'>Location</div>
          <div className='menu'>Contact us</div>

          <Link to='/sign-in' className='link'>
          
          <button className='login-button'>Login</button>

          </Link>
        </div>
    </div>
  )
}

export default Header