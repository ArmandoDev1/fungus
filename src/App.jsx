// File: App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Diagram from './components/Diagram';
import Timetable from './components/Timetable';
import BottomButtons from './components/BottomButtons';
import SlidingPanel from './components/SlidingPanel';
import LocationButtons from './components/LocationButtons';
import logo from './assets/logo_randori.png';

function App() {
  const [selectedLocation, setSelectedLocation] = useState('Spandau');
  const [selectedHall, setSelectedHall] = useState('Halle 1');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, []);

  const topButtons = ['Spandau', 'Lübars', 'Wilmersdorf', 'Steglitz', 'Tegel', 'Waltersdorf'];
  const bottomButtons = ['Halle 1', 'Halle 2', 'Halle 3'];

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setSelectedHall('Halle 1');
  };

  const handleHallClick = (hall) => {
    setSelectedHall(hall);
  };

  const filteredCourses = courses.filter(course => 
    (selectedLocation ? course.location === selectedLocation : true) &&
    (selectedHall ? course.hall === selectedHall : true)
  );

  return (
    <div className="app-background">
      <Header />
      <div>
        <img src={logo} alt="Logo" className="menu-image" />
        <div className="menu-button">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="rectangle-container">
        <Diagram />
        <div className="rectangle">
          <LocationButtons 
            locations={topButtons} 
            onClick={handleLocationClick} 
            selectedLocation={selectedLocation} 
          />
          <Timetable courses={filteredCourses} />
          <LocationButtons 
            locations={bottomButtons} 
            onClick={handleHallClick} 
            selectedLocation={selectedHall} 
          />
        </div>
      </div>
      <BottomButtons />
      <SlidingPanel />
    </div>
  );
}

export default App;
