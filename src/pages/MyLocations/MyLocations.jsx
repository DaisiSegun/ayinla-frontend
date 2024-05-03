import React, { useState, useEffect } from 'react';

import './MyLocations.scss';
import Header from '../../components/Header/Header';


import getCurrentUser from '../../utils/getCurrentUser';
import { Link, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import EditIcon from '@mui/icons-material/Edit';
import Footer from '../../components/Footer/Footer';



function MyLocations() {
  useEffect(() => {
    document.title = 'My Location';
  }, []);
  const currentUser = getCurrentUser();
  const [services, setServices] = useState([]);
 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/services/all?userId=${currentUser.user._id}`);
        setServices(response.data);

     
       
      } catch (error) {
        setError('Error loading services.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser.user._id]);


  const handleOpen = (serviceId) => {
    navigate(`/edit-location/${serviceId}`);
  };

  const handleOpen2 = (serviceId) => {
    navigate(`/location-profile/${serviceId}`);
  };

  return (
    <div className="add-service">
      <Header/>
      <div className="container">
        <div className="first-section">
          <h1 className="add-service-header">Locations Available</h1>
          {currentUser.user.isAdmin && (
            <Link to="/create-location" className="link">
              <div className="button1">
                Add new Location
               
              </div>
            </Link>
          )}
        </div>

        {isLoading ? (
          'Loading...'
        ) : error ? (
          'Error loading services.'
        ) : services.length === 0 ? (
          <p className="error-message">You have no locations yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
            
             
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                
                 
                <tr  style={{ marginBottom: '1rem' }}>
                  
                  <td onClick={() => handleOpen2(service._id)} key={service._id}>
                    <img className="img" src={service.images[0]} alt="" />
                  </td>
                  <td onClick={() => handleOpen2(service._id)} key={service._id}>{service.title}</td>
                  <td onClick={() => handleOpen2(service._id)} key={service._id}>{service.price}</td>
                 

                  <td onClick={() => handleOpen(service._id)} key={service._id} style={{ width: 'max-content', textAlign: 'center', verticalAlign: 'middle' }}>
                    <EditIcon />
                  </td>
                
                </tr>
           
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div style={{ marginBottom: '5rem' }}></div>
     <Footer/>
    </div>
  );
}

export default MyLocations;