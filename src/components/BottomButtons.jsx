import React, { useState } from 'react';
import TimetablePopup from './TimetablePopup';
import TechniquesPopup from './TechniquesPopup'; // Import TechniquesPopup
import './BottomButtons.css';

const BottomButtons = () => {
  const [isTimetablePopupOpen, setIsTimetablePopupOpen] = useState(false);
  const [isTechniquesPopupOpen, setIsTechniquesPopupOpen] = useState(false);

  const handleZeitplanClick = () => {
    setIsTimetablePopupOpen(true);
  };

  const handleTechnikenClick = () => {
    setIsTechniquesPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsTimetablePopupOpen(false);
    setIsTechniquesPopupOpen(false);
  };

  return (
    <div className="button-container">
      <button className="bottom-button button1">Termine</button>
      <button className="bottom-button button2">Nachricht</button>
      <button className="bottom-button button3" onClick={handleTechnikenClick}>Techniken</button>
      <button className="bottom-button button4" onClick={handleZeitplanClick}>Zeitplan</button>
      {isTimetablePopupOpen && <TimetablePopup onClose={handleClosePopup} />}
      {isTechniquesPopupOpen && <TechniquesPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default BottomButtons;
