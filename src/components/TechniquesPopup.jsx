// File: TechniquesPopup.jsx

import React, { useState, useEffect } from 'react';
import './TechniquesPopup.css';
import { fetchTechniques, addTechnique, updateTechnique, deleteTechnique } from './saveToLocalStorage';

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
    fetchTechniques()
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

  const handleSubmit = async () => {
    const newTechnique = { ...formData };

    try {
      if (editIndex !== null) {
        const techniqueToUpdate = techniques[editIndex];
        const updatedTechnique = await updateTechnique(techniqueToUpdate.id, newTechnique);
        const updatedTechniques = techniques.map((tech, i) => (i === editIndex ? updatedTechnique : tech));
        setTechniques(updatedTechniques);
      } else {
        const addedTechnique = await addTechnique(newTechnique);
        setTechniques([...techniques, addedTechnique]);
      }
      resetForm();
    } catch (error) {
      console.error('Error submitting technique:', error);
    }
  };

  const handleEdit = (index) => {
    setFormData(techniques[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const techniqueToDelete = techniques[index];
    try {
      await deleteTechnique(techniqueToDelete.id);
      const updatedTechniques = techniques.filter((_, i) => i !== index);
      setTechniques(updatedTechniques);
    } catch (error) {
      console.error('Error deleting technique:', error);
    }
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
                <input 
                type="text" 
                name="sportart"
                value={formData.sportart} 
                onChange={handleChange} 
                />
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
              <input 
                type="text" 
                name="art"
                value={formData.art} 
                onChange={handleChange} 
              />
            </div>
            <div className="input-row">
            <label>Farbe:</label>
              <input 
                type="text" 
                name="colour"
                value={formData.colour} 
                onChange={handleChange} 
              />
            </div>
            <div className="input-row">
            <label>Kategorie:</label>
              <input 
                type="text" 
                name="where_col"
                value={formData.where_col} 
                onChange={handleChange} 
              />
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
                    <small>Kategorie: {technique.where_col}</small>
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
