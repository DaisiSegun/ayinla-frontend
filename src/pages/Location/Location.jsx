import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import './Location.scss';
import Footer from '../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import logo from '../../images/logo.png';

function Location() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/services/single/${id}`);
        setService(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className='loading'>
        <Header />
        <div className='loading-con'>
          <img alt='logo' className='loading-img' src={logo} />
          <p className='loading-text'>Loading please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='location-page'>
      <Header />
      {service && (
        <div className='location'>
          <div className='location-sec-1'>
          <img
                    
                    src={service.images}
                    alt=''
                    className="location-img"
                  />
          </div>
          <div className='location-sec-2'>
            <p className='area-location'>{service.locationAdress}</p>
            <h1 className='location-title'>{service.title}</h1>
            <p className='location-price'>{service.price}</p>
            <p className='location-desc'>{service.desc}</p>
            <div className='location-button-sec'>
              <button className='location-button'>Book For inspection</button>
              <p className='inspection-price'>Inspection fee: 10,000</p>
            </div>
            <p className='location-time'>Time Allowed: {service.timeAvailable}</p>
          </div>
        </div>
      )}
      <div className='footer-sec'>
        <Footer />
      </div>
    </div>
  );
}

export default Location;