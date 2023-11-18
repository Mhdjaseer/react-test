import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [textInput, setTextInput] = useState('');
  const [showAllResults, setShowAllResults] = useState(false);
  const [searchTimeoutId, setSearchTimeoutId] = useState(null);


  const handleSearch = async () => {
    try {
      clearTimeout(searchTimeoutId);

      const timeoutId = setTimeout(async () => {
        const response = await axios.get(`https://api.npms.io/v2/search?q=${searchTerm}`);
        setSearchResults(response.data.results || []);
      }, 500);

      setSearchTimeoutId(timeoutId);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleCheckboxChange = (itemName) => {
    setSelectedItem(itemName);
  };

  const handleShowMore = () => {
    setShowAllResults(true);
  };

  const handleSubmit = () => {
    if (textInput.trim() === '') {
      alert('Please enter text before submitting.');
      return;
    }
  
    const submittedData = {
      selectedItem: selectedItem,
      textInput: textInput,
    };
  
    try {
      // Retrieve existing data from local storage
      const existingData = JSON.parse(localStorage.getItem('submittedData'));
  
      // Check if existingData is an array
      const dataArray = Array.isArray(existingData) ? existingData : [];
  
      // Append the new data to the existing data
      const newData = [...dataArray, submittedData];
  
      // Save the updated data back to local storage
      localStorage.setItem('submittedData', JSON.stringify(newData));
  
      // Optionally, you can clear the selected item and textInput after submission
      setSelectedItem('');
      setTextInput('');
      window.location.href = '/';
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };
    

  return (
    <div className="search-container">
      <p className="search-info">Search for NPM Packages</p>
      <input
        type="text"
        className="search-input"
        placeholder="React"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch();
        }}
      />

      <div className="search-results">
        <p className="search-info">Result:</p>
        <ul className="search-result">
          {searchResults.slice(0, showAllResults ? undefined : 3).map((result) => (
            <li key={result.package.name}>
              <label>
                <input
                  type="radio"
                  className="checkbox-round"
                  checked={selectedItem === result.package.name}
                  onChange={() => handleCheckboxChange(result.package.name)}
                />
                {result.package.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {searchResults.length > 3 && !showAllResults && (
        <div className="show-more">
          <p onClick={handleShowMore} style={{ cursor: 'pointer', color: 'blue' }}>
            Show more
          </p>
        </div>
      )}

      <div className="selected-items">
        <p className="search-info">Why is this your fav?</p>
        <textarea
          className="search-input"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <div className="sbt-center">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
