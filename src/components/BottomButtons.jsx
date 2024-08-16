import React, { useState } from 'react';
import Popup from './Popup';
import './BottomButtons.css';

const BottomButtons = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  const handleZeitplanClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCoursesUpdate = (updatedCourses) => {
    setCourses(updatedCourses);
    window.location.reload(); // to re-render the timetable with new data
  };

  return (
    <div className="button-container">
      <button className="bottom-button button1">Termine</button>
      <button className="bottom-button button2">Nachricht</button>
      <button className="bottom-button button3">Techniken</button>
      <button className="bottom-button button4" onClick={handleZeitplanClick}>Zeitplan</button>
      {isPopupOpen && <Popup onClose={handleClosePopup} onCoursesUpdate={handleCoursesUpdate} />}
    </div>
  );
};

export default BottomButtons;
