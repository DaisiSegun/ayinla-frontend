import React, {useState} from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Menu.scss'
import newRequest from '../../utils/newRequest.js';



import { Link } from 'react-router-dom';

function Menu() {


  const [loadingLogout, setLoadingLogout] = useState(false);
  
  const handleLogout = async () => {
    try {
      setLoadingLogout(true); // Set loading state to true
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingLogout(false); // Reset loading state
    }
  };
  return (
    <div className='menu'>

 
      
      <div className="menu-con">

        
      <Link to='/sign-in' className="menu-nav">
          Sign in
          <ArrowForwardIosIcon/>
        </Link>
     
        <Link to='/sign-up' className="menu-nav">
          Sign up
          <ArrowForwardIosIcon/>
        </Link>

       
        <Link to='/contact-us' className="menu-nav">
          Contact us
          <ArrowForwardIosIcon/>
          </Link>

          
        <div onClick={handleLogout} disabled={loadingLogout} className="menu-nav">
        {loadingLogout ? 'Logging out...' : 'Logout'}
          <ArrowForwardIosIcon/>
        </div>


          

      </div>



    </div>
  )
}

export default Menu