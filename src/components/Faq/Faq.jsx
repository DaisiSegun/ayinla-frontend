import React from 'react'
import drop from '../../images/drop-down.svg'
import './Faq.scss'
function Faq() {
  return (
    <div className='faq-con'>
      <div className='drop-down'>

        <p className='drop-text'>Looking for an outdoor or indoor location</p>
        <img src={drop} alt='' className='drop-icon'/>
      </div>

      <div className='drop-down'>

        <p className='drop-text'>Looking for mainland or island locations?</p>
        <img src={drop} alt='' className='drop-icon'/>
        </div>

        <div className='drop-down'>

        <p className='drop-text'>Would it be night or daytime?</p>
        <img src={drop} alt='' className='drop-icon'/>
        </div>


        <div className='drop-down'>

        <p className='drop-text'>Estimated time of completion ?</p>
        <img src={drop} alt='' className='drop-icon'/>
        </div>


    </div>
  )
}

export default Faq;