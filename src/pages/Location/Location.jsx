import React, { useState, useEffect } from 'react';
import './Location.scss';
// import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
// import logo from '../../images/logo.png';

function Location() {


  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(0);

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
       
        <div className='loading-con'>
          {/* <img alt='logo' className='loading-img' src={logo} /> */}
          <p className='loading-text'>Loading please wait...</p>
        </div>
      </div>
    );
  }
  

 

  return (
    <div className='location-page'>
     
      {service && (
        <div className='location'>
          <div className='location-sec-1'>
          {/* <AwesomeSlider
              organicArrows={true}
              bullets={true}
              className='carousel'
              selected={currentIndex}
              onChange={setCurrentIndex}
            >
              {service.images.map((image, index) => (
                <div key={index} data-src={image} />
              ))}
            </AwesomeSlider> */}

            <img src={service.images[0]} alt='' className='location-img' />
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
        
      </div>
    </div>
  );
}

export default Location;
