import React from 'react';

const ThemeSlider = ({ themeMode, toggleTheme }) => (
  <div className="theme-slider">
    <label>
      <input type="checkbox" onChange={toggleTheme} checked={themeMode === 'dark'} />
      Dark Mode
    </label>
  </div>
);

export default ThemeSlider;