// Sidebar.js
import React, { useState } from 'react';

const generateRandomCity = () => {
  // Replace this array with a list of your preferred city names
  const cities = ['City1', 'City2', 'City3', 'City4', 'City5', 'City6', 'City7', 'City8', 'City9', 'City10'];
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button onClick={toggleSidebar}>{collapsed ? 'Expand' : 'Collapse'}</button>
      {!collapsed && (
        <div>
          {[...Array(10)].map((_, index) => (
            <div key={index} className="box">
              {generateRandomCity()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
