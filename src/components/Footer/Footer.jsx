import React from 'react'
import facebook from '../../images/facebook.svg'
import instagram from '../../images/instagram.svg'
import './Footer.scss'
import chat from '../../images/chat-blue.svg'
function Footer() {

  const handleWhatsAppClick = () => {
    const phoneNumber = '+2349050132244'; // Your WhatsApp number
    const message = encodeURIComponent('Hello, I would like to chat with Ayinla films.'); // Message to send
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };


  
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
      <p onClick={() => window.location.href = '/about-us'} className='footer-text'>About Us</p>
      <p onClick={() => window.location.href = '/privacy-policy'} className='footer-text'>Privacy policy</p>
      <p  className='footer-text'>FAQs</p>
      </div>

      <div className='secs1'>
      <p onClick={() => window.location.href = '/all-location'} className='footer-text'>Locations</p>
      <p onClick={() => window.location.href = '/contact-us'} className='footer-text'>Contact us</p>
      </div>

      <img onClick={handleWhatsAppClick}  src={chat} className='chat-bot' alt='' />

    </div>
  )
}

export default Footer