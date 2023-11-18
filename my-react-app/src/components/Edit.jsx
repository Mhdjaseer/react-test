import React, { useEffect, useState } from 'react';

const Edit = (item) => {
  const [storedData, setStoredData] = useState([]);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('submittedData')) || [];
    setStoredData(data);

    // Find the selected item in storedData and set the textarea value
    const selectedItemData = data.find((d) => d.selectedItem === item.selectedItem);
    if (selectedItemData) {
      setTextInput(selectedItemData.textInput);
    }
  }, [item.selectedItem]);

  const handleTextAreaChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = () => {
    // Update storedData with the new textInput value
    const updatedData = storedData.map((d) =>
      d.selectedItem === item.selectedItem ? { ...d, textInput } : d
    );
    localStorage.setItem('submittedData', JSON.stringify(updatedData));
    // Additional logic for submitting data, if needed
    window.location.href = '/';
  };

  return (
    <div className="search-container">
<h2>Welcome to Favorite NPM Packages</h2>
      <div className="search-results">
        <p className="search-info">Result:</p>
        <ul className="search-result">
          <li>
            <label>
              <input type="radio" className="checkbox-round" />
              {item.selectedItem}
            </label>
          </li>
        </ul>
      </div>

      <div className="selected-items">
        <p className="search-info">Why is this your fav?</p>
        <textarea
          className="search-input"
          value={textInput}
          onChange={handleTextAreaChange}
        />
        <div className="sbt-center">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
