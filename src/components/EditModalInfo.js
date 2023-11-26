// EditProfileModal.js

import React from 'react';
import "../styles/EditModalInfo.scss"

const EditProfileModal = ({ isOpen, onClose, onSave, userData, setUserData }) => {
  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <label>
          First Name:
          <input
            type="text"
            value={userData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={userData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="text"
            value={userData.mobileNum}
            onChange={(e) => handleInputChange('mobileNum', e.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={userData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        </label>
        <button className="on-save-btn" onClick={onSave}>Save Changes</button>
        <button className="on-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditProfileModal;
