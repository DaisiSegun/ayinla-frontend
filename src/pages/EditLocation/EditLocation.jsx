import React, { useReducer, useState, useEffect } from "react";
import './EditLocation.scss'


import { locationReducer, INITIAL_STATE } from "../../reducers/locationReducer.js";
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest.js'
import upload from "../../utils/upload.js";
import { CircleLoader} from "react-spinners";
import Resizer from 'react-image-file-resizer';
import getCurrentUser from "../../utils/getCurrentUser.js";
import Header from "../../components/Header/Header.jsx";

function EditLocation() {
  const location = useLocation();
  const serviceId = location.pathname.split('/').pop();
  const [previousService, setPreviousService] = useState({});
  useEffect(() => {
    document.title = 'Edit Service';
    const fetchService = async () => {
      try {
        const response = await newRequest.get(`/services/single/${serviceId}`);
        setPreviousService({ ...response.data }); 
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();
  }, [serviceId]);



  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(locationReducer, INITIAL_STATE);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name, value },
    });
    setPreviousService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const currentUser = getCurrentUser();
  const userId = currentUser?.user?._id || currentUser?.user?.id;
 

  const handleCreateService = async (e) => {
    e.preventDefault();
    setUploading(true);

 
  
  
    try {
      const resizedImages = await Promise.all(
        [...files].map(async (file) => {
          return new Promise((resolve, reject) => {
            Resizer.imageFileResizer(
              file,
              file.width, // Maintain original width
              file.height, // Maintain original height
              file.type === 'image/jpeg' ? 'JPEG' : 'PNG', // Use original format
              65, // Quality of the resized image (adjust as needed, 100 for no compression)
              0,
              (uri) => {
                resolve(uri);
              },
              'base64'
            );
          });
        })
      
      );

      if (!userId) {
        const errorMessage = 'Only authenticated Sellers can edit a service';
        setErrorMessage(
          'Error uploading images or creating service. '
        );
        console.error(errorMessage); // Log the error to the console
        // You can also display an alert message to the user
        // alert(errorMessage);
        throw new Error(errorMessage); // Throw the error to stop further execution
      }
      const images = await Promise.all(
        resizedImages.map(async (resizedImage) => {
          const url = await upload(resizedImage);
          return url;
        })
      );
  
      const serviceData = { ...state, images, userId  };
  
        
      await newRequest.put(`/services/${serviceId}`, serviceData);

      console.log(serviceId);
  
      setUploading(false);
      dispatch({ type: 'ADD_IMAGES', payload: { images } });
      setSuccessMessage(
        'Your service has been updated'
      );
      setErrorMessage(null);
    } catch (err) {
      console.log(err);
      setUploading(false);
      setErrorMessage(
        'Error uploading images or creating service. '
      );
      setSuccessMessage(null);
    }
  };
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await newRequest.delete(`/services/${serviceId}`, { data: { userId } });
        // Assuming you want to redirect to another page after deletion
        // Replace '/myservice' with your desired route
        navigate('/myservice');
      } catch (error) {
        console.error('Error deleting service:', error);
        // Handle error as needed
      }
    }
  };

  return (

    

    <div className='create-service'>
      <Header />
      <div className="header-create">
      Edit Location
      </div>
      <p className='red-notice'>You cant edit image</p>
      <button 
  onClick={handleDelete} 
  style={{
    backgroundColor: '#8B0000',
    color: '#fff',
    marginTop: '1rem',
    border: 'none',  // Remove the border
    marginLeft: '1rem',  // Add margin to the left
    marginRight: '1rem',  // Add margin to the right
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '0.5rem',
    width: '30%',
    borderRadius: '1rem',
    cursor: 'pointer'
  }}
>
  Delete Location
</button>

      <div className="section-container">
        <div className="section-1">

          <div className="create-contianer">
              <p className='create-title'>Edit Name of your location</p>
              <input
                type="text"
                name="title"
                value={previousService.title || ''} // Set the value prop
                onChange={handleChange}
                placeholder="e.g iPhone technician, makeup artist"
                className="create-input"
              />
                
          </div>


          <p htmlFor="" className='create-title2'>Change Category</p>

          <select name="cat" id="cat" onChange={handleChange}  className="create-contianer">

          
              <option value="">Select a category</option>
              <option value="Mainland">Mainland</option>
         
              
              <option value="others">others</option>

          </select>

          <div className="create-contianer">
              <p className='create-title'>Edit your Company/Brand Description</p>
              <textarea
                type="text"
                name="desc"
                value={previousService.desc || ''} // Set the value prop
                style={{ height: '200px' }}
                onChange={handleChange}
                placeholder="Please share a detailed description with all the relevant details."
                className="create-input2"
              />

          </div>


          
          <div className="create-contianer">
              <p className='create-title'>edit Service Location (Please make it short)</p>
              <input
                type="text"
                name="locationAdressc"
                value={previousService.locationAdress|| ''} // Set the value prop
                onChange={handleChange}
                placeholder="e.g Ikeja, Lagos"
                className="create-input"
              />

          </div>

          <div className="create-contianer">
              <p className='create-title'>Price </p>
              <input
                type="text"
                name="price"
                value={previousService.price || ''} // Set the value prop
                onChange={handleChange}
                placeholder="minimum fee for your service or type negotiable"
                className="create-input"
              />

          </div>
          
        

        
        </div>

        <div className="section-2">

            
          
          <div className="create-contianer">
              <p className='create-title'>Booking Fee </p>
              <input
                type="text"
                name="bookingFee"
                value={previousService.bookingFee || ''} // Set the value prop
                onChange={handleChange}
                placeholder="10,000"
                className="duration"
              />

          </div>

          <div className="create-contianer">
              <p className='create-title'>Time allowed</p>

              <input
                type="text"
                name="timeAvailable"
                value={previousService.timeAvailable || ''} // Set the value prop
                onChange={handleChange}
                placeholder="e.g Only Monadays"
                className="create-input"
              />

          </div>

         




          <div className="create-contianer2">
              <label htmlFor="" className='create-title2'>Add images </label>
              

              <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}  
                />

              {successMessage && <p className="success-box">{successMessage}</p>}
              {errorMessage && <p className="error-box">{errorMessage}</p>}
             

          </div>

          <button onClick={handleCreateService} className='button2'>
            {uploading ? (
              <>
                <CircleLoader size={25} color="#36D7B7" uploading={uploading} />
                <span style={{ marginLeft: "10px" }}>Editing Service...</span>
              </>
            ) : (
              <>
                Edit Service
               
              </>
            )}
          </button>
          
    
     
        </div>
      </div>
    
      <div className='space'></div>
    </div>
  )
}

export default EditLocation