import React, { useState, useEffect } from 'react';
import './SlidingPanel.css';

const SlidingPanel = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isPanelOpen && !event.target.closest('.panel') && !event.target.closest('.menu-button')) {
        closePanel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPanelOpen]);

  return (
    <>
      {!isPanelOpen && (
        <div
          className="menu-button"
          onClick={(e) => {
            e.stopPropagation();
            togglePanel();
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div className={`panel ${isPanelOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <h2>Name</h2>
        <hr />
        <h4>Techniken</h4>
        <h4>User</h4>
      </div>
      <div className={`overlay ${isPanelOpen ? 'open' : ''}`} onClick={closePanel}></div>
    </>
  );
};

export default SlidingPanel;
