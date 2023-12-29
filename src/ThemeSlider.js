import React from 'react';

const ThemeSlider = ({ themeMode, toggleTheme }) => (
  <div className="theme-slider">
    <label style={{ color: '#80fcfd' }}>
        Light Mode
    </label>
    <label>    
      <input
        type="range"
        min="0"
        max="1"
        step="1"
        value={themeMode === 'dark' ? '1' : '0'}
        onChange={toggleTheme}
      />
    </label>
    <label>  
      Dark Mode
    </label>
  </div>
);

export default ThemeSlider;
