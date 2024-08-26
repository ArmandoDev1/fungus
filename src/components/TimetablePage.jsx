// File: TimetablePage.jsx

import React, { useState, useEffect } from 'react';
import Timetable from './Timetable';
import LocationButtons from './LocationButtons';
import { fetchCourses } from './saveToLocalStorage'; // Assuming you fetch courses from localStorage now

const TimetablePage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('Spandau');
  const [selectedHall, setSelectedHall] = useState('Halle 1');

  useEffect(() => {
    // Fetch courses when the component mounts
    fetchCourses()
      .then(setCourses)
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const handleHallClick = (hall) => {
    setSelectedHall(hall);
  };

  return (
    <div className="timetable-page">
      <LocationButtons
        locations={['Spandau', 'Lübars', 'Wilmersdorf', 'Steglitz', 'Tegel', 'Waltersdorf']} // Adjust locations as needed
        onClick={handleLocationClick}
        selectedLocation={selectedLocation}
      />
      <LocationButtons
        locations={['Halle 1', 'Halle 2', 'Halle 3']} // Adjust halls as needed
        onClick={handleHallClick}
        selectedLocation={selectedHall}
      />
      <Timetable
        courses={courses.filter(
          (course) => course.location === selectedLocation && course.hall === selectedHall
        )}
      />
    </div>
  );
};

export default TimetablePage;
