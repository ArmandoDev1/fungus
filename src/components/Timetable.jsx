// File: Timetable.jsx

import React, { useEffect, useState } from 'react';
import './Timetable.css';
import { fetchCourses } from './timetableService';

const Timetable = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the server on component mount
    fetchCourses()
      .then(setCourses)
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const timeSlots = ['15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

  const generateCourseBoxes = (course) => {
    const courseBoxes = [];
    let currentTime = new Date(`1970-01-01T${course.startTime}:00`);
    const endTime = new Date(`1970-01-01T${course.endTime}:00`);
    let boxIndex = 0;
    const totalBoxes = Math.ceil((endTime - currentTime) / (30 * 60000)); // Number of 30-minute intervals

    while (currentTime < endTime) {
      const formattedTime = currentTime.toTimeString().substring(0, 5);
      let content = '';

      // Assign different content based on the box index
      if (boxIndex === 0) {
        content = course.name; // First box: course name
      } else if (boxIndex === 1) {
        content = course.description; // Second box: course description
      } else if (boxIndex === totalBoxes - 1) {
        content = `${course.startTime} - ${course.endTime}`; // Last box: course time range
      }

      courseBoxes.push(
        <div
          key={`${course.day}-${formattedTime}-${course.location}-${course.hall}-${boxIndex}`}
          className="course-box"
          style={{
            gridRowStart: timeSlots.indexOf(formattedTime) + 2,
            gridRowEnd: timeSlots.indexOf(formattedTime) + 3,
          }}
        >
          {content}
        </div>
      );

      currentTime = new Date(currentTime.getTime() + 30 * 60000); // Move to the next 30-minute interval
      boxIndex++;
    }

    return courseBoxes;
  };

  return (
    <div className="timetable">
      <div className="timetable-header">
        <div className="time-slot empty"></div>
        {days.map((day) => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}
      </div>
      <div className="timetable-body">
        {timeSlots.map((time) => (
          <div key={time} className="time-row">
            <div className="time-slot">{time}</div>
            {days.map((day) => (
              <div key={`${day}-${time}`} className="day-slot">
                {courses
                  .filter((course) => course.day === day && course.startTime <= time && course.endTime >= time)
                  .flatMap((course) => generateCourseBoxes(course))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
