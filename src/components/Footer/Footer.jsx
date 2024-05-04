import React from 'react'
import facebook from '../../images/facebook.svg'
import instagram from '../../images/instagram.svg'
import './Footer.scss'
function Footer() {
  return (
    <div className='footer'>
      <div className='secs1'>
        <p className='footer-text'>Find us on social media</p>
        <div className='footer-img'>
          <img src={facebook} alt=''/>
          <img src={instagram} alt=''/>
        </div>
      </div>

      <div className='secs1'>
      <p className='footer-text'>About Us</p>
      <p className='footer-text'>Privacy policy</p>
      <p className='footer-text'>FAQs</p>
      </div>

      <div className='secs1'>
      <p className='footer-text'>Locations</p>
      <p className='footer-text'>Contact us</p>
      </div>

    </div>
  )
}

export default Footer