import React, { useState } from "react";
import './Search.scss'
import search from '../../images/search.svg'
import newRequest from '../../utils/newRequest.js';
import { useNavigate } from "react-router-dom";
function Search() {

  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/search-result?search=${input}`);
    setInput(""); // Clear the input field after navigating
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    // Fetch suggestions using axios directly
    try {
      const response = await newRequest.get(`/services/service-suggestions?search=${inputValue}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    
    setSuggestions([]); // Clear suggestions after selecting one
    navigate(`/search-result?search=${suggestion}`);// Navigate to search results
  
  };



  return (
    <div className='search'>
      <input 
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      className='input-1'  placeholder='Search for a location' />

      
      <div onClick={handleSubmit} >
    <img src={search}  className='search-icon' alt=''/>

    </div>

    
    {suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
    
    </div>
  )
}

export default Search