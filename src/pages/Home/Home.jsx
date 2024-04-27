import Header from "../../components/Header/Header";
import LocationCard from "../../components/LocationCard/LocationCard";
import './Home.scss'
import home1 from '../../images/home-1.jpeg'



function Home() {
  return (
    <div className="home">
       <Header/>

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
        <div className="view-all">View all</div>
      </div>

      <div className="locationCard-con">

    

      <LocationCard
        image= 'https://res.cloudinary.com/dsddxqtss/image/upload/v1714168352/dfveyg1voc1z2ar8jss3.jpg'
        price= '700,000'
        location= 'Ikeja, Lagos'
        title= 'Residential Home'
        
      />

      
      <LocationCard
              image= 'https://res.cloudinary.com/dsddxqtss/image/upload/v1714168352/a28ov7sma8u87crg5ypn.jpg'
              price= '1,200,000'
              location= 'Lekki, Lagos'
              title= 'Sporting Stadium'
              
            />

    <LocationCard
              image= 'https://res.cloudinary.com/dsddxqtss/image/upload/v1714169176/htd92bip503drx6cb0mb.jpg'
              price= '800,000'
              location= 'Lekki Ikate'
              title= 'CLOVA D10'
              
            />

<LocationCard
              image= 'https://res.cloudinary.com/dsddxqtss/image/upload/v1714203566/a9vop1ufetlc8dxv9n1k.jpg'
              price= '1,200,000'
              location= 'Ikeja, Lagos'
              title= 'Park'
              
            />
          
    
    </div>


    </div>
    
      <div className="sec-3">

        <img src="https://res.cloudinary.com/dsddxqtss/image/upload/v1714203735/nvaortucxkvv80aqtdgt.jpg" alt="" className="discover-img"/>

        <div className="discover-con">
          <h1 className="dicover-header">Discover our History</h1>
          <p className="discover-sub">Ayinla Films, a Nigerian company, specializes in scouting and providing exceptional locations for film shoots and music videos. They are known for their dedication to quality and innovation, helping filmmakers and directors bring their visions to life with diverse location options tailored to their creative needs</p>
        </div>

      </div>


    </div>
  );
}

export default Home;
