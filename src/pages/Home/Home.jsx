import React, { useState, useEffect, } from "react";

import LocationCard from "../../components/LocationCard/LocationCard";
import './Home.scss'
import home1 from '../../images/home-1.jpeg'
import Faq from "../../components/Faq/Faq";
import Aboutus from "../../components/Aboutus/Aboutus";
import ContentLoader from 'react-content-loader';





function Home() {

  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    fetch('https://lazy-cyan-wombat-hem.cyclic.app/api/services/all')
      .then(response => response.json())
      .then(data => {
        setLocations(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
        setLoading(false); // Set loading to false on error
      });
      const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <div className="home">
     

    <div className="sec-1">
      <div className="sec-1-img">
        <h1 className="home-title">
        Discover your ideal film location
        </h1>
        <p className="home-subtitle">
        You deserve a good location for your film location. Quickly maximize timely deliverables for real time schemas.
        </p>

     </div>

      <img src={home1} alt="Discover your ideal film location" className="sec-2-img"/>

    </div>

    <div className="sec-2">

      <h1 className="sec2-header">Our most popular Locations</h1>
      <div className="sec2-subheader-con">
        <p className="sec2-subheader">Discover some of the most popular location on our website</p>
        <div onClick={() => window.location.href = '/all-location'} className="view-all">View all</div>
      </div>

      {loading ? (
         <ContentLoader
         speed={2}
         width={windowWidth > 950 ? 300 : 150}
         height={windowWidth > 950 ? 300 : 150}
         viewBox={`0 0 ${windowWidth > 950 ? 300 : 150} ${
           windowWidth > 950 ? 300 : 150
         }`}
         backgroundColor="#f3f3f3"
         foregroundColor="#ecebeb"
       >
         <rect
           x="0"
           y="0"
           rx="3"
           ry="3"
           width={windowWidth > 950 ? 300 : 150}
           height={windowWidth > 950 ? 300 : 150}
         />
       </ContentLoader>
      ) : (
        <div className="locationCard-con">
            {locations.slice(0, 4).map(location => (
              <LocationCard key={location._id} item={location} />
            ))}
          </div>
      )}


    </div>
    
      <div className="sec-3">

        <img src="https://res.cloudinary.com/dsddxqtss/image/upload/v1714203735/nvaortucxkvv80aqtdgt.jpg" alt="" className="discover-img"/>

        <div className="discover-con">
          <h1 className="dicover-header">Discover our History</h1>
          <p className="discover-sub">Ayinla Films, a Nigerian company, specializes in scouting and providing exceptional locations for film shoots and music videos. They are known for their dedication to quality and innovation, helping filmmakers and directors bring their visions to life with diverse location options tailored to their creative needs</p>
        </div>

      </div>

      <div className="sec-4" >

          <div className="faq-header-con">

          <h1 className="faq-header">Frequently Asked <span style={{ color: '#223A6A' }}>Questions</span></h1>

            <p className="faq-subHeader">Easily setup an appointment directly from the location listing page using our integrated booking options.</p>

          </div>

          <div className="faq-drop-con">
              <Faq/>


          </div>

      </div>

      <div className="sec-5"  >  
          <Aboutus/>  
          
      </div>

     


    </div>
  );
}

export default Home;
