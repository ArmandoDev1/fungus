// src/components/Diagram.jsx
import React from 'react';
import './Diagram.css';

// Function to get the weekday name from a Date object
const getWeekdayName = (date) => {
  const options = { weekday: 'long' };
  return date.toLocaleDateString('de-DE', options);
};

// Function to get the date of the previous N days
const getPreviousDays = (n) => {
  const dates = [];
  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
};

// Check if a date is today
const isToday = (date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

// Get the dates for the last 7 days and today
const dates = getPreviousDays(8).reverse();

// Update the data to use exact weekdays, but "Heute" for today
const data = dates.map((date, index) => ({
  day: isToday(date) ? 'Heute' : getWeekdayName(date),
  users: [80, 25, 40, 100, 50, 60, 40, 80][index], // Using the same user data
}));

const Diagram = () => {
  const padding = 50;
  const maxUsers = 150;
  const minUsers = 0;

  const getX = (index, width) => (index / (data.length - 1)) * (width - 2 * padding) + padding;
  const getY = (users, height) => height - ((users - minUsers) / (maxUsers - minUsers)) * (height - 2 * padding) - padding;

  return (
    <div className="rectangle diagram-rectangle">
      <h2>Nutzeranmeldungen pro Tag</h2>
      <svg className="diagram" viewBox={`0 0 600 400`}>
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="var(--weinrot)" />
          </marker>
          <marker id="arrow-up" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 Z" fill="var(--weinrot)" />
          </marker>
        </defs>
        <line x1={padding} y1="350" x2="550" y2="350" className="axis" marker-end="url(#arrow)" />
        <line x1={padding} y1="350" x2={padding} y2="50" className="axis" marker-end="url(#arrow-up)" />
        
        {data.map((point, index) => (
          <React.Fragment key={index}>
            <circle cx={getX(index, 600)} cy={getY(point.users, 400)} r="5" fill="var(--weinrot)" />
            {index > 0 && (
              <line
                x1={getX(index - 1, 600)}
                y1={getY(data[index - 1].users, 400)}
                x2={getX(index, 600)}
                y2={getY(point.users, 400)}
                stroke="var(--weinrot)"
                strokeWidth="2"
              />
            )}
          </React.Fragment>
        ))}

        {/* X-axis labels */}
        {data.map((point, index) => (
          <text key={index} x={getX(index, 600)} y="380" className="axis-label">
            {point.day}
          </text>
        ))}

        {/* Y-axis labels */}
        {[...Array(8)].map((_, index) => {
          const users = index * 20;
          return (
            <text key={index} x={padding - 10} y={getY(users, 400) + 5} className="y-axis-label">
              {users}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default Diagram;
