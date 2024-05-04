import React from 'react'
import './LocationCard.scss'




function LocationCard({item}) {

  const openLocation = () => {
    window.open(`/location/${item._id}`, '_blank');
  };
  return (
    <div onClick={openLocation} className='location-card'>
        <img src={item.images[0]} alt='' className='location-img'/>
        <div className='location-card-text-con'>
          <p className='area'>{item.locationAdress}</p>
          <p className='title'>{item.title}</p>
        </div>
        <p className='price5'>₦ {item.price}</p>
    </div>
  )
}

export default LocationCard