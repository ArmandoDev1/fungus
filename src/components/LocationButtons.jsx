// File: LocationButtons.jsx

import React from 'react';
import './LocationButtons.css';

const LocationButtons = ({ locations, onClick, selectedLocation }) => (
  <div className="location-buttons-container">
    {locations.map((location, index) => (
      <button
        key={index}
        className={`location-button ${selectedLocation === location ? 'selected' : ''}`}
        onClick={() => onClick(location)}
      >
        {location}
      </button>
    ))}
  </div>
);

export default LocationButtons;
