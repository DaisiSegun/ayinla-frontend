import React from 'react'
import about from '../../images/perfect-place.png'
import './Aboutus.scss'
function Aboutus() {
  return (
    <div className='about-us'>
        <img className='about-img' src={about} alt=''/>
        <div className='about-con'>
          <h1 className='about-header'>About Us</h1>
          <p className='about-text'> AYINLA is a highly experienced film location company specializing in delivering exceptional backdrops to enhance any project. We excel in sourcing, scouting, and securing top-quality filming locations in Nigeria and beyond for a wide range of purposes, including TV, Film, Commercials, Photo-shoots, Events, and Virtual Services. Our team consists of talented, vibrant, and creative individuals who provide tailored creative services to meet the unique demands of any production challenge. Our extensive location gallery comprises content from esteemed sources such as film offices/commissions, production companies, homeowners, location scouts/managers, location companies, and studios, among others.</p>
        </div>
    </div>
  )
}

export default Aboutus