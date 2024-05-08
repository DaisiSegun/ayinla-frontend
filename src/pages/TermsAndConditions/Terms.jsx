
// TermsAndConditionsPage.js

import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import './Terms.scss';

const Terms = () => {
  useEffect(() => {
    document.title = 'Terms and Conditions';
  }, []);

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const handleCheckboxChange = () => {
    setAgreeToTerms((prevValue) => !prevValue);
  };
  return (
    <div className="terms-page">
      <h1>Ayinla Terms and Conditions</h1>
      <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}>
      The following terms and conditions apply to any request, use and or usage of our platform..

        </p>

    
          

        <div className="term-con">

          <label htmlFor="agreeToTermsCheckbox" className="agree-label">
            By signing up, you have agreed to the:{' '}
            
            <div className='tick-box'> <Link to="/terms&conditions">terms and conditions</Link>. 
            
            
          <input
            type='checkbox'
            id='agreeToTermsCheckbox'
            checked={agreeToTerms}
            onChange={handleCheckboxChange}
            className='check-box'
          />

          {/* <p className='checkbox'>checkbox</p> */}
            </div>
          
          </label>


</div>
    
    </div>
  );
};

export default Terms;
