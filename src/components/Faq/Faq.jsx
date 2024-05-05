import React, { useState } from 'react';
import drop from '../../images/drop-down.svg';
import './Faq.scss';

function Faq() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  const toggleDropdown1 = () => setIsOpen1(!isOpen1);
  const toggleDropdown2 = () => setIsOpen2(!isOpen2);
  const toggleDropdown3 = () => setIsOpen3(!isOpen3);
  const toggleDropdown4 = () => setIsOpen4(!isOpen4);

  return (
    <div className='faq-con'>
      <div className='drop-down' onClick={toggleDropdown1}>
        <p className='drop-text'>Looking for an outdoor or indoor location</p>
        <img src={drop} alt='' className='drop-icon' />
      </div>
      {isOpen1 && (
        <div className='dropdown-info'>
          <p>We offer both outdoor or indoor location please use the search to discover.</p>
        </div>
      )}

      <div className='drop-down' onClick={toggleDropdown2}>
        <p className='drop-text'>Looking for mainland or island locations?</p>
        <img src={drop} alt='' className='drop-icon' />
      </div>
      {isOpen2 && (
        <div className='dropdown-info'>
          <p>We offer both mainland and island locations please use the search to discover..</p>
        </div>
      )}

      <div className='drop-down' onClick={toggleDropdown3}>
        <p className='drop-text'>Would it be night or daytime?</p>
        <img src={drop} alt='' className='drop-icon' />
      </div>
      {isOpen3 && (
        <div className='dropdown-info'>
          <p>Depending on the location but we offer both day and nightime </p>
        </div>
      )}

      <div className='drop-down' onClick={toggleDropdown4}>
        <p className='drop-text'>Estimated time of completion ?</p>
        <img src={drop} alt='' className='drop-icon' />
      </div>
      {isOpen4 && (
        <div className='dropdown-info'>
          <p>This is dependent on the location</p>
        </div>
      )}
    </div>
  );
}

export default Faq;
