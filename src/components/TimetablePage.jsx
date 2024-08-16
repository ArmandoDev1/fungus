// File: TimetablePage.jsx

import React, { useState } from 'react';
import Timetable from './Timetable';
import LocationButtons from './LocationButtons';

const TimetablePage = ({ courses }) => {
  const [selectedLocation, setSelectedLocation] = useState("Spandau");
  const [selectedHall, setSelectedHall] = useState("Halle 1");

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const handleHallClick = (hall) => {
    setSelectedHall(hall);
  };

  return (
    <div className="timetable-page">
      <LocationButtons
        locations={["Spandau", "Halle 1", "Halle 2"]} // Add more locations as needed
        onClick={handleLocationClick}
        selectedLocation={selectedLocation}
      />
      <LocationButtons
        locations={["Halle 1", "Halle 2", "Halle 3"]} // Add more halls as needed
        onClick={handleHallClick}
        selectedLocation={selectedHall}
      />
      <Timetable
        courses={courses.filter(course => course.location === selectedLocation && course.hall === selectedHall)}
      />
    </div>
  );
};

export default TimetablePage;
