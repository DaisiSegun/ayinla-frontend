import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Admin.scss'


import { Link } from 'react-router-dom';
// import getCurrentUser from '../../utils/getCurrentUser';
// import { useNavigate } from 'react-router-dom';


function Admin() {
  // const currentUser = getCurrentUser();
  // const navigate = useNavigate();



  // if (!currentUser || !currentUser.user.isAdmin) {
  //   // Redirect to a different page if the user is not an admin
  //   navigate('/');
  //   return null; // Render nothing while redirecting
  // }
  return (
    <div className='menu'>


      
      <div className="menu-con">

      <h4>Ayinla Films Admin</h4>
    
     
      

       
        <Link to='/my-locations' className="menu-nav">
          All Locations
          <ArrowForwardIosIcon/>
          </Link>


          <Link to='/create-location' className="menu-nav">
          Create Location
          <ArrowForwardIosIcon/>
          </Link>

        


      </div>
      
    </div>
  )
}

export default Admin