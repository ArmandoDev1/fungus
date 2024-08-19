import React, { useState, useEffect } from 'react';
import './TechniquesPopup.css';

const TechniquesPopup = ({ onClose }) => {
  const [techniques, setTechniques] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [options, setOptions] = useState({
    sportart: [],
    art: [],
    colour: [],
    where_col: [],
  });
  const [formData, setFormData] = useState({
    sportart: '',
    name: '',
    beschreibung: '',
    beschreibungj: '',
    art: '',
    colour: '',
    where_col: '',
    picture_1: '',
    picture_2: '',
    picture_3: '',
    picture_4: '',
    picture_5: ''
  });

  useEffect(() => {
    fetch('http://home.lomoff.de:5000/techniques')
      .then(response => response.json())
      .then(data => {
        setTechniques(data);

        // Extract unique options for each dropdown field
        const sportartOptions = [...new Set(data.map(item => item.sportart))];
        const artOptions = [...new Set(data.map(item => item.art))];
        const colourOptions = [...new Set(data.map(item => item.colour))];
        const whereColOptions = [...new Set(data.map(item => item.where_col))];

        setOptions({
          sportart: sportartOptions,
          art: artOptions,
          colour: colourOptions,
          where_col: whereColOptions,
        });
      })
      .catch(error => console.error('Error fetching techniques:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const method = editIndex !== null ? 'PUT' : 'POST';
    const url = editIndex !== null 
      ? `http://home.lomoff.de:5000/techniques/${techniques[editIndex].id}`
      : 'http://home.lomoff.de:5000/techniques';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(newTechnique => {
        if (editIndex !== null) {
          const updatedTechniques = [...techniques];
          updatedTechniques[editIndex] = newTechnique;
          setTechniques(updatedTechniques);
        } else {
          setTechniques([...techniques, newTechnique]);
        }
        resetForm();
      })
      .catch(error => console.error('Error submitting technique:', error));
  };

  const handleEdit = (index) => {
    setFormData(techniques[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const techniqueId = techniques[index].id;
    fetch(`http://home.lomoff.de:5000/techniques/${techniqueId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error deleting technique');
        }
        // Update the techniques state by filtering out the deleted item by ID
        const updatedTechniques = techniques.filter(technique => technique.id !== techniqueId);
        setTechniques(updatedTechniques);
      })
      .catch(error => console.error('Error deleting technique:', error));
  };
  

  const resetForm = () => {
    setFormData({
      sportart: '',
      name: '',
      beschreibung: '',
      beschreibungj: '',
      art: '',
      colour: '',
      where_col: '',
      picture_1: '',
      picture_2: '',
      picture_3: '',
      picture_4: '',
      picture_5: ''
    });
    setEditIndex(null);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="popup-columns">
          <div className="column">
            <h2>{editIndex !== null ? 'Technik aktualisieren' : 'Technik hinzufügen'}</h2>
            <div className="input-row">
              <label>Sportart:</label>
              <select name="sportart" value={formData.sportart} onChange={handleChange}>
                <option value="">Wählen</option>
                {options.sportart.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="input-row">
              <label>Name:</label>
              <input 
                type="text" 
                name="name"
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>
            <div className="input-row">
              <label>Beschreibung:</label>
              <input 
                type="text" 
                name="beschreibung" 
                value={formData.beschreibung} 
                onChange={handleChange} 
              />
            </div>
            <div className="input-row">
              <label>Art:</label>
              <select name="art" value={formData.art} onChange={handleChange}>
                <option value="">Wählen</option>
                {options.art.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="input-row">
              <label>Farbe:</label>
              <select name="colour" value={formData.colour} onChange={handleChange}>
                <option value="">Wählen</option>
                {options.colour.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="input-row">
              <label>Ort:</label>
              <select name="where_col" value={formData.where_col} onChange={handleChange}>
                <option value="">Wählen</option>
                {options.where_col.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <button className="popup-button" onClick={handleSubmit}>
              {editIndex !== null ? 'Aktualisieren' : 'Hinzufügen'}
            </button>
          </div>
          <div className="column">
            <h2>Gespeicherte Techniken</h2>
            <ul className="technique-list">
              {techniques.map((technique, index) => (
                <li className="technique-item" key={technique.id}>
                  <div>
                    <strong>{technique.name}</strong> ({technique.sportart})<br />
                    <small>Art: {technique.art}</small><br />
                    <small>Farbe: {technique.colour}</small><br />
                    <small>Ort: {technique.where_col}</small>
                  </div>
                  <div className="technique-buttons">
                    <button 
                      className="edit-button" 
                      onClick={() => handleEdit(index)}
                    >
                      Bearbeiten
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDelete(index)}
                    >
                      Löschen
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechniquesPopup;
