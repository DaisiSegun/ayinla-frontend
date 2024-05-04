import React, { useEffect, useState } from 'react';
import './SearchResult.scss';


import newRequest from '../../utils/newRequest';

import { useLocation } from 'react-router-dom';
import LocationCard from '../../components/LocationCard/LocationCard'
import Sorry from '../../components/Sorry/Sorry';





function SearchResult() {
  useEffect(() => {
    document.title = 'Search Result';
  }, []);

  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading to true when starting a new request
        const response = await newRequest.get(`/services/all?search=${search}`);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  },[search] );

  if (isLoading) {
    return (
      <div className='loader'>
        <div className='load-page'>
        <p className='load-text'>Loading, please kindly wait..</p>
      
        
        </div>
 
      </div>
    );
  }

  if (error) {
    return <div>Error loading data, Bad network or refresh page</div>;
  }

  return (
    <div className='sps'>
    
    <h1 className='header-24px'>Search Result</h1>
    <p className='subtitle-text'>Find a film location</p>

    {data.length === 0 && <Sorry />}

    <div className="location-card-con">

   

    {/* Display services with matching titles first */}
    {data
      .filter((service) =>
        service.title.toLowerCase().includes(search.toLowerCase())
      )
      .map((service) => (
        <LocationCard key={service._id} item={service} />
      ))}
    
    {/* Display remaining services */}
    {data
      .filter((service) =>
        !service.title.toLowerCase().includes(search.toLowerCase())
      )
      .map((service) => (
        <LocationCard key={service._id} item={service} />
      ))}

</div>
  
  </div>
  );
}

export default SearchResult;