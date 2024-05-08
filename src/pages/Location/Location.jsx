import React, { useState, useEffect } from 'react';
import './Location.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

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
        <div className='loading-con'>
          <p className='loading-text'>Loading please wait...</p>
        </div>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, // Show arrows on screens larger than 768px
        settings: {
          arrows: true,
        },
      },
    ],
  };
  return (
    <div className='location-page'>
      {service && (
        <div className='location'>
          <div className='location-sec-1'>
            <Slider {...settings}>
              {service.images.map((image, index) => (
                <div key={index}>
                  <img className='location-img' src={image} alt={`Slide ${index}`} />
                </div>
              ))}
            </Slider>
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
      <div className='footer-sec'></div>
    </div>
  );
}

export default Location;