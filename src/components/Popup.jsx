// File: Popup.jsx

import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = ({ onClose, onCoursesUpdate }) => {
  const [selectedHalle, setSelectedHalle] = useState(null);
  const [weekday, setWeekday] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [courses, setCourses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, []);

  const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  const generateTimes = () => {
    const times = [];
    for (let hour = 15; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour < 10 ? `0${hour}` : hour;
        const formattedMinute = minute < 10 ? `0${minute}` : minute;
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  };

  const times = generateTimes();

  const handleSubmit = () => {
    const newCourse = {
      day: weekday,
      startTime,
      endTime,
      name,
      description,
      location,
      hall: selectedHalle
    };

    let updatedCourses = [...courses];
    if (editIndex !== null) {
      updatedCourses[editIndex] = newCourse;
    } else {
      updatedCourses.push(newCourse);
    }

    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    onCoursesUpdate(updatedCourses);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setWeekday('');
    setStartTime('');
    setEndTime('');
    setName('');
    setDescription('');
    setLocation('');
    setSelectedHalle(null);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const course = courses[index];
    setWeekday(course.day);
    setStartTime(course.startTime);
    setEndTime(course.endTime);
    setName(course.name);
    setDescription(course.description);
    setLocation(course.location);
    setSelectedHalle(course.hall);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    onCoursesUpdate(updatedCourses);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="popup-columns">
          <div className="column">
            <h2>{editIndex !== null ? 'Kurs aktualisieren' : 'Kurs hinzufügen'}</h2>
            <div className="input-row">
              <label>Wochentag:</label>
              <select value={weekday} onChange={e => setWeekday(e.target.value)}>
                <option value="">Wählen</option>
                {weekdays.map((day, index) => (
                  <option key={index} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div className="input-row">
              <label>Startzeit:</label>
              <select value={startTime} onChange={e => setStartTime(e.target.value)}>
                <option value="">Wählen</option>
                {times.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div className="input-row">
              <label>Endzeit:</label>
              <select value={endTime} onChange={e => setEndTime(e.target.value)}>
                <option value="">Wählen</option>
                {times.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div className="input-row">
              <label>Name:</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="input-row">
              <label>Beschreibung:</label>
              <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="input-row">
              <label>Ort:</label>
              <select value={location} onChange={e => setLocation(e.target.value)}>
                <option value="">Wählen</option>
                {['Spandau', 'Lübars', 'Wilmersdorf', 'Steglitz', 'Tegel', 'Waltersdorf'].map((loc, index) => (
                  <option key={index} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div className="input-row">
              <label>Halle:</label>
              <select value={selectedHalle} onChange={e => setSelectedHalle(e.target.value)}>
                <option value="">Wählen</option>
                <option value="Halle 1">Halle 1</option>
                <option value="Halle 2">Halle 2</option>
                <option value="Halle 3">Halle 3</option>
              </select>
            </div>
            <button className="popup-button" onClick={handleSubmit}>
              {editIndex !== null ? 'Aktualisieren' : 'Hinzufügen'}
            </button>
          </div>
          <div className="column">
            <h2>Gespeicherte Kurse</h2>
            <ul className="course-list">
              {courses.map((course, index) => (
                <li className="course-item" key={index}>
                  {course.name}, {course.day} {course.startTime} - {course.endTime}, {course.location}
                  <button className="edit-button" onClick={() => handleEdit(index)}>Bearbeiten</button>
                  <button className="delete-button" onClick={() => handleDelete(index)}>Löschen</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
