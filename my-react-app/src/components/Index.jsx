// Import React and other necessary modules
import React, { useEffect, useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import EditContent from './Edit'; // Import the EditContent component

// Index component
export const Index = () => {
  const [storedData, setStoredData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedItemToEdit, setSelectedItemToEdit] = useState(null);

  // useEffect to fetch data from localStorage on component mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('submittedData')) || [];
    setStoredData(data);
  }, []);

  // Function to handle adding content
  const handleAddContent = () => {
    window.location.href = '/add';
  };

  // Function to handle viewing details
  const handleView = (selectedItem) => {
    console.log(`Viewing details for ${selectedItem}`);
  };

  // Function to handle editing content
  const handleEdit = (selectedItem) => {
    setSelectedItemToEdit(selectedItem);
    setShowEdit(true);
  };

  // Function to handle deleting content
  const handleDelete = (selectedItem) => {
    setSelectedItemToDelete(selectedItem);
    setShowConfirmation(true);
  };

  // Function to confirm deletion
  const handleConfirmDelete = () => {
    const data = JSON.parse(localStorage.getItem('submittedData')) || [];
    const updatedData = data.filter((entry) => entry.selectedItem !== selectedItemToDelete);
    localStorage.setItem('submittedData', JSON.stringify(updatedData));
    setStoredData(updatedData);
    setShowConfirmation(false);
  };

  // Function to cancel deletion
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className='Home'>
      <div className="content content-center">
        {showEdit ? ( // Conditionally render EditContent component
          <EditContent
            selectedItem={selectedItemToEdit}
            onClose={() => setShowEdit(false)}
          />
        ) : (
          <div>
            <div className="heading">
              <h2>Welcome to Favorite NPM Packages</h2>
              {storedData.length > 0 && (
                <button onClick={handleAddContent}>Add content</button>
              )}
            </div>
            
            {storedData.length > 0 && (
              <div>
                <h3>Stored Data:</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Package Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storedData.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.selectedItem}</td>
                        <td>
                          <p className="action-link" onClick={() => handleView(entry.selectedItem)}>View</p>
                          <p className="action-link" onClick={() => handleEdit(entry.selectedItem)}>Edit</p>
                          <p className="action-link" onClick={() => handleDelete(entry.selectedItem)}>Delete</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {storedData.length === 0 && (
              <div className="add-content end">
                <button onClick={handleAddContent}>Add content</button>
              </div>
            )}
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <ConfirmationModal
            message={`Are you sure you want to delete ${selectedItemToDelete}?`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
};
