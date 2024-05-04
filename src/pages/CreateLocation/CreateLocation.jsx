import React, { useReducer, useState, useEffect } from "react";
import './CreateLocation.scss'



import { locationReducer, INITIAL_STATE } from "../../reducers/locationReducer";

import newRequest from '../../utils/newRequest.js'
import upload from "../../utils/upload.js";
import { CircleLoader} from "react-spinners";
import Resizer from 'react-image-file-resizer';
import getCurrentUser from "../../utils/getCurrentUser.js";


import Select from 'react-select';


function CreateLocation() {
  useEffect(() => {
    document.title = 'Create Locaton';
  }, []);


  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(locationReducer, INITIAL_STATE);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const currentUser = getCurrentUser();
  const userId = currentUser?.user?._id || currentUser?.user?.id;
  
  const handleCreateService = async (e) => {
 
    
    try {
      // Check for title
      if (!state.title) {
        console.error('Title is required');
        throw new Error('Title is required');
      }
  
      // Check for category
      if (!state.cat) {
        console.error('Category is required');
        throw new Error('Category is required');
      }
  
      // Check for description
      if (!state.desc) {
        console.error('Description is required');
        throw new Error('Description is required');
      }

      if (!state.locationAdress) {
        console.error('Service Location is required');
        throw new Error('Service Location is required');
      }

      if (!state.bookingFee) {
        console.error('Bookign fee is required');
        throw new Error('Bookign fee  is required');
      }

      if (!state.timeAvailable) {
        console.error('Time allowed is required');
        throw new Error('Time allowed is required');
      }

      if (!state.price) {
        console.error('Price is required');
        throw new Error('Price is required');
      }
      if (!userId) {
        const errorMessage = 'Only authenticated Sellers can create a service';
        console.error(errorMessage); 
        throw new Error(errorMessage); // Throw the error to stop further execution
      }
    

     
     
 



    e.preventDefault();
    setUploading(true);
  
  
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
  
      const images = await Promise.all(
        resizedImages.map(async (resizedImage) => {
          const url = await upload(resizedImage);
          return url;
        })
      );
  
      const serviceData = { ...state, images, userId };
  
      await newRequest.post('/services', serviceData);
  
      setUploading(false);
      dispatch({ type: 'ADD_IMAGES', payload: { images } });
      setSuccessMessage(
        'Location Created! '
      );
      setErrorMessage(null);
    } catch (err) {
      console.log(err);
      setUploading(false);
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
      setSuccessMessage(null);
    }
  };

  const categoryOptions = [
    { value: "", label: "Select a category" },
    { value: "Main land", label: "Mainland" },
 
  
  ];
  

  return (

    

    <div className='create-service'>
    
      <div className="header-create">
        Create new location
      </div>
      <p className='red-notice'>Create a new location</p>

      <div className="section-container">
        <div className="section-1">

          <div className="create-contianer">
              <p className='create-title'>Name of your Service</p>
              <input 
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder='e.g Stadium' className='create-input'/>

          </div>


          <p htmlFor="" className='create-title2'>Category - Search Category</p>

          <Select
          options={categoryOptions}
          onChange={(selectedOption) => dispatch({ type: "CHANGE_INPUT", payload: { name: 'cat', value: selectedOption.value } })}
          className="create-contianer"
        />

          
              

          <div className="create-contianer">
              <p className='create-title'> About location</p>
              <textarea
                type="text"
                name="desc"
                style={{ height: '200px' }} 
                onChange={handleChange}
              placeholder='Please share a detailed description with all the relevant details.' className='create-input2'/>

          </div>


          
          <div className="create-contianer">
              <p className='create-title'>Service Location</p>
              <input
                type="text"
                name="locationAdress"
                onChange={handleChange}
              placeholder='e.g Ikeja, Lagos' className='create-input'/>

          </div>

          <div className="create-contianer">
              <p className='create-title'>Price </p>
              <input
                type="text"
                name="price"
                onChange={handleChange}
              placeholder='1,200,000' className='create-input'/>

          </div>
          
        
        
        </div>

        <div className="section-2">

            
          
          <div className="create-contianer">
              <p className='create-title'>Booking Fee</p>
              <input 
              type="text"
              name="bookingFee"
              onChange={handleChange}
              placeholder='10,000' className='create-input'/>

          </div>

          <div className="create-contianer">
              <p className='create-title'>Time Allowed </p>

              <input 
              type="text"
              name="timeAvailable"
              onChange={handleChange}
              placeholder='e.g Only mondays' className='create-input'/>

          </div>






          <div className="create-contianer2">
              <label htmlFor="" className='create-title2'>Upload Images </label>

             

              <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />

              {successMessage && <p className="success-box">{successMessage}</p>}
              {errorMessage && <p className="error-box">{errorMessage}</p>}
              {/* <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button> */}

          </div>

          <button onClick={handleCreateService} className='button2'>
            {uploading ? (
              <>
                <CircleLoader size={25} color="#36D7B7" uploading={uploading} />
                <span style={{ marginLeft: "10px" }}>Posting Location...</span>
              </>
            ) : (
              <>
                Post Location
               
              </>
            )}
          </button>
          
    
      
        </div>
      </div>
    
      <div className='space'></div>
      
    </div>
  )
}

export default CreateLocation