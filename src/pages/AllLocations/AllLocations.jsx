import React, { useEffect, useState } from 'react';
import './AllLocations.scss';
import newRequest from '../../utils/newRequest';
import LocationCard from '../../components/LocationCard/LocationCard';

function AllLocations() {
  useEffect(() => {
    document.title = 'All Locations';
  }, []);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading to true when starting a new request
        const response = await newRequest.get(`/services/all`);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <h1 className='header-24px'>All our Locations</h1>
      <p className='subtitle-text'>Explore all Locations</p>

      <div className='location-card-con'> 

      

      {data.map((service) => (
        <LocationCard key={service._id} item={service} />
      ))}

    </div>
    </div>
  );
}

export default AllLocations;
