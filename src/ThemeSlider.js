import React from 'react';

const ThemeSlider = ({ themeMode, toggleTheme }) => (
  <div className="theme-slider">
    <label style={{ color: '#3890c8' }}>
      Light Mode
    </label>
    <label>
      <input
        type="range"
        min="0"
        max="1"
        step="1"
        value={themeMode === 'light' ? '0' : '1'} // Initially set to 'dark'
        onChange={toggleTheme}
      />
    </label>
    <label>
      Dark Mode
    </label>
  </div>
);

export default ThemeSlider;
