import React from 'react'
import './LocationCard.scss'
function LocationCard({image, title, location, price}) {
  return (
    <div className='location-card'>
        <img src={image} alt='' className='location-img'/>
        <div className='location-card-text-con'>
          <p className='area'>{location}</p>
          <p className='title'>{title}</p>
        </div>
        <p className='price'>₦ {price}</p>
    </div>
  )
}

export default LocationCard