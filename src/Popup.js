import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ onSave, onCancel }) => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [addedSchemas, setAddedSchemas] = useState([]);

  const handleSaveSegment = () => {
  
    const dataToSend = {
      segment_name: segmentName,
      schema: addedSchemas.map(schema => ({ [schema]: schema }))
    };

  
    fetch('https://webhook.site/4c3c3663-3966-4900-8671-b38017aea006', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save segment');
      }
      return response.json();
    })
    .then(() => {
      onSave(); 
    })
    .catch(error => {
      console.error('Error saving segment:', error);
     
    });
  };

  const handleAddNewSchema = () => {
    if (selectedSchema) {
      setAddedSchemas([...addedSchemas, selectedSchema]);
      setSelectedSchema('');
    }
  };

  const handleSchemaChange = (e) => {
    setSelectedSchema(e.target.value);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <span className="popup-label">Save Segment</span>
          <button className="back-button" onClick={onCancel}>{'<'}</button>
        </div>
        <div className="popup-body">
          <label className="popup-label">Enter the Name of the segment</label>
          <input type="text" placeholder="Name of the segment" value={segmentName} onChange={(e) => setSegmentName(e.target.value)} />
          <label className="popup-label">To save your segment, you need to add the schemas to build the query.</label> <br></br><br></br>
          <label className="popup-label">Add schema to segment</label>
          <select value={selectedSchema} onChange={handleSchemaChange}>
            <option value="">Select Schema</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="age">Age</option>
            <option value="account_name">Account Name</option>
            <option value="city">City</option>
            <option value="state">State</option>
            {}
          </select>
          <button onClick={handleAddNewSchema}>+ Add new schema</button>
          
          {addedSchemas.length > 0 && (
            <div className="added-schemas">
              {addedSchemas.map(schema => (
                <div key={schema} className="added-schema">
                  <span>{schema}</span>
                </div>
              ))}
            </div>
          )}

         
        </div>
        <div className="popup-footer">
          <button onClick={handleSaveSegment}>Save Segment</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
