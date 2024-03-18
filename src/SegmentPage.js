import React, { useState } from 'react';
import './SegmentPage.css'; 
import Popup from './Popup'; 

const SegmentPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSaveSegment = () => {
    togglePopup();
  };

  const handleCancel = () => {
    togglePopup();
  };

  return (
    <div className="segment-page">
      <div className="header">Header Content</div>
      <button className="save-button" onClick={handleSaveSegment}>Save Segment</button>
      {showPopup && <Popup onSave={handleSaveSegment} onCancel={handleCancel} />}
    </div>
  );
}

export default SegmentPage;
