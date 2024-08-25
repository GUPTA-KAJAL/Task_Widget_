

import React from 'react';

const Navbar = ({ onAddWidgetClick, onSearchChange, searchTerm }) => (
  <nav>
    <h1>Dashboard</h1>
    <input
      type="text"
      placeholder="Search widgets..."
      value={searchTerm}
      onChange={onSearchChange}
    />
    <button  className="addButton" onClick={onAddWidgetClick}>+ Add Widget</button>
  </nav>
);

export default Navbar;
